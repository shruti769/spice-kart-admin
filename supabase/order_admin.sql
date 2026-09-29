-- Spice Kart · admin order actions (Admin → Orders).
-- Run in Supabase → SQL Editor after supabase/orders.sql. Safe to re-run.
--
-- Status changes are plain updates (admins have full access through RLS; the customer is
-- notified by the notify_order_status trigger in notifications.sql). Cancelling goes through
-- cancel_order() so the stock the order took is put back in the same transaction.

alter table public.orders add column if not exists cancel_reason text check (cancel_reason is null or char_length(cancel_reason) <= 200);

create or replace function public.cancel_order(p_id uuid, p_reason text default null) returns public.orders
language plpgsql security definer set search_path = public as $$
declare o public.orders;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  select * into o from public.orders where id = p_id for update;
  if o.id is null then raise exception 'Order not found' using errcode = 'P0002'; end if;
  if o.status = 'cancelled' then return o; end if;
  if o.status = 'delivered' then raise exception 'A delivered order can’t be cancelled · raise a refund instead' using errcode = 'P0001'; end if;

  -- Put back what place_order() took (only for products that track stock).
  update public.products p set stock_qty = p.stock_qty + i.qty
    from (select product_id, sum(qty)::int qty from public.order_items where order_id = p_id and product_id is not null group by 1) i
   where p.id = i.product_id and p.track_inventory;

  update public.orders set status = 'cancelled', cancel_reason = nullif(btrim(p_reason), '') where id = p_id returning * into o;
  return o;
end $$;
revoke execute on function public.cancel_order(uuid, text) from public, anon;
grant execute on function public.cancel_order(uuid, text) to authenticated;

-- ─── Status history (the order page's delivery timeline) ─────────────────────────────────
create table if not exists public.order_status_events (
  id         bigint generated always as identity primary key,
  order_id   uuid not null references public.orders (id) on delete cascade,
  status     text not null,
  note       text,
  changed_by uuid references auth.users (id) on delete set null,
  at         timestamptz not null default now()
);
create index if not exists order_status_events_order_idx on public.order_status_events (order_id, at);

create or replace function public.log_order_status() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.order_status_events (order_id, status, note, changed_by, at)
    values (new.id, new.status, case when new.status = 'cancelled' then new.cancel_reason end, auth.uid(),
            case when tg_op = 'INSERT' then new.placed_at else now() end);
  end if;
  return null;
end $$;
drop trigger if exists log_order_status on public.orders;
create trigger log_order_status after insert or update of status on public.orders for each row execute function public.log_order_status();

-- Orders placed before this ran get their "placed" step.
insert into public.order_status_events (order_id, status, at)
select o.id, 'placed', o.placed_at from public.orders o
 where not exists (select 1 from public.order_status_events e where e.order_id = o.id);

alter table public.order_status_events enable row level security;
grant select on public.order_status_events to authenticated;

drop policy if exists "Admins read order history" on public.order_status_events;
create policy "Admins read order history" on public.order_status_events for select to authenticated using ((select public.is_admin()));
drop policy if exists "Customers read own order history" on public.order_status_events;
create policy "Customers read own order history" on public.order_status_events for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = (select auth.uid())));

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'order_status_events') then
    alter publication supabase_realtime add table public.order_status_events;
  end if;
end $$;
