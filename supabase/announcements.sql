-- In-app announcements for the Spice Kart app (Admin → Content → Announcements).
-- Run in Supabase → SQL Editor. Safe to re-run, and upgrades a table made by an earlier version.
--
-- Admins (public.is_admin()) get full access. Everyone else, including the customer app, can read
-- only live announcements whose dates include today (Melbourne time). No end date = ongoing.

create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null default '',
  message     text not null default '',
  type        text not null default 'info',
  placement   text not null default 'top_bar',
  audience    text not null default 'all',
  -- What a tap opens: null = nothing, 'page:<name>' or 'category:<id>'.
  link        text,
  starts_on   date,
  ends_on     date,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Upgrade a table from the first version (message only, max 80 chars).
alter table public.announcements add column if not exists title     text not null default '';
alter table public.announcements add column if not exists type      text not null default 'info';
alter table public.announcements add column if not exists placement text not null default 'top_bar';
alter table public.announcements add column if not exists link      text;

alter table public.announcements drop constraint if exists announcements_message_check;
alter table public.announcements drop constraint if exists announcements_title_check;
alter table public.announcements drop constraint if exists announcements_type_check;
alter table public.announcements drop constraint if exists announcements_placement_check;
alter table public.announcements drop constraint if exists announcements_audience_check;
alter table public.announcements drop constraint if exists announcements_date_order;
-- Old rows: the one-line message becomes the title.
update public.announcements set title = message, message = '' where title = '' and message <> '';
alter table public.announcements
  add constraint announcements_title_check     check (char_length(btrim(title)) between 1 and 80),
  add constraint announcements_message_check   check (char_length(message) <= 200),
  add constraint announcements_type_check      check (type in ('info', 'promo', 'alert')),
  add constraint announcements_placement_check check (placement in ('top_bar', 'popup')),
  add constraint announcements_audience_check  check (audience in ('all', 'new', 'frequent')),
  add constraint announcements_date_order      check (starts_on is null or ends_on is null or ends_on >= starts_on);

drop trigger if exists announcements_touch_updated_at on public.announcements;
drop function if exists public.announcements_touch_updated_at();
drop trigger if exists announcements_touch on public.announcements;
create trigger announcements_touch before update on public.announcements
  for each row execute function public.touch_updated_at();

-- ─── Row level security ──────────────────────────────────────────────────────────────────
alter table public.announcements enable row level security;

grant select on public.announcements to anon, authenticated;
grant insert, update, delete on public.announcements to authenticated;

drop policy if exists "Admins manage announcements" on public.announcements;
create policy "Admins manage announcements" on public.announcements
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Anyone reads live announcements" on public.announcements;
create policy "Anyone reads live announcements" on public.announcements
  for select to anon, authenticated
  using (
    active
    and (starts_on is null or starts_on <= (now() at time zone 'Australia/Melbourne')::date)
    and (ends_on   is null or ends_on   >= (now() at time zone 'Australia/Melbourne')::date)
  );

-- ─── Instant app updates (only when the app's app_changes setup has been run) ────────────
do $$
begin
  if exists (select 1 from pg_proc where proname = 'bump_app_change' and pronamespace = 'public'::regnamespace) then
    drop trigger if exists announcements_app_change on public.announcements;
    create trigger announcements_app_change after insert or update or delete on public.announcements
      for each statement execute function public.bump_app_change();
  end if;
end $$;
