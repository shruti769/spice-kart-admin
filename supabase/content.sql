-- Home screen content managed from Admin → Content:
--   featured categories · featured products (+ rail settings) · deals on home · seasonal collections.
-- Run once in Supabase → SQL Editor, after supabase/banners.sql. Safe to re-run.
--
-- Admins (public.is_admin()) get full access. Everyone else, including the customer app, can read
-- what the home screen needs: visible featured rows, and seasonal collections that are live today.

-- ─── Singleton settings row ──────────────────────────────────────────────────────────────
create table if not exists public.content_settings (
  id                      boolean primary key default true check (id),
  featured_products_title text not null default 'Bestsellers this week' check (char_length(btrim(featured_products_title)) between 1 and 40),
  -- What the featured-products rail does with an out-of-stock product.
  featured_products_oos   text not null default 'move_end' check (featured_products_oos in ('move_end', 'hide', 'keep')),
  updated_at              timestamptz not null default now()
);
insert into public.content_settings (id) values (true) on conflict (id) do nothing;

-- ─── Featured categories (round shortcuts on home; the app shows the first 8 visible) ─────
create table if not exists public.featured_categories (
  category_id text primary key references public.categories (id) on update cascade on delete cascade,
  sort        int not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ─── Featured products (horizontal rail on home) ─────────────────────────────────────────
create table if not exists public.featured_products (
  product_id uuid primary key references public.products (id) on delete cascade,
  sort       int not null default 0,
  visible    boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─── Deals on home (coupons shown in the "Today's deals" rail) ───────────────────────────
create table if not exists public.featured_deals (
  coupon_id  uuid primary key references public.coupons (id) on delete cascade,
  sort       int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Seasonal collections ────────────────────────────────────────────────────────────────
create table if not exists public.seasonal_collections (
  id           uuid primary key default gen_random_uuid(),
  name         text not null check (char_length(btrim(name)) between 1 and 40),
  tagline      text not null default '' check (char_length(tagline) <= 60),
  cover_path   text,  -- object path in the `banners` bucket (collections/…)
  cover_url    text,
  starts_on    date not null,
  ends_on      date not null,
  product_ids  uuid[] not null default '{}',
  show_on_home boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint seasonal_collections_date_order check (ends_on >= starts_on)
);

drop trigger if exists seasonal_collections_touch on public.seasonal_collections;
create trigger seasonal_collections_touch before update on public.seasonal_collections
  for each row execute function public.touch_updated_at();

drop trigger if exists content_settings_touch on public.content_settings;
create trigger content_settings_touch before update on public.content_settings
  for each row execute function public.touch_updated_at();

-- ─── Row level security ──────────────────────────────────────────────────────────────────
alter table public.content_settings     enable row level security;
alter table public.featured_categories  enable row level security;
alter table public.featured_products    enable row level security;
alter table public.featured_deals       enable row level security;
alter table public.seasonal_collections enable row level security;

grant select on public.content_settings, public.featured_categories, public.featured_products,
  public.featured_deals, public.seasonal_collections to anon, authenticated;
grant insert, update, delete on public.content_settings, public.featured_categories, public.featured_products,
  public.featured_deals, public.seasonal_collections to authenticated;

do $$
declare t text;
begin
  foreach t in array array['content_settings', 'featured_categories', 'featured_products', 'featured_deals', 'seasonal_collections'] loop
    execute format('drop policy if exists "Admins manage %1$s" on public.%1$I', t);
    execute format('create policy "Admins manage %1$s" on public.%1$I for all to authenticated
                    using ((select public.is_admin())) with check ((select public.is_admin()))', t);
  end loop;
end $$;

drop policy if exists "Anyone reads content settings" on public.content_settings;
create policy "Anyone reads content settings" on public.content_settings
  for select to anon, authenticated using (true);

drop policy if exists "Anyone reads visible featured categories" on public.featured_categories;
create policy "Anyone reads visible featured categories" on public.featured_categories
  for select to anon, authenticated using (visible);

drop policy if exists "Anyone reads visible featured products" on public.featured_products;
create policy "Anyone reads visible featured products" on public.featured_products
  for select to anon, authenticated using (visible);

-- Coupon RLS still decides whether the deal itself is readable (active, inside its dates).
drop policy if exists "Anyone reads featured deals" on public.featured_deals;
create policy "Anyone reads featured deals" on public.featured_deals
  for select to anon, authenticated using (true);

drop policy if exists "Anyone reads live collections" on public.seasonal_collections;
create policy "Anyone reads live collections" on public.seasonal_collections
  for select to anon, authenticated
  using (
    starts_on <= (now() at time zone 'Australia/Melbourne')::date
    and ends_on >= (now() at time zone 'Australia/Melbourne')::date
  );

-- ─── Instant app updates (only when the app's app_changes setup has been run) ────────────
do $$
declare t text;
begin
  if exists (select 1 from pg_proc where proname = 'bump_app_change' and pronamespace = 'public'::regnamespace) then
    foreach t in array array['content_settings', 'featured_categories', 'featured_products', 'featured_deals', 'seasonal_collections'] loop
      execute format('drop trigger if exists %1$s_app_change on public.%1$I', t);
      execute format('create trigger %1$s_app_change after insert or update or delete on public.%1$I
                      for each statement execute function public.bump_app_change()', t);
    end loop;
  end if;
end $$;
