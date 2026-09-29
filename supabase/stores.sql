-- Spice Kart · the store customers buy from (Admin → Settings → General).
-- Run in Supabase → SQL Editor after supabase/orders.sql. Safe to re-run.
--
-- The business has one store for now: the single `is_primary` row. Every new order is linked
-- to it automatically, and the app reads its name / address / phone. Adding more stores later
-- only needs a way to pick one per order; the column is already there.

create table if not exists public.stores (
  id            uuid primary key default gen_random_uuid(),
  name          text not null check (char_length(btrim(name)) between 1 and 60),
  support_email text check (support_email is null or support_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  support_phone text check (support_phone is null or char_length(support_phone) <= 20),
  abn           text check (abn is null or replace(abn, ' ', '') ~ '^[0-9]{11}$'),
  address_line  text not null default '' check (char_length(address_line) <= 120),
  suburb        text not null default '' check (char_length(suburb) <= 60),
  state         text not null default 'VIC' check (state in ('VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT')),
  postcode      text check (postcode is null or postcode ~ '^[0-9]{4}$'),
  is_primary    boolean not null default true,
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
-- Map pin (found with OpenStreetMap in Settings); null until the admin sets it.
alter table public.stores add column if not exists latitude  double precision check (latitude is null or latitude between -90 and 90);
alter table public.stores add column if not exists longitude double precision check (longitude is null or longitude between -180 and 180);
alter table public.stores drop constraint if exists stores_pin_pair;
alter table public.stores add constraint stores_pin_pair check ((latitude is null) = (longitude is null));

-- Only one primary store.
create unique index if not exists stores_one_primary on public.stores (is_primary) where is_primary;

drop trigger if exists stores_touch on public.stores;
create trigger stores_touch before update on public.stores for each row execute function public.touch_updated_at();

-- ─── Orders belong to a store ────────────────────────────────────────────────────────────
alter table public.orders add column if not exists store_id uuid references public.stores (id) on delete restrict;
create index if not exists orders_store_idx on public.orders (store_id, placed_at desc);

/** New orders go to the primary store (customers can't pick another one). */
create or replace function public.orders_assign_store() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.store_id is null or not public.is_admin() then
    select id into new.store_id from public.stores where is_primary and active;
    if new.store_id is null then
      raise exception 'No store is set up yet · add one in Admin → Settings → General' using errcode = 'P0001';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists orders_assign_store on public.orders;
create trigger orders_assign_store before insert on public.orders for each row execute function public.orders_assign_store();

-- Orders placed before this file ran go to the primary store once it exists.
update public.orders set store_id = (select id from public.stores where is_primary)
 where store_id is null and exists (select 1 from public.stores where is_primary);

-- ─── Row level security ──────────────────────────────────────────────────────────────────
alter table public.stores enable row level security;
grant select on public.stores to anon, authenticated;
grant insert, update, delete on public.stores to authenticated;

drop policy if exists "Admins manage stores" on public.stores;
create policy "Admins manage stores" on public.stores for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Anyone reads active stores" on public.stores;
create policy "Anyone reads active stores" on public.stores for select to anon, authenticated using (active);

-- Instant app updates (only when the app's app_changes setup has been run).
do $$
begin
  if exists (select 1 from pg_proc where proname = 'bump_app_change' and pronamespace = 'public'::regnamespace) then
    drop trigger if exists stores_app_change on public.stores;
    create trigger stores_app_change after insert or update or delete on public.stores
      for each statement execute function public.bump_app_change();
  end if;
end $$;
