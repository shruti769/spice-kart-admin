-- Spice Kart · notifications: admin alerts, push campaigns, customer inbox and push delivery.
-- Run in Supabase → SQL Editor after supabase/orders.sql. Safe to re-run.
--
--   admin_alerts            Notification Centre in the admin. Raised by triggers / the minutely job,
--                           resolved automatically when the problem goes away.
--   push_campaigns          Campaigns written in Admin → Notifications.
--   customer_notifications  One row per customer per message (campaigns + order updates). The app's
--                           inbox reads it; the `send-push` Edge Function delivers pending rows.
--   push_tokens             Expo push tokens registered by the app.
--
-- Delivery: pg_cron runs public.notifications_tick() every minute. It sends due scheduled
-- campaigns, checks for delayed orders / ending coupons, and (when the two Vault secrets below
-- exist) calls the send-push Edge Function through pg_net. See supabase/NOTIFICATIONS_SETUP.md.

-- ═══ Admin alerts ════════════════════════════════════════════════════════════════════════
create table if not exists public.admin_alerts (
  id          uuid primary key default gen_random_uuid(),
  dedup_key   text not null,     -- one open alert per key, e.g. 'stock:low:<product id>'
  category    text not null check (category in ('operations', 'inventory', 'payments', 'reviews', 'system')),
  severity    text not null default 'info' check (severity in ('info', 'warning', 'critical')),
  title       text not null,
  body        text not null default '',
  link        text,              -- admin page key: del, inv, orders, pay, refunds, rev, promo, notif, settings
  link_label  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  read_at     timestamptz,
  read_by     uuid references auth.users (id) on delete set null,
  resolved_at timestamptz        -- set when the underlying problem is gone
);
create unique index if not exists admin_alerts_open_key on public.admin_alerts (dedup_key) where resolved_at is null;
create index if not exists admin_alerts_recent on public.admin_alerts (created_at desc);

/** Opens (or refreshes) the alert for `p_key`; a refreshed alert becomes unread again. */
create or replace function public.raise_alert(p_key text, p_category text, p_severity text, p_title text, p_body text, p_link text, p_link_label text)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.admin_alerts (dedup_key, category, severity, title, body, link, link_label)
  values (p_key, p_category, p_severity, p_title, p_body, p_link, p_link_label)
  on conflict (dedup_key) where resolved_at is null do update
    set severity = excluded.severity, title = excluded.title, body = excluded.body,
        link = excluded.link, link_label = excluded.link_label, updated_at = now(),
        read_at = case when admin_alerts.title is distinct from excluded.title then null else admin_alerts.read_at end,
        read_by = case when admin_alerts.title is distinct from excluded.title then null else admin_alerts.read_by end;
end $$;

create or replace function public.resolve_alert(p_key text) returns void
language sql security definer set search_path = public as $$
  update public.admin_alerts set resolved_at = now(), updated_at = now() where dedup_key = p_key and resolved_at is null;
$$;
revoke execute on function public.raise_alert(text, text, text, text, text, text, text) from public, anon, authenticated;
revoke execute on function public.resolve_alert(text) from public, anon, authenticated;

-- ─── Inventory: low / out of stock ───────────────────────────────────────────────────────
create or replace function public.alerts_on_stock() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  lim int := coalesce(new.min_stock, 10);
begin
  if tg_op = 'DELETE' then
    perform public.resolve_alert('stock:out:' || old.id);
    perform public.resolve_alert('stock:low:' || old.id);
    return old;
  end if;
  if new.track_inventory and new.stock_qty <= 0 then
    perform public.resolve_alert('stock:low:' || new.id);
    perform public.raise_alert('stock:out:' || new.id, 'inventory', 'critical',
      new.name || ' is out of stock', 'Customers can’t add it to their cart until it’s restocked.', 'inv', 'Adjust stock');
  elsif new.track_inventory and new.stock_qty < lim then
    perform public.resolve_alert('stock:out:' || new.id);
    perform public.raise_alert('stock:low:' || new.id, 'inventory', 'warning',
      new.name || ' has dropped to ' || new.stock_qty || ' unit' || case when new.stock_qty = 1 then '' else 's' end,
      'Below the minimum level of ' || lim || '.', 'inv', 'Adjust stock');
  else
    perform public.resolve_alert('stock:out:' || new.id);
    perform public.resolve_alert('stock:low:' || new.id);
  end if;
  return new;
