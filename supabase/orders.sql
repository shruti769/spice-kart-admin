-- Spice Kart · customers, orders, payments, reviews and refund requests.
-- Run in Supabase → SQL Editor. Safe to re-run. Run before supabase/notifications.sql.
--
-- Customers are Supabase Auth users (the app signs in anonymously until phone OTP is added,
-- then links the phone to the same user). Each customer reads and creates only their own
-- rows; admins (public.is_admin()) read and manage everything.

-- ─── Customers ───────────────────────────────────────────────────────────────────────────
create table if not exists public.customers (
  id               uuid primary key references auth.users (id) on delete cascade,
  first_name       text not null default '' check (char_length(first_name) <= 60),
  last_name        text not null default '' check (char_length(last_name) <= 60),
  email            text check (email is null or char_length(email) <= 254),
  mobile           text check (mobile is null or mobile ~ '^[0-9]{9}$'),  -- 9 digits after +61
  suburb           text,
  postcode         text check (postcode is null or postcode ~ '^[0-9]{4}$'),
  push_opt_in      boolean not null default true,   -- order updates & delivery alerts
  marketing_opt_in boolean not null default false,  -- promotional notifications (Spam Act: opt-in)
  last_order_at    timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ─── Orders ──────────────────────────────────────────────────────────────────────────────
create sequence if not exists public.order_number_seq start 10500;

create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  number          text not null unique default ('SK' || nextval('public.order_number_seq')),
  customer_id     uuid not null references public.customers (id) on delete restrict,
  status          text not null default 'placed'
                  check (status in ('placed', 'confirmed', 'picking', 'packed', 'out_for_delivery', 'delivered', 'cancelled')),
  delivery_type   text not null check (delivery_type in ('express', 'scheduled')),
  slot_id         uuid references public.delivery_slots (id) on delete set null,
  slot_date       date,
  slot_label      text,
  promised_by     timestamptz,           -- end of the promised window; later = delayed
  address_line    text not null,
  address_area    text not null default '',
  postcode        text check (postcode is null or postcode ~ '^[0-9]{4}$'),
  delivery_notes  text not null default '',
  subtotal        numeric(10, 2) not null check (subtotal >= 0),
  delivery_fee    numeric(10, 2) not null default 0 check (delivery_fee >= 0),
  handling_fee    numeric(10, 2) not null default 0 check (handling_fee >= 0),
  discount        numeric(10, 2) not null default 0 check (discount >= 0),
  total           numeric(10, 2) not null check (total >= 0),
  coupon_code     text,
  payment_method  text not null check (payment_method in ('card', 'apple_pay', 'google_pay', 'payid', 'wallet')),
  payment_status  text not null default 'pending'
                  check (payment_status in ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
  placed_at       timestamptz not null default now(),
  delivered_at    timestamptz,
  cancelled_at    timestamptz,
  updated_at      timestamptz not null default now()
);
create index if not exists orders_customer_idx on public.orders (customer_id, placed_at desc);
create index if not exists orders_open_idx on public.orders (promised_by) where status not in ('delivered', 'cancelled');

create table if not exists public.order_items (
  id          bigint generated always as identity primary key,
  order_id    uuid not null references public.orders (id) on delete cascade,
  product_id  uuid references public.products (id) on delete set null,
  name        text not null,           -- snapshot, survives product edits
  image_url   text,
  qty         int not null check (qty > 0),
  unit_price  numeric(10, 2) not null check (unit_price >= 0),
  line_total  numeric(10, 2) generated always as (qty * unit_price) stored
);
create index if not exists order_items_order_idx on public.order_items (order_id);

-- ─── Payments (one row per attempt) ──────────────────────────────────────────────────────
create table if not exists public.payments (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references public.orders (id) on delete cascade,
  amount         numeric(10, 2) not null check (amount >= 0),
  method         text not null check (method in ('card', 'apple_pay', 'google_pay', 'payid', 'wallet')),
  status         text not null check (status in ('succeeded', 'failed', 'refunded')),
  card_brand     text,
  card_last4     text check (card_last4 is null or card_last4 ~ '^[0-9]{4}$'),
  provider_ref   text,
  failure_reason text,
  created_at     timestamptz not null default now()
);
create index if not exists payments_order_idx on public.payments (order_id);

-- ─── Reviews ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  order_id    uuid references public.orders (id) on delete set null,
  product_id  uuid references public.products (id) on delete cascade,
  rating      int not null check (rating between 1 and 5),
  comment     text not null default '' check (char_length(comment) <= 1000),
  -- Low ratings wait for moderation; 3+ stars publish straight away.
  status      text not null default 'published' check (status in ('pending', 'published', 'hidden')),
  reply       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists reviews_product_idx on public.reviews (product_id, created_at desc);

-- ─── Refund requests ─────────────────────────────────────────────────────────────────────
create sequence if not exists public.refund_number_seq start 2200;

create table if not exists public.refund_requests (
  id          uuid primary key default gen_random_uuid(),
  number      text not null unique default ('RF-' || nextval('public.refund_number_seq')),
  order_id    uuid not null references public.orders (id) on delete cascade,
  customer_id uuid not null references public.customers (id) on delete cascade,
  reason      text not null check (reason in ('missing_item', 'damaged_item', 'delivery_issue', 'payment_issue', 'refund_issue', 'other')),
  detail      text not null default '' check (char_length(detail) <= 1000),
  photo_url   text,
  amount      numeric(10, 2) check (amount is null or amount >= 0),
  status      text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'paid')),
  decided_at  timestamptz,
  created_at  timestamptz not null default now()
);

