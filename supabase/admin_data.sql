-- Spice Kart · data for the admin's Dashboard, Analytics, Delivery, Customers, Reviews, Payments
-- and Staff & Admins pages. Run in Supabase → SQL Editor after business_settings.sql. Safe to re-run.
--
--   admins (+ profile columns)  staff list, roles, invites; inactive staff lose admin access
--   drivers + orders.driver_id  delivery board, assignment, auto-reassign, delay notices
--   customers.suspended_at      suspended customers can't place orders (error: account_suspended)
--   customer_stats (view)       orders / spend / last order / status per customer
--   reviews reply/hide          a reply notifies the customer
--   payments.reference          TXN-10001… ; refund_order() / decide_refund()
--   admin_* functions           dashboard + analytics numbers (Melbourne days), admins only

-- ═══ Staff & admins ══════════════════════════════════════════════════════════════════════
alter table public.admins add column if not exists name       text not null default '';
alter table public.admins add column if not exists email      text;
alter table public.admins add column if not exists role       text not null default 'Super Admin';
alter table public.admins add column if not exists department text not null default '';
alter table public.admins add column if not exists status     text not null default 'active';
alter table public.admins add column if not exists invited_by uuid references auth.users (id) on delete set null;
alter table public.admins add column if not exists invited_at timestamptz;
alter table public.admins drop constraint if exists admins_role_check;
alter table public.admins add constraint admins_role_check check (role in
  ('Super Admin', 'Operations Manager', 'Inventory Manager', 'Order Manager', 'Customer Support', 'Content Manager'));
alter table public.admins drop constraint if exists admins_status_check;
alter table public.admins add constraint admins_status_check check (status in ('active', 'inactive', 'invited'));

drop policy if exists "Admins read all staff" on public.admins;
create policy "Admins read all staff" on public.admins for select to authenticated using ((select public.is_admin()));
drop policy if exists "Admins update staff" on public.admins;
create policy "Admins update staff" on public.admins for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "Admins remove staff" on public.admins;
create policy "Admins remove staff" on public.admins for delete to authenticated
  using ((select public.is_admin()) and user_id <> (select auth.uid()));
grant select, update, delete on public.admins to authenticated;

-- Nobody can lock themselves out, and there's always at least one active Super Admin.
create or replace function public.admins_guard() returns trigger
language plpgsql set search_path = public as $$
begin
  if old.user_id = auth.uid() and (tg_op = 'DELETE' or new.status <> 'active') then
    raise exception 'You can’t deactivate or remove yourself' using errcode = '23514';
  end if;
  if old.role = 'Super Admin' and old.status = 'active'
     and (tg_op = 'DELETE' or new.role <> 'Super Admin' or new.status <> 'active')
     and not exists (select 1 from public.admins where role = 'Super Admin' and status = 'active' and user_id <> old.user_id) then
    raise exception 'Keep at least one active Super Admin' using errcode = '23514';
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end $$;
drop trigger if exists admins_guard on public.admins;
create trigger admins_guard before update or delete on public.admins for each row execute function public.admins_guard();