end $$;
drop trigger if exists alerts_on_stock on public.products;
create trigger alerts_on_stock after insert or update of stock_qty, min_stock, track_inventory, name or delete on public.products
  for each row execute function public.alerts_on_stock();

-- ─── Payments: failed attempts ───────────────────────────────────────────────────────────
create or replace function public.alerts_on_payment() returns trigger
language plpgsql security definer set search_path = public as $$
declare o record;
begin
  select number, total into o from public.orders where id = new.order_id;
  if new.status = 'failed' then
    perform public.raise_alert('payment:failed:' || new.order_id, 'payments', 'critical',
      'Payment failed on order #' || o.number,
      coalesce(initcap(new.card_brand) || ' ending ' || new.card_last4 || ' was declined', 'The payment was declined')
        || coalesce(' · ' || new.failure_reason, '') || '. The order is on hold and the customer hasn’t been charged.',
      'pay', 'Review transaction');
  elsif new.status = 'succeeded' then
    perform public.resolve_alert('payment:failed:' || new.order_id);
  end if;
  return new;
end $$;
drop trigger if exists alerts_on_payment on public.payments;
create trigger alerts_on_payment after insert on public.payments for each row execute function public.alerts_on_payment();

-- ─── Reviews: low ratings to moderate ────────────────────────────────────────────────────
create or replace function public.alerts_on_review() returns trigger
language plpgsql security definer set search_path = public as $$
declare who text; what text;
begin
  if new.status = 'pending' then
    select nullif(btrim(first_name || ' ' || last_name), '') into who from public.customers where id = new.customer_id;
    select name into what from public.products where id = new.product_id;
    perform public.raise_alert('review:' || new.id, 'reviews', 'warning',
      'New ' || new.rating || '-star review needs moderation',
      coalesce(who, 'A customer') || coalesce(' on ' || what, '') || coalesce(': “' || nullif(left(new.comment, 140), '') || '”', '.'),
      'rev', 'Moderate review');
  else
    perform public.resolve_alert('review:' || new.id);
  end if;
  return new;
end $$;
drop trigger if exists alerts_on_review on public.reviews;
create trigger alerts_on_review after insert or update of status on public.reviews for each row execute function public.alerts_on_review();

-- ─── Refund requests ─────────────────────────────────────────────────────────────────────
create or replace function public.alerts_on_refund() returns trigger
language plpgsql security definer set search_path = public as $$
declare onum text;
begin
  if new.status = 'pending' then
    select number into onum from public.orders where id = new.order_id;
    perform public.raise_alert('refund:' || new.id, 'payments', 'warning',
      'Refund request ' || new.number || ' awaiting approval',
      'Order #' || onum || ' · ' || replace(initcap(replace(new.reason, '_', ' ')), 'Item', 'item')
        || coalesce(' · “' || nullif(left(new.detail, 120), '') || '”', ''),
      'refunds', 'Review refund');
  else
    perform public.resolve_alert('refund:' || new.id);
  end if;
  return new;
end $$;
drop trigger if exists alerts_on_refund on public.refund_requests;
create trigger alerts_on_refund after insert or update of status on public.refund_requests for each row execute function public.alerts_on_refund();

-- ─── Operations: orders past their promised window (run by the minutely job) ────────────
create or replace function public.check_order_alerts() returns void
language plpgsql security definer set search_path = public as $$
declare n int; nums text;
begin
  select count(*), string_agg('#' || number, ', ' order by promised_by) filter (where rn <= 4)
    into n, nums
    from (select number, promised_by, row_number() over (order by promised_by) rn
            from public.orders
           where status not in ('delivered', 'cancelled') and promised_by < now()) d;
  if n > 0 then
    perform public.raise_alert('orders:delayed', 'operations', case when n >= 3 then 'critical' else 'warning' end,
      n || ' order' || case when n = 1 then ' is' else 's are' end || ' delayed past ETA',
      'Orders ' || nums || case when n > 4 then ' and ' || (n - 4) || ' more' else '' end || ' are past their promised delivery window.',
      'del', 'Open delivery board');
  else
    perform public.resolve_alert('orders:delayed');
  end if;
