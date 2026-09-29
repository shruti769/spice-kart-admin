-- Spice Kart · business settings (Admin → Settings: Delivery minimum, Payments & tax,
-- Notifications, Store hours, Security) and the rules that enforce them.
-- Run in Supabase → SQL Editor after orders.sql, stores.sql and notifications.sql. Safe to re-run.
--
--   business_settings   one row, admins only (it holds the Slack webhook and security settings)
--   store_config()      what the customer app / login page may read: hours, open now, minimum,
--                       payment methods, GST, Google sign-in on/off
--   orders rules        BEFORE INSERT: minimum order value, enabled payment methods, express only
--                       while the store is open. Errors: below_minimum:<amount>,
--                       payment_method_unavailable, store_closed
--   outbound_messages   queue for order-confirmation emails, delivery SMS, Slack low-stock alerts
--                       and the daily digest; the send-push Edge Function delivers it
--   is_admin()          now also enforces "2FA required" and the IP allowlist for every admin
--                       request (RLS everywhere uses it)
--
-- Locked out by the IP allowlist or 2FA? In the SQL Editor run:
--   update public.business_settings set ip_allowlist_enabled = false, require_2fa = false;

-- ═══ Settings row ════════════════════════════════════════════════════════════════════════
create table if not exists public.business_settings (
  id                      boolean primary key default true check (id),
  -- Delivery
  min_order_value         numeric(10, 2) not null default 0 check (min_order_value between 0 and 10000),
  -- Payments & tax
  gst_rate                numeric(5, 2) not null default 10 check (gst_rate between 0 and 100),
  prices_include_gst      boolean not null default true,
  refund_destination      text not null default 'wallet' check (refund_destination in ('wallet', 'original')),
  accept_card             boolean not null default true,
  card_brands             text[] not null default '{visa,mastercard,amex}'
                          check (card_brands <@ array['visa', 'mastercard', 'amex']::text[]),
  accept_apple_pay        boolean not null default true,
  accept_google_pay       boolean not null default true,
  accept_payid            boolean not null default true,
  restocking_fee_max      numeric(10, 2) not null default 0 check (restocking_fee_max between 0 and 1000),
  payout_schedule         text not null default 'daily' check (payout_schedule in ('daily', 'weekly', 'monthly')),
  -- Notifications
  notify_order_email      boolean not null default true,
  notify_delivery_sms     boolean not null default true,
  allow_promo_push        boolean not null default true,
  slack_low_stock         boolean not null default false,
  slack_webhook_url       text check (slack_webhook_url is null or slack_webhook_url ~ '^https://hooks\.slack\.com/'),
  daily_digest            boolean not null default false,
  digest_emails           text[] not null default '{}',
  digest_hour             int not null default 7 check (digest_hour between 0 and 23),
  last_digest_on          date,
  -- Store hours (Melbourne time), per weekday: {"Mon": [{"open":"07:00","close":"22:00"}], …}.
  -- A day with no entries is closed; '{}' (nothing added yet) means always open.
  hours                   jsonb not null default '{}'::jsonb,
  public_holidays         date[] not null default '{}',  -- unused (kept for older rows)
  -- Security
  require_2fa             boolean not null default false,
  allow_google_sso        boolean not null default false,
  session_timeout_minutes int not null default 30 check (session_timeout_minutes between 0 and 1440),  -- 0 = off
  ip_allowlist_enabled    boolean not null default false,
  ip_allowlist            text[] not null default '{}',
  updated_at              timestamptz not null default now()
);
insert into public.business_settings (id) values (true) on conflict (id) do nothing;
-- The first version stored grouped defaults ({"weekdays": …}); hours are now added per day in Settings.
update public.business_settings set hours = '{}'::jsonb where hours ? 'weekdays';
alter table public.business_settings alter column hours set default '{}'::jsonb;

drop trigger if exists business_settings_touch on public.business_settings;
create trigger business_settings_touch before update on public.business_settings for each row execute function public.touch_updated_at();

/** The caller's IP as Supabase's API gateway saw it ('' outside an API request, e.g. SQL Editor). */
create or replace function public.request_ip() returns text
language plpgsql stable set search_path = '' as $$
declare h json;
begin
  h := nullif(current_setting('request.headers', true), '')::json;
  return coalesce(nullif(h ->> 'cf-connecting-ip', ''), nullif(btrim(split_part(h ->> 'x-forwarded-for', ',', 1)), ''), '');
