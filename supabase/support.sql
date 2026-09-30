-- Spice Kart · customer support: chat tickets, canned replies and the Help centre.
-- Run in Supabase → SQL Editor after supabase/admin_data.sql. Safe to re-run.
--
--   support_tickets    One conversation per issue. Customers open them from the app (optionally
--                      linked to an order); admins work them in Admin → Support → Inbox.
--   support_messages   The chat. Internal notes (internal = true) are only visible to admins.
--   canned_replies     Saved answers agents insert from the inbox composer.
--   help_articles      The app's Help centre (topic → expandable questions).
--
-- Flow: a customer message reopens the ticket and raises an admin alert; an agent reply lands in
-- the customer's inbox + push and never changes the status (agents set Pending / Resolved themselves). Everything is
-- live over Supabase Realtime for both the admin and the app.

-- ═══ Tickets ═════════════════════════════════════════════════════════════════════════════
create sequence if not exists public.support_ticket_seq start 2041;

create table if not exists public.support_tickets (
  id                    uuid primary key default gen_random_uuid(),
  number                text not null unique default ('SK-' || nextval('public.support_ticket_seq')),
  customer_id           uuid not null references public.customers (id) on delete cascade,
  order_id              uuid references public.orders (id) on delete set null,
  topic                 text not null default 'general'
                        check (topic in ('orders', 'delivery', 'payments', 'refunds', 'wallet', 'addresses', 'account', 'general')),
  subject               text not null check (char_length(btrim(subject)) between 1 and 120),
  channel               text not null default 'in_app' check (channel in ('in_app', 'email', 'phone')),
  priority              text not null default 'normal' check (priority in ('normal', 'high', 'urgent')),
  status                text not null default 'open' check (status in ('open', 'pending', 'resolved')),
  assignee_id           uuid references auth.users (id) on delete set null,
  last_message_at       timestamptz not null default now(),
  last_message_preview  text not null default '',
  last_sender           text not null default 'customer' check (last_sender in ('customer', 'agent')),
  first_response_at     timestamptz,
  resolved_at           timestamptz,
  customer_last_read_at timestamptz not null default now(),  -- app badge: agent messages after this are unread
  csat                  smallint check (csat is null or csat between 1 and 5),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
create index if not exists support_tickets_inbox on public.support_tickets (status, last_message_at desc);
create index if not exists support_tickets_customer on public.support_tickets (customer_id, last_message_at desc);

create table if not exists public.support_messages (
  id          bigint generated always as identity primary key,
  ticket_id   uuid not null references public.support_tickets (id) on delete cascade,
  sender      text not null check (sender in ('customer', 'agent')),
  author_id   uuid references auth.users (id) on delete set null,
  author_name text not null default '',
  body        text not null default '' check (char_length(body) <= 4000),
  image_path  text,                             -- photo in the private `support-photos` bucket
  internal    boolean not null default false,   -- agent-only note, never shown in the app
  created_at  timestamptz not null default now(),
  constraint support_messages_not_empty check (btrim(body) <> '' or image_path is not null)
);
create index if not exists support_messages_ticket on public.support_messages (ticket_id, created_at);

-- ═══ Canned replies ══════════════════════════════════════════════════════════════════════
create table if not exists public.canned_replies (
  id         uuid primary key default gen_random_uuid(),
  title      text not null check (char_length(btrim(title)) between 1 and 80),
  body       text not null check (char_length(btrim(body)) between 1 and 2000),
  topic      text not null default 'general'
             check (topic in ('orders', 'delivery', 'payments', 'refunds', 'wallet', 'addresses', 'account', 'general')),
  use_count  int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ═══ Help centre ═════════════════════════════════════════════════════════════════════════
-- Text may use placeholders the app fills from the live delivery settings: {eta_minutes},
-- {book_ahead_days}, {express_fee}, {free_over}, {scheduled_fee}, {handling_fee},
-- {slot_cutoff} and {delivery_area}.
create table if not exists public.help_articles (
  id          uuid primary key default gen_random_uuid(),
  topic       text not null check (topic in ('orders', 'delivery', 'payments', 'refunds', 'wallet', 'addresses')),
  title       text not null check (char_length(btrim(title)) between 1 and 120),
  subtitle    text not null default '' check (char_length(subtitle) <= 160),
  body        text not null default '' check (char_length(body) <= 5000),
  steps_title text not null default '' check (char_length(steps_title) <= 60),   -- e.g. "HOW TO TRACK"
  steps       text[] not null default '{}',                                     -- numbered steps card
  note        text not null default '' check (char_length(note) <= 500),        -- small print
  status      text not null default 'published' check (status in ('published', 'draft')),
  sort        int not null default 0,
  views       int not null default 0,
  helpful_yes int not null default 0,
  helpful_no  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists help_articles_topic on public.help_articles (topic, sort, created_at);

drop trigger if exists support_tickets_touch on public.support_tickets;
create trigger support_tickets_touch before update on public.support_tickets for each row execute function public.touch_updated_at();
drop trigger if exists canned_replies_touch on public.canned_replies;
create trigger canned_replies_touch before update on public.canned_replies for each row execute function public.touch_updated_at();
drop trigger if exists help_articles_touch on public.help_articles;
create trigger help_articles_touch before update on public.help_articles for each row execute function public.touch_updated_at();

-- The app refreshes its Help centre from `app_changes` (the customer app's offers_live migration).
-- View and "helpful" counters don't count as a change, so reading articles never triggers a refresh.
do $$
begin
  if to_regproc('public.bump_app_change') is null then
    raise notice 'public.bump_app_change() is missing · run the app''s 20260928130000_offers_live.sql, then this file again';
    return;
  end if;
  drop trigger if exists help_articles_app_change on public.help_articles;
  create trigger help_articles_app_change after insert or delete on public.help_articles
    for each statement execute function public.bump_app_change();
  drop trigger if exists help_articles_app_change_upd on public.help_articles;
  create trigger help_articles_app_change_upd after update of topic, title, subtitle, body, steps_title, steps, note, status, sort
    on public.help_articles for each statement execute function public.bump_app_change();
end $$;

-- ═══ Ticket rules ════════════════════════════════════════════════════════════════════════
-- New tickets from the app: the server decides status and priority. An order still out for
-- delivery is urgent; one delivered in the last day is high.
create or replace function public.support_tickets_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
declare o public.orders;
begin
  new.subject := btrim(new.subject);
  if not public.is_admin() then
    new.status := 'open'; new.assignee_id := null; new.csat := null; new.channel := 'in_app';
    new.first_response_at := null; new.resolved_at := null; new.last_sender := 'customer';
    new.last_message_at := now(); new.last_message_preview := '';
    new.priority := 'normal';
    if new.order_id is not null then
      select * into o from public.orders where id = new.order_id and customer_id = new.customer_id;
      if not found then raise exception 'That order isn’t yours' using errcode = '42501'; end if;
      if o.status = 'out_for_delivery' then new.priority := 'urgent';
      elsif o.status = 'delivered' and o.delivered_at > now() - interval '1 day' then new.priority := 'high';
      end if;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists support_tickets_before_insert on public.support_tickets;
create trigger support_tickets_before_insert before insert on public.support_tickets for each row execute function public.support_tickets_before_insert();

-- Customers may only rate a ticket, mark it read, or close it themselves; everything else is admin-only.
create or replace function public.support_tickets_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() and current_setting('spicekart.support_internal', true) is distinct from 'on' then
    if new.status is distinct from old.status and not (new.status = 'resolved') then
      raise exception 'Only support can reopen a ticket · send a message instead' using errcode = '42501';
    end if;
    if (new.customer_id, new.order_id, new.topic, new.subject, new.channel, new.priority, new.assignee_id,
        new.last_message_at, new.last_message_preview, new.last_sender, new.first_response_at, new.number,
        new.resolved_at, new.created_at)
       is distinct from
       (old.customer_id, old.order_id, old.topic, old.subject, old.channel, old.priority, old.assignee_id,
        old.last_message_at, old.last_message_preview, old.last_sender, old.first_response_at, old.number,
        old.resolved_at, old.created_at) then
      raise exception 'You can’t change that' using errcode = '42501';
    end if;
    if new.csat is distinct from old.csat and old.status <> 'resolved' and new.status <> 'resolved' then
      raise exception 'Rate the chat once it’s resolved' using errcode = '23514';
    end if;
  end if;
  if new.status is distinct from old.status then
    new.resolved_at := case when new.status = 'resolved' then now() end;
    if new.status = 'resolved' then perform public.resolve_alert('support:' || new.id); end if;
  end if;
  return new;
end $$;
drop trigger if exists support_tickets_guard on public.support_tickets;
create trigger support_tickets_guard before update on public.support_tickets for each row execute function public.support_tickets_guard();

-- Messages: stamp who wrote it. Customers always write as 'customer' and never internal notes.
create or replace function public.support_messages_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
declare nm text;
begin
  new.body := btrim(new.body);
  new.author_id := auth.uid();
  if public.is_admin() then
    new.sender := 'agent';
    select coalesce(nullif(btrim(name), ''), split_part(email, '@', 1)) into nm from public.admins where user_id = auth.uid();
    new.author_name := coalesce(nm, 'Spice Kart Support');
  else
    new.sender := 'customer'; new.internal := false;
    if new.image_path is not null and new.image_path not like auth.uid()::text || '/%' then
      raise exception 'Upload the photo first' using errcode = '42501';
    end if;
    select nullif(btrim(first_name || ' ' || last_name), '') into nm from public.customers where id = auth.uid();
    new.author_name := coalesce(nm, 'Customer');
  end if;
  return new;
end $$;
drop trigger if exists support_messages_before_insert on public.support_messages;
create trigger support_messages_before_insert before insert on public.support_messages for each row execute function public.support_messages_before_insert();

-- After a message: update the ticket, alert admins about customer messages, tell the customer about replies.
create or replace function public.support_messages_after_insert() returns trigger
language plpgsql security definer set search_path = public as $$
declare t public.support_tickets; who text; opted boolean;
        preview text := coalesce(nullif(left(new.body, 160), ''), '📷 Photo');
begin
  if new.internal then return new; end if;
  perform set_config('spicekart.support_internal', 'on', true);
  if new.sender = 'customer' then
    update public.support_tickets
       set status = 'open', last_message_at = new.created_at, last_message_preview = preview,
           last_sender = 'customer', customer_last_read_at = new.created_at
     where id = new.ticket_id returning * into t;
    select nullif(btrim(first_name || ' ' || last_name), '') into who from public.customers where id = t.customer_id;
    perform public.raise_alert('support:' || t.id, 'operations',
      case t.priority when 'urgent' then 'critical' when 'high' then 'warning' else 'info' end,
      'Support chat from ' || coalesce(who, 'a customer') || ': ' || t.subject,
      t.number || ' · “' || left(preview, 140) || '”', 'support', 'Open inbox');
  else
    update public.support_tickets
       set last_message_at = new.created_at, last_message_preview = preview, last_sender = 'agent',
           first_response_at = coalesce(first_response_at, new.created_at)
     where id = new.ticket_id returning * into t;
    perform public.resolve_alert('support:' || t.id);
    select push_opt_in into opted from public.customers where id = t.customer_id;
    insert into public.customer_notifications (customer_id, order_id, kind, title, body, link, push_status)
    values (t.customer_id, t.order_id, 'system', 'Spice Kart Support replied', left(preview, 178), 'support:' || t.id,
            case when opted then 'pending' else 'skipped' end);
    if opted then perform public.kick_push_sender(); end if;
  end if;
  perform set_config('spicekart.support_internal', 'off', true);
  return new;
end $$;
drop trigger if exists support_messages_after_insert on public.support_messages;
create trigger support_messages_after_insert after insert on public.support_messages for each row execute function public.support_messages_after_insert();

-- ═══ RPCs ════════════════════════════════════════════════════════════════════════════════
/**
 * Opens a ticket with its first message in one go (the app's chat and "Report an issue").
 * Also creates the admin's customer record from the app profile if this customer never ordered.
 */
drop function if exists public.open_support_ticket(text, text, text, uuid);
create or replace function public.open_support_ticket(p_subject text, p_message text, p_topic text default 'general',
                                                      p_order uuid default null, p_image text default null)
returns public.support_tickets
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); t public.support_tickets;
begin
  if uid is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  if coalesce(btrim(p_message), '') = '' and p_image is null then raise exception 'Write a message' using errcode = '23514'; end if;
  if to_regclass('public.profiles') is not null then
    execute $q$
      insert into public.customers (id, first_name, last_name, email, mobile)
      select $1, coalesce(left(p.first_name, 60), ''), coalesce(left(p.last_name, 60), ''), nullif(p.email, ''), nullif(p.mobile, '')
        from (select $1 as id) u left join public.profiles p on p.id = u.id
      on conflict (id) do nothing $q$ using uid;
  else
    insert into public.customers (id) values (uid) on conflict (id) do nothing;
  end if;
  insert into public.support_tickets (customer_id, order_id, topic, subject)
  values (uid, p_order, coalesce(nullif(p_topic, ''), 'general'),
          left(coalesce(nullif(btrim(p_subject), ''), nullif(left(btrim(p_message), 80), ''), 'Photo from customer'), 120))
  returning * into t;
  insert into public.support_messages (ticket_id, sender, body, image_path) values (t.id, 'customer', coalesce(p_message, ''), p_image);
  select * into t from public.support_tickets where id = t.id;
  return t;
end $$;
revoke execute on function public.open_support_ticket(text, text, text, uuid, text) from public, anon;
grant execute on function public.open_support_ticket(text, text, text, uuid, text) to authenticated;

/** Inbox header numbers (admins only). First reply and CSAT cover the last 30 days. */
create or replace function public.support_summary() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  select jsonb_build_object(
    'all', count(*),
    'open', count(*) filter (where status = 'open'),
    'pending', count(*) filter (where status = 'pending'),
    'resolved', count(*) filter (where status = 'resolved'),
    'avg_first_reply_min', round(extract(epoch from avg(first_response_at - created_at)
                             filter (where first_response_at is not null and created_at > now() - interval '30 days')) / 60),
    'csat_pct', round(100.0 * count(*) filter (where csat >= 4 and created_at > now() - interval '30 days')
                      / nullif(count(*) filter (where csat is not null and created_at > now() - interval '30 days'), 0)),
    'rated', count(*) filter (where csat is not null and created_at > now() - interval '30 days')
  ) into r from public.support_tickets;
  return r;
end $$;
grant execute on function public.support_summary() to authenticated;

/** Counts a canned reply insert (admins only). */
create or replace function public.use_canned_reply(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'admins only' using errcode = '42501'; end if;
  update public.canned_replies set use_count = use_count + 1 where id = p_id;
end $$;
grant execute on function public.use_canned_reply(uuid) to authenticated;

/** App: an article was expanded. */
create or replace function public.help_article_viewed(p_id uuid) returns void
language sql security definer set search_path = public as $$
  update public.help_articles set views = views + 1 where id = p_id and status = 'published';
$$;
grant execute on function public.help_article_viewed(uuid) to anon, authenticated;

/** App: "Was this helpful?" yes / no. */
create or replace function public.help_article_feedback(p_id uuid, p_helpful boolean) returns void
language sql security definer set search_path = public as $$
  update public.help_articles
     set helpful_yes = helpful_yes + case when p_helpful then 1 else 0 end,
         helpful_no  = helpful_no  + case when p_helpful then 0 else 1 end
   where id = p_id and status = 'published';
$$;
grant execute on function public.help_article_feedback(uuid, boolean) to anon, authenticated;

-- ═══ Row level security ══════════════════════════════════════════════════════════════════
alter table public.support_tickets  enable row level security;
alter table public.support_messages enable row level security;
alter table public.canned_replies   enable row level security;
alter table public.help_articles    enable row level security;

grant select, insert, update, delete on public.support_tickets, public.support_messages, public.canned_replies, public.help_articles to authenticated;
grant select on public.help_articles to anon;
grant usage on sequence public.support_ticket_seq to authenticated;

do $$
declare t text;
begin
  foreach t in array array['support_tickets', 'support_messages', 'canned_replies', 'help_articles'] loop
    execute format('drop policy if exists "Admins manage %1$s" on public.%1$I', t);
    execute format('create policy "Admins manage %1$s" on public.%1$I for all to authenticated
                    using ((select public.is_admin())) with check ((select public.is_admin()))', t);
  end loop;
end $$;

-- Tickets: customers open, read, rate and close their own.
drop policy if exists "Customers read own tickets" on public.support_tickets;
create policy "Customers read own tickets" on public.support_tickets for select to authenticated using (customer_id = (select auth.uid()));
drop policy if exists "Customers open tickets" on public.support_tickets;
create policy "Customers open tickets" on public.support_tickets for insert to authenticated with check (customer_id = (select auth.uid()));
drop policy if exists "Customers update own tickets" on public.support_tickets;
create policy "Customers update own tickets" on public.support_tickets for update to authenticated
  using (customer_id = (select auth.uid())) with check (customer_id = (select auth.uid()));

-- Messages: customers read the public thread of their own tickets and add messages to them.
drop policy if exists "Customers read own messages" on public.support_messages;
create policy "Customers read own messages" on public.support_messages for select to authenticated
  using (not internal and exists (select 1 from public.support_tickets t where t.id = ticket_id and t.customer_id = (select auth.uid())));
drop policy if exists "Customers write own messages" on public.support_messages;
create policy "Customers write own messages" on public.support_messages for insert to authenticated
  with check (not internal and sender = 'customer'
              and exists (select 1 from public.support_tickets t where t.id = ticket_id and t.customer_id = (select auth.uid())));

-- Help centre: anyone reads published articles.
drop policy if exists "Anyone reads published articles" on public.help_articles;
create policy "Anyone reads published articles" on public.help_articles for select to anon, authenticated using (status = 'published');

-- ═══ Realtime ════════════════════════════════════════════════════════════════════════════
do $$
declare t text;
begin
  foreach t in array array['support_tickets', 'support_messages', 'canned_replies', 'help_articles'] loop
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

-- ═══ Starter content (only when the tables are empty) ════════════════════════════════════
insert into public.canned_replies (title, body, topic)
select * from (values
  ('Missing item – refunded', 'So sorry about the missing item! I''ve refunded it to your Spice Kart Money — it''s available to use on your next order straight away.', 'orders'),
  ('Refund timeline', 'Refunds to Spice Kart Money are instant. Refunds to your card take 3–5 business days to appear, depending on your bank.', 'refunds'),
  ('Driver on the way', 'Thanks for the details! I''ve passed them to your driver, who''s nearly there. You can follow them live from the order screen.', 'delivery'),
  ('Payment declined steps', 'Sorry about that! Please check the card''s expiry and CVV, or try Apple Pay. Failed attempts are never charged — any hold drops off within a few days.', 'payments'),
  ('Closing – anything else?', 'Is there anything else I can help with today? If not, I''ll close this chat — you can reopen it any time by sending a message.', 'general')
) v (title, body, topic)
where not exists (select 1 from public.canned_replies);


insert into public.help_articles (topic, sort, title, subtitle, body, steps_title, steps, note)
select * from (values
  ('orders', 1, 'Where is my order?', 'Live status and arrival time',
   'Every order shows its live status — confirmed, picking, packed, out for delivery and delivered — with the time each step happened and your estimated arrival. The Track screen updates by itself as your order moves along.',
   'HOW TO TRACK', array['Tap Orders in the bottom bar.', 'Find your order under Active.', 'Tap Track to see each step and your estimated arrival.', 'Need the store? Tap the phone button on the store card to call them.'],
   'If your order is running late, Track shows RUNNING LATE. Contact support any time and we’ll chase it up for you.'),
  ('orders', 2, 'An item is missing from my delivery', 'Report it and we’ll sort it out',
   'Sorry about that. Report it in the app and our support team will check your order and arrange a refund for anything that didn’t arrive.',
   'HOW TO REPORT IT', array['Tap your avatar on Home, then Contact support.', 'Tap Report an issue and choose Missing item.', 'Tell us which item is missing and add a photo if it helps.', 'Tap Continue to chat — we’ll reply in the same chat.'],
   'Please report missing items as soon as you can after delivery so we can check with the store.'),
  ('orders', 3, 'Cancel or change an order', 'Contact us before picking starts',
   'Orders can’t be cancelled or edited in the app yet. If you need to cancel or change something, contact support as soon as possible — we can usually help until the store starts picking your groceries.',
   'TO ASK FOR A CHANGE', array['Tap your avatar on Home, then Contact support.', 'Tap Live chat.', 'Send your order number and what you’d like to change.'],
   'Orders that are already out for delivery can’t be cancelled.'),
  ('orders', 4, 'Ordering again', 'Reorder a past order in one tap',
   'Add everything from a past order back to your cart in one tap. Items are added at today’s prices, and anything no longer in our range is left out.',
   'TO REORDER', array['Tap Orders in the bottom bar.', 'Open Past Orders.', 'Tap Reorder on the order you want.', 'Check your cart, then place the order.'],
   ''),
  ('delivery', 1, 'Delivery times & fees', 'Express vs scheduled',
   'Express delivery arrives in about {eta_minutes} minutes while the store is open. Scheduled delivery lets you pick a delivery window up to {book_ahead_days} days ahead.',
   'FEES AT A GLANCE', array['Express: {express_fee}, free over {free_over}.', 'Scheduled: from {scheduled_fee} — each window shows its own fee.', 'Handling fee: {handling_fee} per order.', 'Every fee is shown at checkout before you place the order.'],
   'Outside store hours Express shows as Closed — choose Schedule instead.'),
  ('delivery', 2, 'Booking a scheduled slot', 'Choose a delivery window',
   'Pick a day and a delivery window at checkout. Windows close {slot_cutoff} before they start.',
   'TO BOOK A WINDOW', array['Go to checkout.', 'Tap Schedule under delivery time.', 'Pick a day, then an available window.', 'Tap Place order.'],
   'Popular windows fill up — book early for weekends.'),
  ('delivery', 3, 'I wasn’t home for my delivery', 'What to do next',
   'Missed your delivery? Contact support straight away and we’ll work out the next steps with the store.',
   'NEXT TIME', array['Keep your mobile number up to date in Personal details.', 'Keep your phone nearby around your arrival time.', 'Check Track for your estimated arrival.'],
   'You can also call the store from the Track screen.'),
  ('delivery', 4, 'Where do you deliver?', 'Coverage areas',
   '{delivery_area} Add your address in the app and we’ll tell you straight away if it’s outside our delivery area.',
   'TO CHECK YOUR ADDRESS', array['Tap your avatar on Home, then Saved addresses.', 'Tap Add new address or Use my current location.', 'Enter your postcode — if we don’t deliver there yet, you’ll see a message.'],
   ''),
  ('payments', 1, 'Why was my payment declined?', 'Common causes and fixes',
   'Declines usually come from your bank — for example an expired card, a typo in the card details or not enough funds.',
   'TRY THIS', array['Check the card number, expiry and CVV under Payment methods in your account.', 'Try another method at checkout, like Apple Pay or PayID.', 'Contact your bank if the same card keeps failing.', 'Still stuck? Chat with us from Contact support.'],
   ''),
  ('payments', 2, 'Accepted payment methods', 'Cards, Apple Pay, Google Pay and PayID',
   'At checkout you can pay by credit or debit card, Apple Pay, Google Pay or PayID bank transfer. The options you see depend on what your store currently accepts.',
   'TO MANAGE YOUR CARDS', array['Tap your avatar on Home, then Payment methods.', 'Tap + Add payment method to add a card.', 'Tap Set default on the card you use most.', 'Choose how to pay under Payment method at checkout.'],
   'Spice Kart Money can’t be used at checkout yet.'),
  ('payments', 3, 'Getting a tax invoice', 'Receipts for your orders',
   'Need a tax invoice or receipt for an order? Ask us in chat and we’ll send it to your email.',
   'TO GET A COPY', array['Add your email in Personal details.', 'Open Contact support and tap Live chat.', 'Send the order number you need an invoice for.'],
   ''),
  ('refunds', 1, 'How refunds are processed', 'Reviewed by our support team',
   'If something was missing, damaged or wrong, report it and our support team will review it and arrange your refund. We’ll keep you updated in the chat.',
   'HOW TO REQUEST A REFUND', array['Tap your avatar on Home, then Contact support.', 'Tap Report an issue and choose what went wrong.', 'Add details, and a photo if an item arrived damaged.', 'Tap Continue to chat.'],
   'Refunds go back to the payment method you used. Your bank may take 3–5 business days to show it.'),
  ('refunds', 2, 'How long do refunds take?', 'Checking on a refund',
   'Once your refund is approved we’ll confirm it in your chat. It’s returned to the payment method you used for the order, and your bank may take 3–5 business days to show it.',
   'TO CHECK ON A REFUND', array['Open Contact support.', 'Under Your conversations, open the chat about your refund.', 'Still waiting after 5 business days? Send us a message in the same chat.'],
   ''),
  ('refunds', 3, 'Damaged or expired items', 'Send a photo and we’ll fix it',
   'If something arrives damaged or past its use-by date, send us a photo and we’ll make it right.',
   'TO REPORT IT', array['Open Contact support and tap Report an issue.', 'Choose Damaged item.', 'Tap Attach a photo and add a short note.', 'Tap Continue to chat.'],
   'Please report it as soon as you can after delivery.'),
  ('wallet', 1, 'What is Spice Kart Money?', 'Your in-app balance',
   'Spice Kart Money is your in-app balance. You’ll find it on the Spice Kart Money card in your account.',
   'TO SEE YOUR BALANCE', array['Tap your avatar on Home.', 'Your balance is on the Spice Kart Money card.', 'Tap Add money to top it up.'],
   'Paying for orders with Spice Kart Money is coming soon.'),
  ('wallet', 2, 'Adding money', 'Top up your balance',
   'Top up your Spice Kart Money balance from your account in a few taps.',
   'TO ADD MONEY', array['Tap your avatar on Home, then Add money.', 'Pick $10, $25, $50 or $100, or enter a custom amount.', 'Choose how to pay.', 'Tap Confirm & add money.'],
   ''),
  ('wallet', 3, 'Questions about your balance', 'We’re here to help',
   'Balance doesn’t look right, or want to move money out? Withdrawals aren’t available in the app yet — chat with us and we’ll help.',
   'TO GET HELP', array['Open Contact support.', 'Tap Live chat.', 'Tell us what you need help with.'],
   ''),
  ('addresses', 1, 'Can I change my address after ordering?', 'Contact us straight away',
   'Delivery addresses can’t be changed in the app once an order is placed. Contact support straight away and we’ll see what we can do before your order leaves the store.',
   'TO ASK FOR A CHANGE', array['Open Contact support.', 'Tap Live chat.', 'Send your order number and the new address.'],
   'The new address must be inside our delivery area.'),
  ('addresses', 2, 'Adding a new address', 'Home, work and more',
   'Save your home, work or other addresses so checkout is quicker.',
   'TO ADD AN ADDRESS', array['Tap your avatar on Home, then Saved addresses.', 'Tap Add new address, or Use my current location to fill it in.', 'Enter your street, suburb, state and postcode, and choose Home, Work or Other.', 'Tap Save address.'],
   'To remove an address, press and hold it in Saved addresses.'),
  ('addresses', 3, 'Setting a default address', 'Faster checkout',
   'Your default address is used automatically at checkout.',
   'TO SET IT', array['Tap your avatar on Home, then Saved addresses.', 'Tap Add new address.', 'Turn on Set as default address, then save.'],
   'Delivering somewhere else? Tap that address in Saved addresses before you check out.')
) v (topic, sort, title, subtitle, body, steps_title, steps, note)
where not exists (select 1 from public.help_articles);

-- ═══ Chat photos (private bucket; customers write only inside their own `<uid>/` folder) ═══
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('support-photos', 'support-photos', false, 8388608, array['image/jpeg', 'image/png', 'image/webp', 'image/heic'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "customers upload own support photos" on storage.objects;
create policy "customers upload own support photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'support-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "customers update own support photos" on storage.objects;
create policy "customers update own support photos" on storage.objects for update to authenticated
  using (bucket_id = 'support-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "customers read own support photos" on storage.objects;
create policy "customers read own support photos" on storage.objects for select to authenticated
  using (bucket_id = 'support-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "admins read support photos" on storage.objects;
create policy "admins read support photos" on storage.objects for select to authenticated
  using (bucket_id = 'support-photos' and (select public.is_admin()));