end $$;

-- ─── System: coupons ending within 24 hours ──────────────────────────────────────────────
create or replace function public.check_coupon_alerts() returns void
language plpgsql security definer set search_path = public as $$
declare cp record;
begin
  for cp in select id, code, title, ends_at from public.coupons
             where active and ends_at > now() and ends_at <= now() + interval '24 hours' loop
    perform public.raise_alert('coupon:ending:' || cp.id, 'system', 'info',
      'Coupon ' || cp.code || ' ends in ' || greatest(1, ceil(extract(epoch from cp.ends_at - now()) / 3600))::int || ' hours',
      cp.title || ' · extend it in Promotions if it should keep running.', 'promo', 'Open promotions');
  end loop;
  update public.admin_alerts a set resolved_at = now(), updated_at = now()
   where a.resolved_at is null and a.dedup_key like 'coupon:ending:%'
     and not exists (select 1 from public.coupons c where 'coupon:ending:' || c.id = a.dedup_key and c.active and c.ends_at > now());
end $$;

-- ═══ Push tokens ═════════════════════════════════════════════════════════════════════════
create table if not exists public.push_tokens (
  token        text primary key check (token ~ '^Expo(nent)?PushToken\[.+\]$'),
  customer_id  uuid not null references public.customers (id) on delete cascade,
  platform     text not null check (platform in ('ios', 'android')),
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);
create index if not exists push_tokens_customer_idx on public.push_tokens (customer_id);

-- ═══ Campaigns ═══════════════════════════════════════════════════════════════════════════
create table if not exists public.push_campaigns (
  id           uuid primary key default gen_random_uuid(),
  title        text not null check (char_length(btrim(title)) between 1 and 65),
  message      text not null check (char_length(btrim(message)) between 1 and 178),
  type         text not null default 'promotional' check (type in ('promotional', 'order_update', 'system')),
  cta_label    text not null default '' check (char_length(cta_label) <= 20),
  link         text,               -- 'page:<name>' | 'category:<id>' | 'product:<id>'
  audience     text not null default 'all' check (audience in ('all', 'new', 'inactive', 'frequent', 'melbourne')),
  scheduled_at timestamptz,        -- null = send immediately when sent
  status       text not null default 'draft' check (status in ('draft', 'scheduled', 'sent', 'cancelled')),
  sent_at      timestamptz,
  recipients   int,
  created_by   uuid references auth.users (id) on delete set null default auth.uid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint push_campaigns_schedule check (status <> 'scheduled' or scheduled_at is not null)
);
drop trigger if exists push_campaigns_touch on public.push_campaigns;
create trigger push_campaigns_touch before update on public.push_campaigns for each row execute function public.touch_updated_at();

-- ═══ Customer inbox ══════════════════════════════════════════════════════════════════════
create table if not exists public.customer_notifications (
  id          bigint generated always as identity primary key,
  customer_id uuid not null references public.customers (id) on delete cascade,
  campaign_id uuid references public.push_campaigns (id) on delete set null,
  order_id    uuid references public.orders (id) on delete set null,
  kind        text not null check (kind in ('promotional', 'order_update', 'system')),
  title       text not null,
  body        text not null default '',
  link        text,
  push_status text not null default 'pending' check (push_status in ('pending', 'sending', 'sent', 'failed', 'skipped')),
  push_error  text,
  push_claimed_at timestamptz,   -- when a send-push run took it (stale claims are retried)
  created_at  timestamptz not null default now(),
  read_at     timestamptz,
  opened_at   timestamptz        -- the customer tapped it
);
create index if not exists customer_notifications_inbox on public.customer_notifications (customer_id, created_at desc);
create index if not exists customer_notifications_pending on public.customer_notifications (id) where push_status = 'pending';
create index if not exists customer_notifications_campaign on public.customer_notifications (campaign_id);

