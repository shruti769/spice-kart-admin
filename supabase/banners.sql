-- Homepage banners for the Spice Kart app.
-- Run once in Supabase → SQL Editor. Safe to re-run: every step is idempotent.
--
-- Admins (rows in public.admins) get full access. Everyone else, including the customer app,
-- can read only published banners whose dates include today (Melbourne time).

-- ─── Table ────────────────────────────────────────────────────────────────────────────────
create table if not exists public.banners (
  id               uuid primary key default gen_random_uuid(),
  title            text not null check (char_length(btrim(title)) between 1 and 40),
  subtitle         text not null default '' check (char_length(subtitle) <= 40),
  cta_label        text not null default 'Shop now' check (char_length(cta_label) <= 20),
  -- 'category' → destination is a categories.id; 'page' → an app screen name.
  destination_type text check (destination_type in ('category', 'page')),
  destination      text,
  starts_on        date,
  ends_on          date,
  placement        text not null default 'home_top' check (placement in ('home_top', 'home_middle', 'home_feature', 'category_top')),
  priority         int  not null default 1 check (priority between 1 and 10),
  status           text not null default 'draft' check (status in ('draft', 'published')),
  image_path       text,  -- object path in the `banners` bucket
  image_url        text,  -- public URL of that object
  all_customers    boolean not null default true,
  melbourne_only   boolean not null default false,
  new_customers    boolean not null default true,
  track_clicks     boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint banners_destination_pair check ((destination_type is null) = (destination is null)),
  constraint banners_date_order check (starts_on is null or ends_on is null or ends_on >= starts_on),
  -- A published banner must be complete; drafts only need a title.
  constraint banners_published_complete check (
    status = 'draft'
    or (destination is not null and starts_on is not null and ends_on is not null and btrim(cta_label) <> '')
  )
);

-- Older tables were created before 'home_feature' (full-width image above "Deals for you").
alter table public.banners drop constraint if exists banners_placement_check;
alter table public.banners
  add constraint banners_placement_check check (placement in ('home_top', 'home_middle', 'home_feature', 'category_top'));

create index if not exists banners_live_idx on public.banners (placement, priority) where status = 'published';

create or replace function public.banners_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists banners_touch_updated_at on public.banners;
create trigger banners_touch_updated_at
  before update on public.banners
  for each row execute function public.banners_touch_updated_at();

-- ─── Row level security ──────────────────────────────────────────────────────────────────
alter table public.banners enable row level security;

grant select on public.banners to anon, authenticated;
grant insert, update, delete on public.banners to authenticated;

drop policy if exists "Admins manage banners" on public.banners;
create policy "Admins manage banners" on public.banners
  for all to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

drop policy if exists "Anyone reads live banners" on public.banners;
create policy "Anyone reads live banners" on public.banners
  for select to anon, authenticated
  using (
    status = 'published'
    and starts_on <= (now() at time zone 'Australia/Melbourne')::date
    and ends_on   >= (now() at time zone 'Australia/Melbourne')::date
  );

-- ─── Image bucket ────────────────────────────────────────────────────────────────────────
-- Public bucket: images load by URL without signing in. Uploads are admin-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('banners', 'banners', true, 409600, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins read banner images" on storage.objects;
create policy "Admins read banner images" on storage.objects
  for select to authenticated
  using (bucket_id = 'banners' and exists (select 1 from public.admins a where a.user_id = auth.uid()));

drop policy if exists "Admins upload banner images" on storage.objects;
create policy "Admins upload banner images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'banners' and exists (select 1 from public.admins a where a.user_id = auth.uid()));

drop policy if exists "Admins update banner images" on storage.objects;
create policy "Admins update banner images" on storage.objects
  for update to authenticated
  using (bucket_id = 'banners' and exists (select 1 from public.admins a where a.user_id = auth.uid()));

drop policy if exists "Admins delete banner images" on storage.objects;
create policy "Admins delete banner images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'banners' and exists (select 1 from public.admins a where a.user_id = auth.uid()));
