# Project Guidelines

## Scope and Workflow

- Prefer simple, understandable architecture over abstractions introduced for
  hypothetical future needs.
- Do not expand the starter-kit scope or make unrelated changes.
- Do not create branches, stage files, or commit unless explicitly requested.
- Inspect the existing implementation before changing code. Preserve established
  naming, structure, and patterns when they are already clear.

## Architecture Boundaries

- The repository is an npm workspaces monorepo: the Next.js app in
  `frontend/` (`@app/frontend`), the Fastify API in `backend/`
  (`@app/backend`), and the shared package in `packages/shared/`
  (`@app/shared`).
- The Next.js app (`frontend/`) uses a Next.js version with breaking changes
  from common training data. Read `frontend/AGENTS.md` and the guides in
  `node_modules/next/dist/docs/` before writing Next.js code.
- Next.js owns UI, Clerk authentication, Clerk and Stripe webhooks, billing,
  and SaaS/account concerns.
- The API (Fastify) owns product/domain APIs and future product logic, such as
  AI, RAG, agents, and streaming.
- `@app/shared` holds what both apps must agree on: the Drizzle schema and
  migrations, the API contract (Zod schemas in `schemas/`, one file per
  feature), and shared
  constants, types, and utils. Each app reads its own environment variables;
  configuration objects such as `featureFlags` stay in their app.
  Types inferred from a schema live next to it: row types (`User`,
  `Subscription`) in `db/schema.ts`, API types in each `schemas/` file; `types.ts`
  holds shared types that don't belong to a schema file.
- PostgreSQL is the shared application database. Supabase, when used, is only
  the database host. Do not introduce Supabase Auth or the Supabase SDK.
- Local development uses the PostgreSQL + pgvector container in
  `docker-compose.yml`; `npm run dev` starts it through `predev`.
- Drizzle owns the schema and migrations in `packages/shared/src/db/`. Change
  the schema there and run `npm run db:generate`. `npm run db:studio` opens
  Drizzle Studio on the local database.
- The API derives identity from the verified Clerk session token. Never trust a
  browser-supplied user ID for authenticated identity.

## Frontend Conventions

- Use TypeScript arrow functions, not function declarations.
- Name fixed module-level constants (lists, lookup tables) in
  `UPPER_SNAKE_CASE`, such as `SUBSCRIPTION_PLANS`. Objects built from
  environment variables or config, such as `featureFlags` or `routes`, stay
  `camelCase`.
- Prefer Server Components. Add client components only when client-side
  behavior is necessary.
- Keep Next.js to API calls under `frontend/src/lib/backend/`, typed with the inferred
  types from `@app/shared/schemas`.
- Application-owned Tailwind styles belong in a local `styles` object and must
  be wrapped with `tw()` so Prettier sorts the classes.
- Use `cn()` only for runtime conditional class merging.
- Group generic files (shared `constants`, `types`, `utils`) into sections with
  `// ---------- Section ----------` dividers. Split a section into its own file
  once it grows large.
- Give user feedback with `showToast({ type, title, message })` from
  `frontend/src/components/toaster.tsx`; `type` is `success`, `warning`, or `error`.
  Call it directly in the client component that handles the action. Server
  actions return a result, and the calling client component turns it into a
  toast.
- Do not refactor copied shadcn/ui components in `frontend/src/components/ui/` or Velora
  components in `frontend/src/components/velora/` into the application styling pattern.
- Keep marketing components in `frontend/src/components/marketing/`, subscribed-app
  components in `frontend/src/components/subscribed/`, and theme components in
  `frontend/src/components/theme/`.

## Implementing Designs