/** Customers a campaign reaches. Promotional messages need marketing opt-in; all need push opt-in. */
create or replace function public.campaign_audience(p_audience text, p_type text) returns setof uuid
language sql stable security definer set search_path = public as $$
  select c.id from public.customers c
   where c.push_opt_in
     and (p_type <> 'promotional' or c.marketing_opt_in)
     and case p_audience
           when 'all'       then true
           when 'new'       then c.created_at > now() - interval '30 days'
           when 'inactive'  then c.last_order_at < now() - interval '30 days'
           when 'frequent'  then (select count(*) from public.orders o where o.customer_id = c.id and o.status <> 'cancelled' and o.placed_at > now() - interval '60 days') >= 3
           when 'melbourne' then c.postcode::int between 3000 and 3207
           else false
         end;
$$;
revoke execute on function public.campaign_audience(text, text) from public, anon;

/** Reach estimate for the campaign form (admins only). */
create or replace function public.campaign_reach(p_audience text, p_type text)
returns table (audience_size int, reachable int)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  return query
    select (select count(*)::int from public.campaign_audience(p_audience, p_type)),
           (select count(distinct t.customer_id)::int from public.push_tokens t
             where t.customer_id in (select public.campaign_audience(p_audience, p_type)));
end $$;
grant execute on function public.campaign_reach(text, text) to authenticated;

/** Fans a campaign out to its audience's inboxes and marks it sent. */
create or replace function public.dispatch_campaign(p_id uuid) returns int
language plpgsql security definer set search_path = public as $$
declare c public.push_campaigns; n int;
begin
  select * into c from public.push_campaigns where id = p_id for update;
  if c.id is null or c.status in ('sent', 'cancelled') then return 0; end if;
  insert into public.customer_notifications (customer_id, campaign_id, kind, title, body, link)
  select a, c.id, c.type, c.title, c.message, c.link from public.campaign_audience(c.audience, c.type) a;
  get diagnostics n = row_count;
  update public.push_campaigns set status = 'sent', sent_at = now(), recipients = n where id = c.id;
  perform public.raise_alert('campaign:' || c.id, 'system', 'info',
    'Campaign “' || c.title || '” sent',
    case when n = 0 then 'No customers matched the audience, so nobody received it.'
         else 'Delivered to ' || n || ' customer inbox' || case when n = 1 then '' else 'es' end || '. Push notifications go out within a minute.' end,
    'notif', 'View campaigns');
  return n;
end $$;
revoke execute on function public.dispatch_campaign(uuid) from public, anon, authenticated;

/** Admin "Send now". */
create or replace function public.send_campaign_now(p_id uuid) returns int
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  n := public.dispatch_campaign(p_id);
  perform public.kick_push_sender();
  return n;
end $$;

-- ─── Order status → customer notification ────────────────────────────────────────────────
create or replace function public.notify_order_status() returns trigger
language plpgsql security definer set search_path = public as $$
declare t text; b text; opted boolean;
begin
  if new.status is not distinct from old.status then return new; end if;
  case new.status
    when 'confirmed'        then t := 'Order #' || new.number || ' confirmed'; b := 'We’ve got it and will start picking your groceries shortly.';
    when 'picking'          then t := 'We’re picking your groceries'; b := 'Your shopper has started on order #' || new.number || '.';
    when 'packed'           then t := 'Your order is packed'; b := 'Order #' || new.number || ' is packed and waiting for a driver.';
    when 'out_for_delivery' then t := 'Your order is on the way'; b := 'Order #' || new.number || ' is out for delivery.';
    when 'delivered'        then t := 'Delivered · enjoy!'; b := 'Order #' || new.number || ' has been delivered. Tap to rate your order.';
    when 'cancelled'        then t := 'Order #' || new.number || ' was cancelled'; b := 'If you were charged, the refund is on its way.';
    else return new;
  end case;
  select push_opt_in into opted from public.customers where id = new.customer_id;
  insert into public.customer_notifications (customer_id, order_id, kind, title, body, link, push_status)
  values (new.customer_id, new.id, 'order_update', t, b, 'order:' || new.id, case when opted then 'pending' else 'skipped' end);
  if opted then perform public.kick_push_sender(); end if;
  return new;