exception when others then return '';
end $$;
grant execute on function public.request_ip() to authenticated;

/** True when `p_ip` is inside any entry of `p_list` (single IPs or CIDR ranges). */
create or replace function public.ip_in_list(p_ip text, p_list text[]) returns boolean
language plpgsql immutable set search_path = '' as $$
begin
  if coalesce(p_ip, '') = '' then return false; end if;
  return exists (select 1 from unnest(p_list) e where p_ip::inet <<= e::inet);
exception when others then return false;
end $$;

-- Guard rails: validate lists and don't let an admin lock themselves out.
create or replace function public.business_settings_check() returns trigger
language plpgsql set search_path = public as $$
declare e text; ip text := public.request_ip();
begin
  foreach e in array new.ip_allowlist loop
    begin perform e::inet; exception when others then
      raise exception 'Not an IP address or range: %', e using errcode = '23514';
    end;
  end loop;
  foreach e in array new.digest_emails loop
    if e !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'Not an email address: %', e using errcode = '23514'; end if;
  end loop;
  -- hours: {"Mon": [{"open":"HH:MM","close":"HH:MM"}], …}, close after open, no overlaps.
  if jsonb_typeof(new.hours) <> 'object'
     or exists (select 1 from jsonb_object_keys(new.hours) k where k not in ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')) then
    raise exception 'Store hours must be set per weekday (Mon–Sun)' using errcode = '23514';
  end if;
  begin
    if exists (
      select 1 from jsonb_each(new.hours) d, jsonb_array_elements(d.value) w
       where (w ->> 'close')::time <= (w ->> 'open')::time
    ) then raise exception 'Closing time must be after opening time' using errcode = '23514'; end if;
    if exists (
      select 1 from jsonb_each(new.hours) d,
             jsonb_array_elements(d.value) with ordinality a(w, i),
             jsonb_array_elements(d.value) with ordinality b(w, j)
       where i < j and (a.w ->> 'open')::time < (b.w ->> 'close')::time and (b.w ->> 'open')::time < (a.w ->> 'close')::time
    ) then raise exception 'Store hours on the same day overlap' using errcode = '23514'; end if;
  exception when invalid_datetime_format or invalid_text_representation or invalid_parameter_value then
    raise exception 'Store hours need times like 07:00' using errcode = '23514';
  end;
  if new.slack_low_stock and new.slack_webhook_url is null then
    raise exception 'Add the Slack webhook URL to send low-stock alerts' using errcode = '23514';
  end if;
  if new.daily_digest and cardinality(new.digest_emails) = 0 then
    raise exception 'Add at least one email for the daily digest' using errcode = '23514';
  end if;
  -- Only checked for API requests (ip <> ''), so the SQL Editor can always switch these off.
  if ip <> '' and new.ip_allowlist_enabled and not public.ip_in_list(ip, new.ip_allowlist) then
    raise exception 'Add your current IP (%) to the allowlist first, or you''ll lock yourself out', ip using errcode = '23514';
  end if;
  if ip <> '' and new.require_2fa and not coalesce(old.require_2fa, false)
     and coalesce((select auth.jwt()) ->> 'aal', 'aal1') <> 'aal2' then
    raise exception 'Set up two-factor on your own account and sign in with it before requiring it for everyone' using errcode = '23514';
  end if;
  return new;
end $$;
drop trigger if exists business_settings_check on public.business_settings;
create trigger business_settings_check before insert or update on public.business_settings
  for each row execute function public.business_settings_check();

alter table public.business_settings enable row level security;
grant select, update on public.business_settings to authenticated;

-- ═══ Security: is_admin() enforces 2FA and the IP allowlist ═════════════════════════════
create or replace function public.is_admin() returns boolean
language plpgsql stable security definer set search_path = '' as $$
declare s record;
begin
  -- Staff set to inactive in Staff & Admins lose access (status column comes from admin_data.sql).
  if not exists (select 1 from public.admins a where a.user_id = (select auth.uid())
                  and coalesce(to_jsonb(a) ->> 'status', 'active') <> 'inactive') then return false; end if;
  select require_2fa, ip_allowlist_enabled, ip_allowlist into s from public.business_settings where id;
  if s.require_2fa and coalesce((select auth.jwt()) ->> 'aal', 'aal1') <> 'aal2' then return false; end if;
  if s.ip_allowlist_enabled and not public.ip_in_list(public.request_ip(), s.ip_allowlist) then return false; end if;
  return true;
end $$;

/** What the admin app checks after sign-in (why access would be blocked). */
create or replace function public.admin_access_status() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare s record; ip text := public.request_ip();
begin
  select require_2fa, ip_allowlist_enabled, ip_allowlist, session_timeout_minutes into s from public.business_settings where id;
  return jsonb_build_object(
    'is_admin_row', exists (select 1 from public.admins where user_id = (select auth.uid())),
    'ip', ip,
    'ip_allowed', not s.ip_allowlist_enabled or public.ip_in_list(ip, s.ip_allowlist),
    'require_2fa', s.require_2fa,
    'aal', coalesce((select auth.jwt()) ->> 'aal', 'aal1'),
    'session_timeout_minutes', s.session_timeout_minutes
  );
end $$;
grant execute on function public.admin_access_status() to authenticated;

drop policy if exists "Admins read business settings" on public.business_settings;
create policy "Admins read business settings" on public.business_settings for select to authenticated using ((select public.is_admin()));
drop policy if exists "Admins update business settings" on public.business_settings;
create policy "Admins update business settings" on public.business_settings for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

/** The signed-in user's own login sessions (Settings → Security → login history). */
create or replace function public.my_sessions()
returns table (id uuid, created_at timestamptz, updated_at timestamptz, user_agent text, ip text, aal text, current boolean)
language sql stable security definer set search_path = '' as $$
  select s.id, s.created_at, coalesce(s.refreshed_at::timestamptz, s.updated_at), s.user_agent, host(s.ip), s.aal::text,
         s.id::text = ((select auth.jwt()) ->> 'session_id')
    from auth.sessions s
   where s.user_id = (select auth.uid())
   order by coalesce(s.refreshed_at::timestamptz, s.updated_at) desc nulls last
   limit 50;
$$;
revoke execute on function public.my_sessions() from public, anon;
grant execute on function public.my_sessions() to authenticated;

-- ═══ Store hours ═════════════════════════════════════════════════════════════════════════
/** Is the store open at `p_at` (Melbourne time)? True when no hours have been added yet. */
create or replace function public.store_is_open(p_at timestamptz default now()) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare h jsonb; local timestamp := p_at at time zone 'Australia/Melbourne';
        day text := (array['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])[extract(isodow from local)::int];
begin
  select hours into h from public.business_settings where id;
  if h is null or h = '{}'::jsonb then return true; end if;
  return exists (
    select 1 from jsonb_array_elements(coalesce(h -> day, '[]'::jsonb)) w
     where local::time >= (w ->> 'open')::time and local::time < (w ->> 'close')::time
  );
end $$;
grant execute on function public.store_is_open(timestamptz) to anon, authenticated;

/** Public store settings for the customer app and the admin login page. */
create or replace function public.store_config() returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'open_now', public.store_is_open(now()),
    'hours', hours,
    'min_order_value', min_order_value,
    'gst_rate', gst_rate,
    'prices_include_gst', prices_include_gst,
    'payment_methods', array_remove(array[
      case when accept_card then 'card' end, case when accept_apple_pay then 'apple_pay' end,
      case when accept_google_pay then 'google_pay' end, case when accept_payid then 'payid' end], null),
    'card_brands', card_brands,
    'refund_destination', refund_destination,
    'restocking_fee_max', restocking_fee_max,
    'allow_google_sso', allow_google_sso
  ) from public.business_settings where id;
$$;
grant execute on function public.store_config() to anon, authenticated;

-- ═══ Order rules (run for every new order, including the app's place_order()) ═══════════
create or replace function public.orders_business_rules() returns trigger
language plpgsql security definer set search_path = public as $$
declare s public.business_settings;
begin
  select * into s from public.business_settings where id;
  if s.id is null then return new; end if;
  if new.subtotal < s.min_order_value then
    raise exception 'below_minimum:%', to_char(s.min_order_value, 'FM999990.00') using errcode = 'P0001';
  end if;
  if (new.payment_method = 'card' and not s.accept_card)
     or (new.payment_method = 'apple_pay' and not s.accept_apple_pay)
     or (new.payment_method = 'google_pay' and not s.accept_google_pay)
     or (new.payment_method = 'payid' and not s.accept_payid) then
    raise exception 'payment_method_unavailable' using errcode = 'P0001';
  end if;
  if new.delivery_type = 'express' and not public.store_is_open(now()) then
    raise exception 'store_closed' using errcode = 'P0001';
  end if;
  return new;
end $$;
drop trigger if exists orders_business_rules on public.orders;
create trigger orders_business_rules before insert on public.orders for each row execute function public.orders_business_rules();

-- ═══ Outbound messages (email / SMS / Slack) ═════════════════════════════════════════════
create table if not exists public.outbound_messages (
  id         bigint generated always as identity primary key,
  channel    text not null check (channel in ('email', 'sms', 'slack')),
  recipient  text not null,          -- email, +61 mobile, or Slack webhook URL
  subject    text,
  body       text not null,
  kind       text not null,          -- order_confirmation | delivery_update | low_stock | daily_digest
  order_id   uuid references public.orders (id) on delete set null,
  status     text not null default 'pending' check (status in ('pending', 'sending', 'sent', 'failed')),
  error      text,
  claimed_at timestamptz,
  created_at timestamptz not null default now(),
  sent_at    timestamptz
);
create index if not exists outbound_messages_pending on public.outbound_messages (id) where status = 'pending';
create index if not exists outbound_messages_recent on public.outbound_messages (created_at desc);

alter table public.outbound_messages enable row level security;
grant select on public.outbound_messages to authenticated;
drop policy if exists "Admins read outbound messages" on public.outbound_messages;
create policy "Admins read outbound messages" on public.outbound_messages for select to authenticated using ((select public.is_admin()));

/** Hands pending messages to one send-push run (service role only). */
create or replace function public.claim_pending_messages(p_limit int default 100)
returns setof public.outbound_messages
language sql security definer set search_path = public as $$
  update public.outbound_messages m set status = 'sending', claimed_at = now()
   where m.id in (select id from public.outbound_messages where status = 'pending' order by id limit p_limit for update skip locked)
  returning m.*;
$$;
revoke execute on function public.claim_pending_messages(int) from public, anon, authenticated;
grant execute on function public.claim_pending_messages(int) to service_role;

-- Order placed → confirmation email.
create or replace function public.messages_on_order_insert() returns trigger
language plpgsql security definer set search_path = public as $$
declare s public.business_settings; c public.customers; st text;
begin
  select * into s from public.business_settings where id;
  select * into c from public.customers where id = new.customer_id;
  if not coalesce(s.notify_order_email, false) or c.email is null then return null; end if;
  select name into st from public.stores where id = new.store_id;
  insert into public.outbound_messages (channel, recipient, subject, body, kind, order_id)
  values ('email', c.email, 'Your ' || coalesce(st, 'Spice Kart') || ' order #' || new.number || ' is confirmed',
    'Hi ' || coalesce(nullif(c.first_name, ''), 'there') || E',\n\nThanks for your order #' || new.number || E'.\n\n'
      || coalesce((select string_agg(qty || ' × ' || name || '  $' || to_char(line_total, 'FM999990.00'), E'\n' order by id)
                     from public.order_items where order_id = new.id), '')
      || E'\n\nTotal: $' || to_char(new.total, 'FM999990.00')
      || E'\nDelivery: ' || case when new.delivery_type = 'express' then 'Express' else coalesce(new.slot_label, 'Scheduled') end
      || E'\nTo: ' || new.address_line || E'\n\n' || coalesce(st, 'Spice Kart'),
    'order_confirmation', new.id);
  return null;
end $$;
-- Deferred to the end of the transaction so place_order() has added the line items.
drop trigger if exists messages_on_order_insert on public.orders;
create constraint trigger messages_on_order_insert after insert on public.orders
  deferrable initially deferred for each row execute function public.messages_on_order_insert();

-- Out for delivery / delivered → SMS.
create or replace function public.messages_on_order_status() returns trigger
language plpgsql security definer set search_path = public as $$
declare s public.business_settings; m text; st text;
begin
  if new.status is not distinct from old.status or new.status not in ('out_for_delivery', 'delivered') then return null; end if;
  select * into s from public.business_settings where id;
  select mobile into m from public.customers where id = new.customer_id;
  if not coalesce(s.notify_delivery_sms, false) or m is null then return null; end if;
  select name into st from public.stores where id = new.store_id;
  insert into public.outbound_messages (channel, recipient, body, kind, order_id)
  values ('sms', '+61' || m,
    coalesce(st, 'Spice Kart') || ': ' || case new.status
      when 'out_for_delivery' then 'your order #' || new.number || ' is on the way.'
      else 'your order #' || new.number || ' has been delivered. Enjoy!' end,
    'delivery_update', new.id);
  return null;
end $$;
drop trigger if exists messages_on_order_status on public.orders;
create trigger messages_on_order_status after update of status on public.orders for each row execute function public.messages_on_order_status();

-- New inventory alert → Slack.
create or replace function public.messages_on_alert() returns trigger
language plpgsql security definer set search_path = public as $$
declare s public.business_settings;
begin
  if new.category <> 'inventory' then return null; end if;
  select * into s from public.business_settings where id;
  if not coalesce(s.slack_low_stock, false) or s.slack_webhook_url is null then return null; end if;
  insert into public.outbound_messages (channel, recipient, body, kind)
  values ('slack', s.slack_webhook_url, ':warning: *' || new.title || '*' || coalesce(E'\n' || nullif(new.body, ''), ''), 'low_stock');
  return null;
end $$;
drop trigger if exists messages_on_alert on public.admin_alerts;
create trigger messages_on_alert after insert on public.admin_alerts for each row execute function public.messages_on_alert();

/** Queues yesterday's summary once a day at `digest_hour` (Melbourne time). */
create or replace function public.queue_daily_digest() returns void
language plpgsql security definer set search_path = public as $$
declare s public.business_settings; local timestamp := now() at time zone 'Australia/Melbourne';
        y date := (now() at time zone 'Australia/Melbourne')::date - 1; txt text; e text; st text;
begin
  select * into s from public.business_settings where id for update;
  if not s.daily_digest or extract(hour from local) < s.digest_hour or s.last_digest_on = local::date then return; end if;
  select name into st from public.stores where is_primary;
  select 'Orders: ' || count(*) filter (where status <> 'cancelled')
      || E'\nRevenue: $' || to_char(coalesce(sum(total) filter (where status <> 'cancelled'), 0), 'FM999999990.00')
      || E'\nCancelled: ' || count(*) filter (where status = 'cancelled')
    into txt
    from public.orders where (placed_at at time zone 'Australia/Melbourne')::date = y;
  txt := txt
    || E'\nNew customers: ' || (select count(*) from public.customers where (created_at at time zone 'Australia/Melbourne')::date = y)
    || E'\nLow / out of stock products: ' || (select count(*) from public.admin_alerts where category = 'inventory' and resolved_at is null)
    || E'\nOpen alerts: ' || (select count(*) from public.admin_alerts where resolved_at is null and read_at is null)
    || E'\nRefunds waiting: ' || (select count(*) from public.refund_requests where status = 'pending');
  foreach e in array s.digest_emails loop
    insert into public.outbound_messages (channel, recipient, subject, body, kind)
    values ('email', e, coalesce(st, 'Spice Kart') || ' daily operations · ' || to_char(y, 'Dy DD Mon'), txt, 'daily_digest');
  end loop;
  update public.business_settings set last_digest_on = local::date where id;
end $$;
revoke execute on function public.queue_daily_digest() from public, anon, authenticated;

-- ═══ Promotional push switch ═════════════════════════════════════════════════════════════
create or replace function public.promo_push_allowed() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select allow_promo_push from public.business_settings where id), true);
$$;

-- ═══ Minutely job: digest + deliver queued messages ══════════════════════════════════════
create or replace function public.business_tick() returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.queue_daily_digest();
  update public.outbound_messages set status = 'pending', claimed_at = null
   where status = 'sending' and claimed_at < now() - interval '10 minutes';
  perform public.kick_push_sender();
end $$;
revoke execute on function public.business_tick() from public, anon, authenticated;

do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'spicekart-business';
  perform cron.schedule('spicekart-business', '* * * * *', 'select public.business_tick()');
exception when others then raise notice 'pg_cron unavailable (%): enable it in Database → Extensions, then re-run this file.', sqlerrm;
end $$;

-- ═══ Realtime + app updates ══════════════════════════════════════════════════════════════
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'outbound_messages') then
    alter publication supabase_realtime add table public.outbound_messages;
  end if;
  if exists (select 1 from pg_proc where proname = 'bump_app_change' and pronamespace = 'public'::regnamespace) then
    drop trigger if exists business_settings_app_change on public.business_settings;
    create trigger business_settings_app_change after insert or update or delete on public.business_settings
      for each statement execute function public.bump_app_change();
  end if;
end $$;
