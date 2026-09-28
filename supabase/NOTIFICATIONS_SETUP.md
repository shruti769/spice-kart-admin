# Notifications setup

The steps to take the admin's notifications live on the Spice Kart Supabase project
(`posbkqkzkyehmanrbqcj`).

## 1. Database (SQL Editor)

Run these in order. Each file is safe to run again.

1. `banners.sql`
2. `announcements.sql`
3. `content.sql`
4. `orders.sql`: customers, orders, order items, payments, reviews, refund requests
5. `notifications.sql`: admin alerts, campaigns, customer inbox, push tokens, minutely job

Before step 5, turn on **Database → Extensions → `pg_cron`** and **`pg_net`**. If you forget,
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

Promotional campaigns only reach customers with `marketing_opt_in = true`, as the Spam Act requires.
All pushes also need `push_opt_in = true`.