- The app shell is code-owned; its visual reference is the
  [App Shell canvas](https://claude.ai/artifact/HWhacGtes2kTC143kN4aUk).
  Implement a design's page content inside the existing shell and change the
  shell only when the request asks for it.
- A new subscribed page lives under `frontend/src/app/(subscribed)/` and is wired in
  three places: its path in `frontend/src/lib/routes.ts`, its nav item in
  `frontend/src/components/app-sidebar.tsx`, and its breadcrumb in `routeContext` in
  `frontend/src/components/subscribed/app-header.tsx`.
- Redirects and links into the app use `routes.appHome`. Only the Overview
  page's own nav item and breadcrumb use `routes.workspace.overview`.
- Pages follow the existing page pattern: a `mx-auto w-full max-w-7xl`
  container, `PageHeader`, then white cards styled like the ones in
  `frontend/src/components/subscribed/billing.tsx`.
- Translate design colors, radii, and fonts to theme tokens (`bg-card`,
  `text-muted-foreground`, `border`, `bg-primary`, `rounded-xl`) so light and
  dark themes both follow.

## Authentication and Billing

- Clerk webhooks synchronize `users` in PostgreSQL.
- Stripe webhooks synchronize the current subscription state in
  `subscriptions`; authorization reads local subscription state rather than
  querying Stripe on every request.
- Server-side Next.js pages use the subscription helpers in
  `frontend/src/lib/subscription/`. API routes get the same check from the subscribed
  scope (`requireSubscriptionPlan(...)`). Both read the plan rules from
  `@app/shared/constants`.
- Keep Stripe SDK use, customer creation, Checkout Session creation, and
  Customer Portal Session creation server-only.
- Each project uses its own Stripe sandbox. Local Stripe webhooks come from
  the Stripe CLI, started by `npm run dev` through `scripts/dev-stripe.mjs`
  (only when `BILLING_ENABLED=true`). It uses the project's
  `STRIPE_SECRET_KEY`, never the global `stripe login`, and syncs
  `STRIPE_WEBHOOK_SECRET` in `frontend/.env.local`. Never use a dashboard destination
  pointing at a tunnel; the dashboard destination is for production only. When the Stripe webhook route handles a new event type, add
  it to the `stripe:listen` script's `--events` list and to the production
  destination.

## Backend Conventions

- Install packages from the repo root into a workspace, such as
  `npm install <package> -w @app/backend`. A `backend/package-lock.json` or
  `backend/node_modules/` means something ran outside the workspace.
- `npm run dev` at the root starts the database, Next.js, the API, the Stripe
  listener (`scripts/dev-stripe.mjs`), and Clerk's webhook tunnel
  (`scripts/dev-clerk.mjs`, using the `clerk` dev dependency and
  `CLERK_WEBHOOK_RELAY_TOKEN`). The API reads `backend/.env`.
- Give each feature a folder in `backend/src/<feature>/` with
  `<feature>.route.ts` (path, Zod schemas, Swagger metadata),
  `<feature>.controller.ts` (request handling), and `<feature>.service.ts`
  (business logic and Drizzle queries). Small features can skip layers.
- Register routes in the matching scope in `backend/src/create-app.ts`: public;
  protected (`authenticate`, sets `request.user`); or subscribed
  (`requireSubscriptionPlan(...)`, sets `request.subscription`). Nest a scope
  for plan-gated routes.
- Auth hooks run in `preHandler`, after `clerkPlugin` reads the token there; an
  `onRequest` hook sees no session.
- Every route declares its success response schema from `@app/shared/schemas`
  and uses `withTypeProvider<ZodTypeProvider>()`. Routes don't list their error
  codes: errors are thrown as `HttpError`, `errorHandler` sends them with the
  `{ detail }` body, and the tests document which errors each route returns.
- Services throw `HttpError(status, detail)` from `backend/src/errors.ts` for
  expected failures; no `try/catch` to shape errors. `errorHandler` sends every
  error as `{ detail }`: validation errors → 422, unexpected errors → logged,
  then 500 without the internal message. Unknown routes → 404.
- Fastify treats `/path` and `/path/` as different routes; call routes without a
  trailing slash.
- CORS accepts only `FRONTEND_URL`; keep it aligned with the Next.js app URL.
- Tests sit next to their feature (`backend/src/<feature>/<feature>.test.ts`)
  and use the harness in `backend/src/testing/`: `startApi()` runs the real app
  on a free port, `api.as(clerkId)` calls it over HTTP with axios, and
  `createUser` / `createSubscription` seed rows. Clerk is the only mock. They
  run against `app_test` on the Docker Postgres (created and migrated
  automatically, truncated before each test), so Docker must be running.
  `TEST_DATABASE_URL` overrides it. Billing is off; turn it on per test with
  `vi.stubEnv("BILLING_ENABLED", "true")`.
- `backend/src/create-app.ts` builds the app (plugins, hooks, route scopes);
  the entry `backend/src/main.ts` only starts it. Vercel deploys the esbuild bundle
  from `npm run build` (`backend/server.js`), which inlines `@app/shared`
  because Node can't load its TypeScript source from `node_modules`. Vercel
  picks the entrypoint by file name, so never add `backend/src/app`, `backend/src/index`,
  or `backend/src/server` files: Vercel would run them unbundled.
- The root `package.json` `overrides` pins `@fastify/static` (used by Swagger
  UI) to 10.1.3. Newer versions `require()` the ESM-only `content-disposition`
  v3, which Vercel's runtime loader rejects (`ERR_REQUIRE_ESM`, every route
  returns 500). Before removing the pin, run the bundle with
  `node --no-experimental-require-module server.js` to confirm it starts.

## Validation

Run relevant checks after changes:

```bash
# Lint, Prettier, type checks (Next.js app, API, @app/shared), and API tests
# (needs Docker running)
npm run check
```

`.prettierignore` skips files that aren't ours (vendored skills, Drizzle
migration snapshots, copied shadcn/ui and Velora components).
