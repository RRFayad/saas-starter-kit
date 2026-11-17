# Deploy Guide

Suggested production stack:

| Piece            | Service                   | Vercel Root Directory |
| ---------------- | ------------------------- | --------------------- |
| Next.js app      | Vercel project 1          | `frontend`            |
| API (Fastify)    | Vercel project 2          | `backend`             |
| PostgreSQL       | Neon (database host only) | –                     |
| Auth             | Clerk                     | –                     |
| Billing (option) | Stripe                    | –                     |

---

# First Deploy

## 1. Decide First

| Decision                    | Options → consequence                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Vercel project names        | `my-saas` + `my-saas-api` → URLs known up front: `https://my-saas.vercel.app`, `https://my-saas-api.vercel.app`             |
| Domain                      | `*.vercel.app` → Clerk **development** keys (separate Clerk app) · own domain → Clerk **production** instance (`pk_live_…`) |
| `BILLING_ENABLED`           | `true` → Stripe setup (step 6) · `false` → skip Stripe                                                                      |
| `LANDING_PAGE_ENABLED`      | `true` → `/` = marketing page · `false` → `/` redirects to the app                                                          |
| `SIGN_UP_DEMO_MODE_ENABLED` | Public demo on Clerk development keys only → [test users](#demo-on-clerk-development-keys)                                  |

- Check each name is free on Vercel before creating anything: the URLs feed
  `FRONTEND_URL`, `BACKEND_URL`, CORS, and the webhook endpoints.

## 2. Database (Neon)

1. Create a project → region close to the Vercel functions (Vercel's default
   is Washington, D.C. → AWS `us-east-1`).
2. **Connect** → copy two connection strings:
   - **Pooled** ("Connection pooling" on, host has `-pooler`) → `DATABASE_URL`
     in both Vercel projects.
   - **Direct** (pooling off) → migrations only.
3. In both, delete `&channel_binding=require`; keep `?sslmode=require`.
4. Apply the migrations from your machine:

   ```bash
   DATABASE_URL="<direct URL>" npm run db:migrate
   ```

Why:

| Setting                   | Why                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Pooled URL for the app    | Serverless functions open many short connections → the pooler shares them; postgres-js prepared statements still work |
| Direct URL for migrations | Migrations need one steady session; the pooler can switch connections between statements                              |
| No `channel_binding`      | postgres-js sends URL params it doesn't know to the server as settings → the connection is refused                    |

## 3. Clerk

- A **separate** Clerk application (or the production instance), never the one
  used locally → users and webhooks don't cross.
- Copy its publishable and secret keys (step 4 and 5 env vars).
- Webhook (Configure > Webhooks > Add Endpoint):
  - URL → `https://<app>.vercel.app/api/webhooks/clerk`
  - Events → `user.created`, `user.updated`, `user.deleted`
  - Signing secret → `CLERK_WEBHOOK_SIGNING_SECRET` (step 5)

## 4. Vercel: API

New Project → import the repo:

- Root Directory → `backend`
- Framework Preset → **Fastify**
- "Include files outside the root directory in the Build Step" → on (needs
  `packages/shared`)
- Build → the backend's `npm run build` (esbuild bundle → `server.js`)

Environment variables:

| Variable                | Value                                                |
| ----------------------- | ---------------------------------------------------- |
| `DATABASE_URL`          | Neon pooled URL (step 2)                             |
| `FRONTEND_URL`          | `https://<app>.vercel.app` (CORS; no trailing slash) |
| `CLERK_PUBLISHABLE_KEY` | Same Clerk app as the frontend                       |
| `CLERK_SECRET_KEY`      | Same Clerk app as the frontend                       |
| `BILLING_ENABLED`       | Same as the frontend                                 |

Check → `https://<api>.vercel.app/healthcheck` → `{"status":"OK"}`, and
`/docs` opens Swagger.

## 5. Vercel: Next.js App

New Project → import the same repo:

- Root Directory → `frontend` (the repo root fails with
  `NEXT_NO_ROUTES_MANIFEST`)
- Framework Preset → **Next.js**
- "Include files outside the root directory in the Build Step" → on

Environment variables:

| Variable                                          | Value                                     |
| ------------------------------------------------- | ----------------------------------------- |
| `FRONTEND_URL`                                    | `https://<app>.vercel.app`                |
| `BACKEND_URL`                                     | `https://<api>.vercel.app`                |
| `LANDING_PAGE_ENABLED`                            | `true` / `false`                          |
| `BILLING_ENABLED`                                 | `true` / `false` (same as the API)        |
| `DATABASE_URL`                                    | Same as the API                           |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`                   | `/sign-in`                                |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`                   | `/sign-up`                                |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/`                                       |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/`                                       |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`               | Clerk app from step 3                     |
| `CLERK_SECRET_KEY`                                | Clerk app from step 3                     |
| `CLERK_WEBHOOK_SIGNING_SECRET`                    | The production endpoint's secret (step 3) |
| `NEXT_PUBLIC_GITHUB_URL`                          | Optional                                  |
| `SIGN_UP_DEMO_MODE_ENABLED`                       | Optional; only on Clerk development keys  |
| Stripe variables                                  | Step 6, when `BILLING_ENABLED=true`       |

- Not needed in production → `CLERK_WEBHOOK_RELAY_TOKEN` (local tunnel only).
- `NEXT_PUBLIC_*` values are built into the bundle → redeploy after changing
  them.

## 6. Stripe (`BILLING_ENABLED=true`)

- Keys → live mode for real payments; a sandbox for a demo (test card
  `4242 4242 4242 4242`).
- Products and Prices → created in that same account/sandbox.
- Customer Portal → configured in that account (live mode has its own
  settings).
- Webhook (Developers > Webhooks > Add Destination):
  - URL → `https://<app>.vercel.app/api/webhooks/stripe`
  - Events → the `stripe:listen` list in the root `package.json`:
    `customer.subscription.created`, `.updated`, `.deleted`, `.paused`,
    `.resumed`
  - Signing secret → `STRIPE_WEBHOOK_SECRET` (never reuse the local one)

Frontend environment variables:

| Variable                  | Value                                      |
| ------------------------- | ------------------------------------------ |
| `STRIPE_SECRET_KEY`       | `sk_live_…` (or the sandbox's `sk_test_…`) |
| `STRIPE_WEBHOOK_SECRET`   | The production destination's secret        |
| `STRIPE_BASIC_PRICE_ID`   | At least one Price ID                      |
| `STRIPE_PREMIUM_PRICE_ID` |                                            |
| `STRIPE_ALL_IN_PRICE_ID`  |                                            |
| `STRIPE_DEMO_COUPON_ID`   | Optional; demos only                       |

## 7. Smoke Test

On the production URL:

- [ ] Sign up → a `users` row appears (Neon → Tables)
- [ ] Billing on → Checkout → a `subscriptions` row → the app opens
- [ ] Overview → the sample dashboard loads (frontend → API → database)
- [ ] **Check API health** works
- [ ] Billing → Customer Portal opens
- [ ] Sign out → sign in again

## Demo on Clerk Development Keys

- Test mode is on → no real inbox needed:
  `<name>+clerk_test@example.com`, code `424242`.
- `SIGN_UP_DEMO_MODE_ENABLED=true` → the sign-up page fills in a fresh test
  email and shows the code.
- Never set it with production keys → test mode is off there.

---

# Next Deploys

## Before Merging

- CI green (`npm run check`).
- **Migrations** → run on production **before** merging:

  ```bash
  DATABASE_URL="<direct URL>" npm run db:migrate
  ```

  - The old code keeps running on the new schema until the deploy finishes →
    every migration must be backward compatible.
  - Add → nullable or with a default.
  - Drop / rename → expand, then contract: add the new column → deploy code
    that uses it → drop the old one in a later release.

- **New env vars** → add them in Vercel first. Required variables throw at
  startup → every request fails.
- **New webhook events** → add them to the Clerk endpoint or the Stripe
  destination (and to `stripe:listen` for local).

## Merge

- Merge to `main` → Vercel deploys both projects.
- Rollback → Vercel **Instant Rollback**, per project. It doesn't undo
  migrations → one more reason to keep them backward compatible.

## Watch Out

| Topic             | Risk → what to do                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preview deploys   | Share production env vars by default → previews write to the production database; the API's CORS only accepts `FRONTEND_URL` → scope variables per environment |
| Neon free         | Compute sleeps after ~5 min idle → the first request after that waits a moment to wake it                                                                      |
| Clerk development | "Development mode" badge and usage limits → fine for a demo, not for real users                                                                                |
| Costs             | Free tiers fit a demo; Vercel Hobby is for non-commercial use → Pro for a commercial SaaS                                                                      |