end $$;
drop trigger if exists notify_order_status on public.orders;
create trigger notify_order_status after update of status on public.orders for each row execute function public.notify_order_status();

-- ═══ Delivery: pg_net → send-push Edge Function ══════════════════════════════════════════
do $$
begin
  create extension if not exists pg_net with schema extensions;
exception when others then raise notice 'pg_net unavailable: %', sqlerrm;
end $$;

/** Asks the send-push Edge Function to deliver pending rows (no-op until the Vault secrets exist). */
create or replace function public.kick_push_sender() returns void
language plpgsql security definer set search_path = public as $$
declare base text; secret text;
begin
  if not exists (select 1 from public.customer_notifications where push_status = 'pending') then return; end if;
  begin
    select decrypted_secret into base   from vault.decrypted_secrets where name = 'project_url';
    select decrypted_secret into secret from vault.decrypted_secrets where name = 'push_dispatch_secret';
  exception when others then return;
  end;
  if base is null or secret is null or to_regproc('net.http_post') is null then return; end if;
  perform net.http_post(
    url := rtrim(base, '/') || '/functions/v1/send-push',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-dispatch-secret', secret),
    body := '{}'::jsonb
  );
end $$;
revoke execute on function public.kick_push_sender() from public, anon, authenticated;

/**
 * Atomically hands up to `p_limit` pending rows to one send-push run (service role only), so
 * overlapping runs never send the same notification twice.
 */
create or replace function public.claim_pending_notifications(p_limit int default 500)
returns table (id bigint, customer_id uuid, title text, body text, link text, kind text)
language sql security definer set search_path = public as $$
  update public.customer_notifications n
     set push_status = 'sending', push_claimed_at = now()
   where n.id in (select c.id from public.customer_notifications c
                   where c.push_status = 'pending' order by c.id limit p_limit
                   for update skip locked)
  returning n.id, n.customer_id, n.title, n.body, n.link, n.kind;
$$;
revoke execute on function public.claim_pending_notifications(int) from public, anon, authenticated;
grant execute on function public.claim_pending_notifications(int) to service_role;

/** Lets the send-push function raise a system alert (service role only). */
create or replace function public.raise_alert_service(p_key text, p_title text, p_body text) returns void
language sql security definer set search_path = public as $$
  select public.raise_alert(p_key, 'system', 'critical', p_title, p_body, 'notif', 'View campaigns');
$$;
revoke execute on function public.raise_alert_service(text, text, text) from public, anon, authenticated;
grant execute on function public.raise_alert_service(text, text, text) to service_role;

/** The minutely job. */
create or replace function public.notifications_tick() returns void
language plpgsql security definer set search_path = public as $$
declare c uuid;
begin
  for c in select id from public.push_campaigns where status = 'scheduled' and scheduled_at <= now() order by scheduled_at loop
    perform public.dispatch_campaign(c);
  end loop;
  -- Rows claimed by a run that died are retried.
  update public.customer_notifications set push_status = 'pending', push_claimed_at = null
   where push_status = 'sending' and push_claimed_at < now() - interval '10 minutes';
  perform public.check_order_alerts();
  perform public.check_coupon_alerts();
  perform public.kick_push_sender();
end $$;
revoke execute on function public.notifications_tick() from public, anon, authenticated;

do $$
begin
  create extension if not exists pg_cron;
  perform cron.unschedule(jobid) from cron.job where jobname = 'spicekart-notifications';
  perform cron.schedule('spicekart-notifications', '* * * * *', 'select public.notifications_tick()');
exception when others then raise notice 'pg_cron unavailable (%): enable it in Database → Extensions, then re-run this file.', sqlerrm;
end $$;