-- ─── Housekeeping triggers ───────────────────────────────────────────────────────────────
drop trigger if exists customers_touch on public.customers;
create trigger customers_touch before update on public.customers for each row execute function public.touch_updated_at();
drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders for each row execute function public.touch_updated_at();
drop trigger if exists reviews_touch on public.reviews;
create trigger reviews_touch before update on public.reviews for each row execute function public.touch_updated_at();

-- Stamps delivered/cancelled times and the customer's last order.
create or replace function public.orders_track_status() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.customers set last_order_at = new.placed_at where id = new.customer_id;
  elsif new.status is distinct from old.status then
    if new.status = 'delivered' then new.delivered_at := coalesce(new.delivered_at, now()); end if;
    if new.status = 'cancelled' then new.cancelled_at := coalesce(new.cancelled_at, now()); end if;
  end if;
  return new;
end $$;
drop trigger if exists orders_track_status_ins on public.orders;
create trigger orders_track_status_ins after insert on public.orders for each row execute function public.orders_track_status();
drop trigger if exists orders_track_status_upd on public.orders;
create trigger orders_track_status_upd before update on public.orders for each row execute function public.orders_track_status();

-- A failed or succeeded payment updates the order's payment status.
create or replace function public.payments_sync_order() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.orders
     set payment_status = case new.status when 'succeeded' then 'paid' when 'failed' then 'failed' else 'refunded' end
   where id = new.order_id;
  return new;
end $$;
drop trigger if exists payments_sync_order on public.payments;
create trigger payments_sync_order after insert on public.payments for each row execute function public.payments_sync_order();

-- Low ratings are held for moderation.
create or replace function public.reviews_moderate() returns trigger
language plpgsql as $$
begin
  if new.rating <= 2 and not public.is_admin() then new.status := 'pending'; end if;
  return new;
end $$;
drop trigger if exists reviews_moderate on public.reviews;
create trigger reviews_moderate before insert on public.reviews for each row execute function public.reviews_moderate();

-- ─── Row level security ──────────────────────────────────────────────────────────────────
alter table public.customers       enable row level security;
alter table public.orders          enable row level security;
alter table public.order_items     enable row level security;
alter table public.payments        enable row level security;
alter table public.reviews         enable row level security;
alter table public.refund_requests enable row level security;

grant select, insert, update on public.customers to authenticated;
grant select, insert, update, delete on public.orders, public.order_items, public.payments, public.reviews, public.refund_requests to authenticated;
grant select on public.reviews to anon;
grant usage on sequence public.order_number_seq, public.refund_number_seq to authenticated;

do $$
declare t text;
begin
  foreach t in array array['customers', 'orders', 'order_items', 'payments', 'reviews', 'refund_requests'] loop
    execute format('drop policy if exists "Admins manage %1$s" on public.%1$I', t);
    execute format('create policy "Admins manage %1$s" on public.%1$I for all to authenticated
                    using ((select public.is_admin())) with check ((select public.is_admin()))', t);
  end loop;
end $$;

-- Customers: their own profile.
drop policy if exists "Customers read own profile" on public.customers;
create policy "Customers read own profile" on public.customers for select to authenticated using (id = (select auth.uid()));
drop policy if exists "Customers create own profile" on public.customers;
create policy "Customers create own profile" on public.customers for insert to authenticated with check (id = (select auth.uid()));
drop policy if exists "Customers update own profile" on public.customers;
create policy "Customers update own profile" on public.customers for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Orders: read own; place new ones as 'placed' + unpaid (status changes are admin-only).
drop policy if exists "Customers read own orders" on public.orders;
create policy "Customers read own orders" on public.orders for select to authenticated using (customer_id = (select auth.uid()));
drop policy if exists "Customers place orders" on public.orders;
create policy "Customers place orders" on public.orders for insert to authenticated
  with check (customer_id = (select auth.uid()) and status = 'placed' and payment_status = 'pending');

-- Line items and payments hang off an order the customer owns.
drop policy if exists "Customers read own order items" on public.order_items;
create policy "Customers read own order items" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = (select auth.uid())));
drop policy if exists "Customers add own order items" on public.order_items;
create policy "Customers add own order items" on public.order_items for insert to authenticated
  with check (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = (select auth.uid()) and o.status = 'placed'));

drop policy if exists "Customers read own payments" on public.payments;
create policy "Customers read own payments" on public.payments for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = (select auth.uid())));
drop policy if exists "Customers record own payments" on public.payments;
create policy "Customers record own payments" on public.payments for insert to authenticated
  with check (status in ('succeeded', 'failed')
              and exists (select 1 from public.orders o where o.id = order_id and o.customer_id = (select auth.uid())));

-- Reviews: anyone reads published ones; customers read and write their own.
drop policy if exists "Anyone reads published reviews" on public.reviews;
create policy "Anyone reads published reviews" on public.reviews for select to anon, authenticated
  using (status = 'published' or customer_id = (select auth.uid()));
drop policy if exists "Customers write own reviews" on public.reviews;
create policy "Customers write own reviews" on public.reviews for insert to authenticated
  with check (customer_id = (select auth.uid()) and reply is null);

-- Refund requests: customers raise and read their own.
drop policy if exists "Customers read own refunds" on public.refund_requests;
create policy "Customers read own refunds" on public.refund_requests for select to authenticated using (customer_id = (select auth.uid()));
drop policy if exists "Customers request refunds" on public.refund_requests;
create policy "Customers request refunds" on public.refund_requests for insert to authenticated
  with check (customer_id = (select auth.uid()) and status = 'pending' and amount is null
              and exists (select 1 from public.orders o where o.id = order_id and o.customer_id = (select auth.uid())));

-- ─── Realtime: customers watch their own order status; admins watch everything ──────────
do $$
declare t text;
begin
  foreach t in array array['orders', 'payments', 'reviews', 'refund_requests'] loop
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
