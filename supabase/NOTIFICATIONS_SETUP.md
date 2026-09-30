# Notifications setup

The steps to take the admin's notifications live on the Spice Kart Supabase project
(`posbkqkzkyehmanrbqcj`).

## 1. Database (SQL Editor)

Run these in order. Each file is safe to run again. `app/` means the customer app's
`~/Desktop/Spice-kart/supabase/migrations/`; its earlier migrations (catalogue, categories, coupons,
delivery) are assumed to be run already.

1. `banners.sql`
2. `announcements.sql`
3. `content.sql`
4. `orders.sql`: customers, orders, order items, payments, reviews, refund requests
5. `stores.sql`: the store customers order from (then add it in Admin → Settings → General)
6. `order_admin.sql`: cancel an order (puts stock back) and the order status timeline
7. `app/20260928130000_offers_live.sql` and `app/20260928140000_banners_live.sql`, if not run yet
8. `app/20260929000000_profiles.sql`, `app/20260929120000_orders.sql`, `app/20260930000000_delivery_area.sql`: the app's checkout (`place_order`) and delivery area
9. `notifications.sql`: admin alerts, campaigns, customer inbox, push tokens, minutely job
10. `business_settings.sql`: Settings → minimum order, payments & tax, notifications (email / SMS / Slack / digest), store hours and security. It replaces `public.is_admin()`; if you ever re-run the app's `20260924000000_catalogue.sql`, run this file again afterwards.
11. `admin_data.sql`: staff and invites, drivers, customer suspension and stats, review replies, payment references and refunds, Dashboard / Analytics numbers
12. `support.sql`: Support inbox (in-app chat tickets, internal notes, chat photos in the private `support-photos` bucket), canned replies and the app's Help centre articles. Seeds the 5 canned replies and the app's 20 help questions if those tables are empty.

Also turn on **Authentication → Sign In / Providers → Allow anonymous sign-ins** (the app signs customers in anonymously for now).

Before step 9, turn on **Database → Extensions → `pg_cron`** and **`pg_net`**. If you forget,
`notifications.sql` prints a notice. Turn them on and run it again.

After that, the admin works end to end:

- The Notification centre and the bell show live alerts.
- Campaigns can be saved, scheduled and sent.
- Sent campaigns land in customers' inboxes.

Phone push needs steps 2–4.

## 2. Secrets for the minutely job

In **Project Settings → Vault**, add two secrets:

| Name | Value |
|---|---|
| `project_url` | `https://posbkqkzkyehmanrbqcj.supabase.co` |
| `push_dispatch_secret` | a long random string, e.g. the output of `openssl rand -hex 32` |

## 3. Deploy the `send-push` Edge Function

Log the CLI into the account that owns the project, then run:

```bash
supabase functions deploy send-push --no-verify-jwt --project-ref posbkqkzkyehmanrbqcj
supabase secrets set --project-ref posbkqkzkyehmanrbqcj DISPATCH_SECRET=<same value as push_dispatch_secret>
# optional, if "Enhanced push security" is on in your Expo account:
supabase secrets set --project-ref posbkqkzkyehmanrbqcj EXPO_ACCESS_TOKEN=<token from expo.dev>
```

The function rejects any call without the matching `x-dispatch-secret` header.

## 4. Phone push credentials (EAS)

The customer app sends pushes through Expo, which forwards to Google and Apple.

- **Android:** create a Firebase project and add an Android app with package `com.komal92.spicekart`.
  Download the service account key and upload it with
  `eas credentials` → Android → FCM V1.
- **iOS:** needs an Apple Developer account. First set `ios.bundleIdentifier` in the app's `app.json`,
  which is missing today. Then run `eas credentials` → iOS → Push Notifications to create the APNs key.
- Build a new development or production build (`eas build`). Push doesn't work in Expo Go.

## 5. Customer app (phase 2)

The app still has to:

- Sign customers in, using Supabase anonymous auth until phone OTP is added.
  Turn it on in **Authentication → Sign In / Providers → Allow anonymous sign-ins**.
- Create a `customers` row, and save orders, payments, reviews and refund requests.
- Register its Expo push token in `push_tokens`.
- Show the inbox from `customer_notifications`, and set `read_at` / `opened_at`.

## How it flows

| Event | What happens |
|---|---|
| Admin sends a campaign | `send_campaign_now()` adds one inbox row per customer in the audience, then calls `send-push` |
| Scheduled time arrives | The minutely job (`notifications_tick`) sends it the same way |
| Admin changes an order's status | A trigger adds an "order update" inbox row, then calls `send-push` |
| `send-push` runs | Claims pending rows, sends them to Expo in batches of 100, marks them sent / failed / skipped (no device), and deletes dead tokens |
| Stock drops, payment fails, 1–2★ review, refund request, order past ETA, coupon ends within 24 h | An `admin_alerts` row appears in the Notification centre live. It resolves itself when the problem goes away. |
| Customer sends a support message | The ticket reopens and a Notification centre alert links to Support (it resolves when an agent replies or resolves the chat) |
| Agent replies in Support → Inbox | The status stays as it is (the agent changes it), the reply appears live in the app's chat, and a "Spice Kart Support replied" inbox row + push goes out |

Promotional campaigns only reach customers with `marketing_opt_in = true`, as the Spam Act requires.
All pushes also need `push_opt_in = true`.

## 6. Email, SMS and Slack (Settings → Notifications)

These go through the same `send-push` function, so redeploy it after pulling these changes:

```bash
SUPABASE_ACCESS_TOKEN=sbp_XXXX supabase functions deploy send-push --no-verify-jwt --use-api --project-ref posbkqkzkyehmanrbqcj
```

Then set whichever providers you use:

```bash
# Email (resend.com): verify your domain there first
supabase secrets set --project-ref posbkqkzkyehmanrbqcj RESEND_API_KEY=re_... RESEND_FROM="Spice Kart <orders@yourdomain.com.au>"
# SMS (twilio.com)
supabase secrets set --project-ref posbkqkzkyehmanrbqcj TWILIO_ACCOUNT_SID=AC... TWILIO_AUTH_TOKEN=... TWILIO_FROM=+61...
```

Slack needs no secret. Paste the channel's incoming-webhook URL in Settings → Notifications.
Until a provider is set, its messages show as failed in Settings, with the reason.

## 7. Security (Settings → Security)

- **Two-factor:** each admin turns it on for their own account (authenticator app). "Require for all admins" can only be switched on from a session that used 2FA.
- **Google sign-in:** also enable Google in Supabase → Authentication → Sign In / Providers, and add the admin site's URL under Authentication → URL Configuration → Redirect URLs.
- **Locked out** by the IP allowlist or 2FA? In the SQL Editor run:
  `update public.business_settings set ip_allowlist_enabled = false, require_2fa = false;`
- **Admin lost their authenticator?** In the SQL Editor run:
  `delete from auth.mfa_factors where user_id = (select id from auth.users where email = 'them@example.com');`

## 8. Staff invites (Staff & Admins → Invite member)

Deploy the second Edge Function (it uses the signed-in admin's login, so keep JWT checks on):

```bash
SUPABASE_ACCESS_TOKEN=sbp_XXXX supabase functions deploy invite-admin --use-api --project-ref posbkqkzkyehmanrbqcj
```

Also add the admin site's URL under Authentication → URL Configuration → Redirect URLs, so the invite link can open the admin.