-- ═══ Row level security ══════════════════════════════════════════════════════════════════
alter table public.admin_alerts           enable row level security;
alter table public.push_tokens            enable row level security;
alter table public.push_campaigns         enable row level security;
alter table public.customer_notifications enable row level security;

grant select, update on public.admin_alerts to authenticated;
grant select, insert, update, delete on public.push_campaigns, public.push_tokens to authenticated;
grant select, update, delete on public.customer_notifications to authenticated;

drop policy if exists "Admins read alerts" on public.admin_alerts;
create policy "Admins read alerts" on public.admin_alerts for select to authenticated using ((select public.is_admin()));
drop policy if exists "Admins mark alerts" on public.admin_alerts;
create policy "Admins mark alerts" on public.admin_alerts for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Admins manage campaigns" on public.push_campaigns;
create policy "Admins manage campaigns" on public.push_campaigns for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()) and status in ('draft', 'scheduled', 'cancelled'));

drop policy if exists "Admins read push tokens" on public.push_tokens;
create policy "Admins read push tokens" on public.push_tokens for select to authenticated using ((select public.is_admin()));
drop policy if exists "Customers manage own push tokens" on public.push_tokens;
create policy "Customers manage own push tokens" on public.push_tokens for all to authenticated
  using (customer_id = (select auth.uid())) with check (customer_id = (select auth.uid()));

drop policy if exists "Admins read notifications" on public.customer_notifications;
create policy "Admins read notifications" on public.customer_notifications for select to authenticated using ((select public.is_admin()));
drop policy if exists "Customers read own notifications" on public.customer_notifications;
create policy "Customers read own notifications" on public.customer_notifications for select to authenticated using (customer_id = (select auth.uid()));
drop policy if exists "Customers mark own notifications" on public.customer_notifications;
create policy "Customers mark own notifications" on public.customer_notifications for update to authenticated
  using (customer_id = (select auth.uid())) with check (customer_id = (select auth.uid()));
drop policy if exists "Customers clear own notifications" on public.customer_notifications;
create policy "Customers clear own notifications" on public.customer_notifications for delete to authenticated using (customer_id = (select auth.uid()));
-- Customers may only flip read/opened; everything else stays as sent.
revoke update on public.customer_notifications from authenticated;
grant update (read_at, opened_at) on public.customer_notifications to authenticated;

grant execute on function public.send_campaign_now(uuid) to authenticated;

-- Per-campaign delivery stats for the admin list (RLS of the caller applies).
create or replace view public.push_campaign_stats with (security_invoker = true) as
  select campaign_id,
         count(*)::int                                            as recipients,
         count(*) filter (where push_status = 'sent')::int        as pushed,
         count(*) filter (where push_status = 'failed')::int      as failed,
         count(*) filter (where opened_at is not null)::int       as opened
    from public.customer_notifications
   where campaign_id is not null
   group by campaign_id;
grant select on public.push_campaign_stats to authenticated;

-- ═══ Realtime ════════════════════════════════════════════════════════════════════════════
do $$
declare t text;
begin
  foreach t in array array['admin_alerts', 'push_campaigns', 'customer_notifications'] loop
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

-- Raise alerts for stock that's already low or out when this file is first run.
do $$
declare p record;
begin
  for p in select id, name, stock_qty, coalesce(min_stock, 10) lim from public.products where track_inventory and stock_qty < coalesce(min_stock, 10) loop
    if p.stock_qty <= 0 then
      perform public.raise_alert('stock:out:' || p.id, 'inventory', 'critical', p.name || ' is out of stock',
        'Customers can’t add it to their cart until it’s restocked.', 'inv', 'Adjust stock');
    else
      perform public.raise_alert('stock:low:' || p.id, 'inventory', 'warning',
        p.name || ' has dropped to ' || p.stock_qty || ' unit' || case when p.stock_qty = 1 then '' else 's' end,
        'Below the minimum level of ' || p.lim || '.', 'inv', 'Adjust stock');
    end if;
  end loop;
end $$;