/** Staff with sign-in info from auth (admins only). */
create or replace function public.staff_list()
returns table (user_id uuid, name text, email text, role text, department text, status text,
               invited_at timestamptz, created_at timestamptz, last_sign_in_at timestamptz, last_active_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  return query
    select a.user_id, coalesce(nullif(a.name, ''), split_part(u.email, '@', 1)), coalesce(a.email, u.email), a.role, a.department, a.status,
           a.invited_at, a.created_at, u.last_sign_in_at,
           greatest(u.last_sign_in_at, (select max(coalesce(s.refreshed_at::timestamptz, s.updated_at)) from auth.sessions s where s.user_id = a.user_id))
      from public.admins a join auth.users u on u.id = a.user_id
     order by a.created_at;
end $$;
grant execute on function public.staff_list() to authenticated;

/** Called by the admin app after sign-in: an invited admin becomes active. */
create or replace function public.staff_signed_in() returns void
language sql security definer set search_path = '' as $$
  update public.admins set status = 'active' where user_id = (select auth.uid()) and status = 'invited';
$$;
grant execute on function public.staff_signed_in() to authenticated;

-- ═══ Drivers ═════════════════════════════════════════════════════════════════════════════
create table if not exists public.drivers (
  id           uuid primary key default gen_random_uuid(),
  name         text not null check (char_length(btrim(name)) between 1 and 80),
  phone        text check (phone is null or char_length(phone) <= 20),
  vehicle      text not null default '' check (char_length(vehicle) <= 60),
  zone         text not null default '' check (char_length(zone) <= 60),
  status       text not null default 'active' check (status in ('active', 'inactive')),
  last_lat     double precision,  -- filled by a rider app later
  last_lng     double precision,
  last_seen_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
drop trigger if exists drivers_touch on public.drivers;
create trigger drivers_touch before update on public.drivers for each row execute function public.touch_updated_at();

alter table public.orders add column if not exists driver_id   uuid references public.drivers (id) on delete set null;
alter table public.orders add column if not exists assigned_at timestamptz;
create index if not exists orders_driver_idx on public.orders (driver_id) where status not in ('delivered', 'cancelled');

create or replace function public.orders_stamp_assignment() returns trigger
language plpgsql as $$
begin
  if new.driver_id is distinct from old.driver_id then new.assigned_at := case when new.driver_id is null then null else now() end; end if;
  return new;
end $$;
drop trigger if exists orders_stamp_assignment on public.orders;
create trigger orders_stamp_assignment before update of driver_id on public.orders for each row execute function public.orders_stamp_assignment();

alter table public.drivers enable row level security;
grant select, insert, update, delete on public.drivers to authenticated;
drop policy if exists "Admins manage drivers" on public.drivers;
create policy "Admins manage drivers" on public.drivers for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

/** Delayed orders go to the active driver with the fewest open orders. Returns how many moved. */
create or replace function public.auto_reassign_delayed() returns int
language plpgsql security definer set search_path = public as $$
declare o record; d uuid; n int := 0;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  for o in select id, driver_id from public.orders
            where status not in ('delivered', 'cancelled') and promised_by < now() order by promised_by loop
    select dr.id into d from public.drivers dr
     where dr.status = 'active' and dr.id is distinct from o.driver_id
     order by (select count(*) from public.orders x where x.driver_id = dr.id and x.status not in ('delivered', 'cancelled')), dr.created_at
     limit 1;
    exit when d is null;
    -- Only move it when the new driver is less busy than the current one.
    if o.driver_id is null or
       (select count(*) from public.orders x where x.driver_id = d and x.status not in ('delivered', 'cancelled'))
       < (select count(*) from public.orders x where x.driver_id = o.driver_id and x.status not in ('delivered', 'cancelled')) - 1 then
      update public.orders set driver_id = d where id = o.id;
      n := n + 1;
    end if;
  end loop;
  return n;
end $$;
grant execute on function public.auto_reassign_delayed() to authenticated;

/** Tells customers of delayed orders (once per order per hour). Returns how many were told. */
create or replace function public.notify_delayed_customers() returns int
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  insert into public.customer_notifications (customer_id, order_id, kind, title, body, link)
  select o.customer_id, o.id, 'order_update', 'Your order is running a little late',
         'Sorry! Order #' || o.number || ' is taking longer than planned. It’s on its way as fast as we can.', 'order:' || o.id
    from public.orders o
   where o.status not in ('delivered', 'cancelled') and o.promised_by < now()
     and not exists (select 1 from public.customer_notifications c
                      where c.order_id = o.id and c.title = 'Your order is running a little late' and c.created_at > now() - interval '1 hour');
  get diagnostics n = row_count;
  if n > 0 then perform public.kick_push_sender(); end if;
  return n;
end $$;
grant execute on function public.notify_delayed_customers() to authenticated;

-- ═══ Customers ═══════════════════════════════════════════════════════════════════════════
alter table public.customers add column if not exists suspended_at     timestamptz;
alter table public.customers add column if not exists suspended_reason text check (suspended_reason is null or char_length(suspended_reason) <= 300);

create or replace function public.orders_block_suspended() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from public.customers where id = new.customer_id and suspended_at is not null) then
    raise exception 'account_suspended' using errcode = 'P0001';
  end if;
  return new;
end $$;
drop trigger if exists orders_block_suspended on public.orders;
create trigger orders_block_suspended before insert on public.orders for each row execute function public.orders_block_suspended();

-- A customer can't lift their own suspension.
create or replace function public.customers_guard() returns trigger
language plpgsql set search_path = public as $$
begin
  if not public.is_admin() and (new.suspended_at is distinct from old.suspended_at or new.suspended_reason is distinct from old.suspended_reason) then
    new.suspended_at := old.suspended_at;
    new.suspended_reason := old.suspended_reason;
  end if;
  return new;
end $$;
drop trigger if exists customers_guard on public.customers;
create trigger customers_guard before update on public.customers for each row execute function public.customers_guard();

create or replace view public.customer_stats with (security_invoker = true) as
  select c.id, c.first_name, c.last_name, c.email, c.mobile, c.suburb, c.postcode, c.created_at,
         c.suspended_at, c.suspended_reason, c.marketing_opt_in,
         coalesce(s.orders, 0)       as orders,
         coalesce(s.spend, 0)::numeric(12, 2) as total_spend,
         s.last_order_at,
         case when c.suspended_at is not null then 'suspended'
              when s.last_order_at > now() - interval '30 days' then 'active'
              else 'inactive' end as status
    from public.customers c
    left join (select customer_id, count(*) filter (where status <> 'cancelled') orders,
                      sum(total) filter (where status <> 'cancelled') spend, max(placed_at) last_order_at
                 from public.orders group by customer_id) s on s.customer_id = c.id;
grant select on public.customer_stats to authenticated;

create or replace function public.customer_summary() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  select jsonb_build_object(
    'total', count(*),
    'new_week', count(*) filter (where created_at > now() - interval '7 days'),
    'new_month', count(*) filter (where created_at > now() - interval '30 days'),
    'total_month_ago', count(*) filter (where created_at <= now() - interval '30 days'),
    'active', count(*) filter (where status = 'active'),
    'suspended', count(*) filter (where status = 'suspended'),
    'buyers', count(*) filter (where orders >= 1),
    'returning', count(*) filter (where orders >= 2),
    'returning_month_ago', (select count(*) from (select customer_id from public.orders where status <> 'cancelled' and placed_at <= now() - interval '30 days' group by 1 having count(*) >= 2) x),
    'buyers_month_ago', (select count(distinct customer_id) from public.orders where status <> 'cancelled' and placed_at <= now() - interval '30 days')
  ) into r from public.customer_stats;
  return r;
end $$;
grant execute on function public.customer_summary() to authenticated;

-- ═══ Reviews ═════════════════════════════════════════════════════════════════════════════
alter table public.reviews add column if not exists replied_at    timestamptz;
alter table public.reviews add column if not exists hidden_reason text check (hidden_reason is null or char_length(hidden_reason) <= 300);

create or replace function public.reviews_on_reply() returns trigger
language plpgsql security definer set search_path = public as $$
declare pname text;
begin
  if new.reply is not null and new.reply is distinct from old.reply then
    new.replied_at := now();
    select name into pname from public.products where id = new.product_id;
    insert into public.customer_notifications (customer_id, kind, title, body, link)
    values (new.customer_id, 'system', 'Spice Kart replied to your review',
            left(coalesce(pname || ': ', '') || new.reply, 178), case when new.product_id is not null then 'product:' || new.product_id end);
  elsif new.reply is null then
    new.replied_at := null;
  end if;
  return new;
end $$;
drop trigger if exists reviews_on_reply on public.reviews;
create trigger reviews_on_reply before update of reply on public.reviews for each row execute function public.reviews_on_reply();

create or replace function public.review_summary() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  select jsonb_build_object(
    'count', count(*),
    'average', round(avg(rating) filter (where status = 'published'), 2),
    'published', count(*) filter (where status = 'published'),
    'pending', count(*) filter (where status = 'pending'),
    'hidden', count(*) filter (where status = 'hidden'),
    'replied', count(*) filter (where reply is not null),
    'by_rating', jsonb_build_object('5', count(*) filter (where rating = 5), '4', count(*) filter (where rating = 4),
                                    '3', count(*) filter (where rating = 3), '2', count(*) filter (where rating = 2),
                                    '1', count(*) filter (where rating = 1))
  ) into r from public.reviews;
  return r;
end $$;
grant execute on function public.review_summary() to authenticated;

-- ═══ Payments & refunds ══════════════════════════════════════════════════════════════════
create sequence if not exists public.payment_ref_seq start 10001;
alter table public.payments add column if not exists reference text unique default ('TXN-' || nextval('public.payment_ref_seq'));
alter table public.payments add column if not exists refund_reason text;
update public.payments set reference = 'TXN-' || nextval('public.payment_ref_seq') where reference is null;

/** Records a refund of `p_amount` (default: what's left) on an order. No money moves until a provider is connected. */
create or replace function public.refund_order(p_order uuid, p_amount numeric default null, p_reason text default null) returns public.payments
language plpgsql security definer set search_path = public as $$
declare o public.orders; paid numeric; refunded numeric; amt numeric; p public.payments; m text;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  select * into o from public.orders where id = p_order for update;
  if o.id is null then raise exception 'Order not found' using errcode = 'P0002'; end if;
  select coalesce(sum(amount) filter (where status = 'succeeded'), 0), coalesce(sum(amount) filter (where status = 'refunded'), 0)
    into paid, refunded from public.payments where order_id = p_order;
  if paid = 0 then raise exception 'Nothing was paid on this order, so there’s nothing to refund' using errcode = 'P0001'; end if;
  amt := round(coalesce(p_amount, paid - refunded), 2);
  if amt <= 0 or amt > paid - refunded then
    raise exception 'Refund must be between $0.01 and $% (what’s left)', to_char(paid - refunded, 'FM999990.00') using errcode = 'P0001';
  end if;
  select method into m from public.payments where order_id = p_order and status = 'succeeded' order by created_at desc limit 1;
  insert into public.payments (order_id, amount, method, status, refund_reason)
  values (p_order, amt, coalesce(m, o.payment_method), 'refunded', nullif(btrim(p_reason), '')) returning * into p;
  -- payments_sync_order sets 'refunded'; a partial refund is 'partially_refunded'.
  update public.orders set payment_status = case when refunded + amt >= paid then 'refunded' else 'partially_refunded' end where id = p_order;
  return p;
end $$;
grant execute on function public.refund_order(uuid, numeric, text) to authenticated;

/**
 * Approve or reject a customer's refund request, and tell the customer.
 * Approved + something was paid → the refund is recorded now (status 'paid').
 * Approved + nothing paid yet (no payment provider) → status 'approved' = processing, pay it out manually.
 */
create or replace function public.decide_refund(p_request uuid, p_approve boolean, p_amount numeric default null) returns public.refund_requests
language plpgsql security definer set search_path = public as $$
declare r public.refund_requests; o public.orders; paid numeric; refunded numeric; amt numeric;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  select * into r from public.refund_requests where id = p_request for update;
  if r.id is null then raise exception 'Refund request not found' using errcode = 'P0002'; end if;
  if r.status <> 'pending' then raise exception 'This request was already decided' using errcode = 'P0001'; end if;
  select * into o from public.orders where id = r.order_id;
  if p_approve then
    select coalesce(sum(amount) filter (where status = 'succeeded'), 0), coalesce(sum(amount) filter (where status = 'refunded'), 0)
      into paid, refunded from public.payments where order_id = r.order_id;
    amt := round(coalesce(p_amount, r.amount, case when paid > 0 then paid - refunded else o.total end), 2);
    if amt <= 0 or amt > o.total then raise exception 'Refund must be between $0.01 and the order total ($%)', to_char(o.total, 'FM999990.00') using errcode = 'P0001'; end if;
    if paid - refunded > 0 then
      perform public.refund_order(r.order_id, least(amt, paid - refunded), 'Refund request ' || r.number);
      update public.refund_requests set status = 'paid', amount = least(amt, paid - refunded), decided_at = now() where id = p_request returning * into r;
    else
      update public.refund_requests set status = 'approved', amount = amt, decided_at = now() where id = p_request returning * into r;
    end if;
  else
    update public.refund_requests set status = 'rejected', decided_at = now() where id = p_request returning * into r;
  end if;
  insert into public.customer_notifications (customer_id, order_id, kind, title, body, link)
  values (r.customer_id, r.order_id, 'order_update',
          case when p_approve then 'Refund ' || r.number || ' approved' else 'Refund ' || r.number || ' declined' end,
          case when p_approve then '$' || to_char(r.amount, 'FM999990.00') || ' for order #' || o.number || ' is on its way back to you.'
               else 'We couldn’t approve the refund for order #' || o.number || '. Contact support if you have questions.' end,
          'order:' || r.order_id);
  perform public.kick_push_sender();
  return r;
end $$;
grant execute on function public.decide_refund(uuid, boolean, numeric) to authenticated;

/** Payments page cards for one Melbourne day (default today). */
create or replace function public.payment_summary(p_day date default null) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare d date := coalesce(p_day, (now() at time zone 'Australia/Melbourne')::date); r jsonb;
        t0 timestamptz; t1 timestamptz;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  t0 := d::timestamp at time zone 'Australia/Melbourne'; t1 := (d + 1)::timestamp at time zone 'Australia/Melbourne';
  select jsonb_build_object(
    'revenue', coalesce(sum(amount) filter (where status = 'succeeded'), 0) - coalesce(sum(amount) filter (where status = 'refunded'), 0),
    'succeeded', count(*) filter (where status = 'succeeded'),
    'failed', count(*) filter (where status = 'failed'),
    'refunded_amount', coalesce(sum(amount) filter (where status = 'refunded'), 0),
    'refunds', count(*) filter (where status = 'refunded'),
    'prev_revenue', (select coalesce(sum(amount) filter (where status = 'succeeded'), 0) - coalesce(sum(amount) filter (where status = 'refunded'), 0)
                       from public.payments where created_at >= t0 - interval '1 day' and created_at < t0)
  ) into r from public.payments where created_at >= t0 and created_at < t1;
  return r || jsonb_build_object('pending', (select count(*) from public.orders where payment_status = 'pending' and status <> 'cancelled'));
end $$;
grant execute on function public.payment_summary(date) to authenticated;

-- ═══ Dashboard & analytics (Melbourne days; revenue excludes cancelled orders) ═══════════
/** Headline numbers for [p_from, p_to) and the equal period before it. */
create or replace function public.admin_kpis(p_from timestamptz, p_to timestamptz) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare len interval := p_to - p_from; cur jsonb; prev jsonb;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  select jsonb_build_object(
    'orders', count(*) filter (where status <> 'cancelled'),
    'revenue', coalesce(sum(total) filter (where status <> 'cancelled'), 0),
    'aov', coalesce(round(avg(total) filter (where status <> 'cancelled'), 2), 0),
    'cancelled', count(*) filter (where status = 'cancelled'),
    'placed', count(*),
    'customers', count(distinct customer_id) filter (where status <> 'cancelled'),
    'repeat_customers', (select count(*) from (select customer_id from public.orders
                          where placed_at >= p_from and placed_at < p_to and status <> 'cancelled' group by 1 having count(*) >= 2) x),
    'new_customers', (select count(*) from public.customers where created_at >= p_from and created_at < p_to)
  ) into cur from public.orders where placed_at >= p_from and placed_at < p_to;
  select jsonb_build_object(
    'orders', count(*) filter (where status <> 'cancelled'),
    'revenue', coalesce(sum(total) filter (where status <> 'cancelled'), 0),
    'aov', coalesce(round(avg(total) filter (where status <> 'cancelled'), 2), 0),
    'cancelled', count(*) filter (where status = 'cancelled'),
    'placed', count(*),
    'customers', count(distinct customer_id) filter (where status <> 'cancelled'),
    'repeat_customers', (select count(*) from (select customer_id from public.orders
                          where placed_at >= p_from - len and placed_at < p_from and status <> 'cancelled' group by 1 having count(*) >= 2) x),
    'new_customers', (select count(*) from public.customers where created_at >= p_from - len and created_at < p_from)
  ) into prev from public.orders where placed_at >= p_from - len and placed_at < p_from;
  return jsonb_build_object('current', cur, 'previous', prev);
end $$;
grant execute on function public.admin_kpis(timestamptz, timestamptz) to authenticated;

/** One row per Melbourne day in [p_from, p_to): orders, revenue, new customers, customers to date. */
create or replace function public.admin_daily_series(p_from timestamptz, p_to timestamptz)
returns table (day date, orders int, revenue numeric, new_customers int, total_customers int)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  return query
    select g::date,
           (select count(*)::int from public.orders o where (o.placed_at at time zone 'Australia/Melbourne')::date = g::date and o.status <> 'cancelled'),
           (select coalesce(sum(o.total), 0) from public.orders o where (o.placed_at at time zone 'Australia/Melbourne')::date = g::date and o.status <> 'cancelled'),
           (select count(*)::int from public.customers c where (c.created_at at time zone 'Australia/Melbourne')::date = g::date),
           (select count(*)::int from public.customers c where (c.created_at at time zone 'Australia/Melbourne')::date <= g::date)
      from generate_series((p_from at time zone 'Australia/Melbourne')::date,
                           ((p_to - interval '1 microsecond') at time zone 'Australia/Melbourne')::date, interval '1 day') g;
end $$;
grant execute on function public.admin_daily_series(timestamptz, timestamptz) to authenticated;

create or replace function public.admin_top_products(p_from timestamptz, p_to timestamptz, p_limit int default 5)
returns table (product_id uuid, name text, image_url text, units int, revenue numeric)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  return query
    select i.product_id, max(i.name), max(coalesce(p.image_url, i.image_url)), sum(i.qty)::int, sum(i.line_total)
      from public.order_items i join public.orders o on o.id = i.order_id left join public.products p on p.id = i.product_id
     where o.placed_at >= p_from and o.placed_at < p_to and o.status <> 'cancelled'
     group by i.product_id order by sum(i.line_total) desc limit p_limit;
end $$;
grant execute on function public.admin_top_products(timestamptz, timestamptz, int) to authenticated;

create or replace function public.admin_category_performance(p_from timestamptz, p_to timestamptz)
returns table (category_id text, name text, units int, revenue numeric)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  return query
    select c.id, c.name, sum(i.qty)::int, sum(i.line_total)
      from public.order_items i join public.orders o on o.id = i.order_id
      join public.products p on p.id = i.product_id join public.categories c on c.id = p.category_id
     where o.placed_at >= p_from and o.placed_at < p_to and o.status <> 'cancelled'
     group by c.id, c.name order by sum(i.line_total) desc;
end $$;
grant execute on function public.admin_category_performance(timestamptz, timestamptz) to authenticated;

/** Delivery performance for orders delivered in [p_from, p_to) and the period before. */
create or replace function public.admin_delivery_performance(p_from timestamptz, p_to timestamptz) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare len interval := p_to - p_from;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  return (
    select jsonb_build_object(
      'current', jsonb_build_object(
        'delivered', count(*) filter (where delivered_at >= p_from),
        'avg_minutes', round(avg(extract(epoch from delivered_at - placed_at) / 60) filter (where delivered_at >= p_from and delivery_type = 'express'), 1),
        'on_time_rate', round(100.0 * count(*) filter (where delivered_at >= p_from and delivered_at <= promised_by) / nullif(count(*) filter (where delivered_at >= p_from and promised_by is not null), 0), 1),
        'express_share', round(100.0 * count(*) filter (where delivered_at >= p_from and delivery_type = 'express') / nullif(count(*) filter (where delivered_at >= p_from), 0), 1)),
      'previous', jsonb_build_object(
        'delivered', count(*) filter (where delivered_at < p_from),
        'avg_minutes', round(avg(extract(epoch from delivered_at - placed_at) / 60) filter (where delivered_at < p_from and delivery_type = 'express'), 1),
        'on_time_rate', round(100.0 * count(*) filter (where delivered_at < p_from and delivered_at <= promised_by) / nullif(count(*) filter (where delivered_at < p_from and promised_by is not null), 0), 1),
        'express_share', round(100.0 * count(*) filter (where delivered_at < p_from and delivery_type = 'express') / nullif(count(*) filter (where delivered_at < p_from), 0), 1)))
      from public.orders
     where status = 'delivered' and delivered_at >= p_from - len and delivered_at < p_to
  );
end $$;
grant execute on function public.admin_delivery_performance(timestamptz, timestamptz) to authenticated;

/** Orders by status placed in [p_from, p_to), plus refunded (payment) as its own bucket. */
create or replace function public.admin_status_counts(p_from timestamptz, p_to timestamptz) returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  return (select coalesce(jsonb_object_agg(status, n), '{}'::jsonb) from (select status, count(*) n from public.orders
            where placed_at >= p_from and placed_at < p_to group by status) s)
      || jsonb_build_object('refunded', (select count(*) from public.orders where placed_at >= p_from and placed_at < p_to
                                          and payment_status in ('refunded', 'partially_refunded')));
end $$;
grant execute on function public.admin_status_counts(timestamptz, timestamptz) to authenticated;

-- ═══ Realtime ════════════════════════════════════════════════════════════════════════════
do $$
declare t text;
begin
  foreach t in array array['drivers', 'customers', 'admins'] loop
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

-- Used by the invite-admin Edge Function to find an existing account by email (service role only).
create or replace function public.user_id_by_email(p_email text) returns uuid
language sql stable security definer set search_path = '' as $$
  select id from auth.users where lower(email) = lower(btrim(p_email)) limit 1;
$$;
revoke execute on function public.user_id_by_email(text) from public, anon, authenticated;
grant execute on function public.user_id_by_email(text) to service_role;

/** "Send notification" to one customer from their profile (admins only). */
create or replace function public.notify_customer(p_customer uuid, p_title text, p_body text, p_link text default null) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  if char_length(btrim(coalesce(p_title, ''))) not between 1 and 65 then raise exception 'Title must be 1–65 characters' using errcode = '23514'; end if;
  if char_length(coalesce(p_body, '')) > 178 then raise exception 'Message must be 178 characters or less' using errcode = '23514'; end if;
  insert into public.customer_notifications (customer_id, kind, title, body, link, push_status)
  select p_customer, 'system', btrim(p_title), coalesce(p_body, ''), p_link,
         case when c.push_opt_in then 'pending' else 'skipped' end
    from public.customers c where c.id = p_customer;
  if not found then raise exception 'Customer not found' using errcode = 'P0002'; end if;
  perform public.kick_push_sender();
end $$;
grant execute on function public.notify_customer(uuid, text, text, text) to authenticated;
