# SaaS Starter Kit

A reusable full-stack SaaS starter for building and shipping SaaS applications.

The goal of this repository is to provide the common infrastructure required by most SaaS products so new projects can focus primarily on product-specific functionality.

## Tech Stack

### Frontend / SaaS Layer

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

### Authentication

- Clerk

### Database

- PostgreSQL
- Supabase (PostgreSQL hosting)
- Drizzle ORM

### Backend

- FastAPI

### Billing

- Stripe

---

# Getting Started

## 1. Clone the Repository

Clone the starter into your new project.

If this repository is being used as the starting point for an entirely new product, remove the existing Git history and initialize a new repository:

```bash
rm -rf .git
git init
git add .
git commit -m "chore: initialize project from SaaS starter"
```

---

## 2. Install Dependencies

Install the Node.js dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application should be available at:

```text
http://localhost:3000
```

---

# Environment Variables

Create a `.env.local` file in the project root.

The starter currently requires:

```env
# Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SIGNING_SECRET=

# Database

DATABASE_URL=
```

Never commit `.env.local` or real credentials to Git.

---

# Authentication — Clerk

## 1. Create a Clerk Application

Create a new application in the Clerk Dashboard for the product being built from this starter.

Copy the application's credentials into `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

The application uses Clerk for:

- User authentication
- Session management
- User identity
- Sign in
- Sign up
- Sign out

Clerk is responsible for **authentication and identity**.

Application-specific user data is stored separately in PostgreSQL.

---

## 2. Authentication Flow

The basic authentication flow is:

```text
Visitor
   ↓
Sign In / Sign Up
   ↓
Clerk
   ↓
Authenticated Session
   ↓
Protected Product
```

Client-side authentication state can be rendered using Clerk's `<Show>` component:

```tsx
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <Show when="signed-out">
        <SignInButton forceRedirectUrl="/product" />
        <SignUpButton forceRedirectUrl="/product" />
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </main>
  );
}
```

`<Show>` controls what is rendered in the UI. It should not be treated as the security boundary for protected server resources.

---

## 3. Protect Server-Side Routes

Protected pages should verify authentication server-side.

Example:

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProductPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return <h1>Product</h1>;
}
```

The redirect after sign-in is a UX concern.

The server-side authentication check is the actual protection.

---

# Database — Supabase PostgreSQL + Drizzle

Supabase is used only as the managed PostgreSQL provider.

The starter does **not** depend on:

- Supabase Auth
- Supabase Storage
- Supabase client SDK

Authentication remains the responsibility of Clerk.

---

## 1. Create the Supabase Project

Create a new Supabase project for the application.

Get the PostgreSQL connection string from the project's database connection settings.

Add it to `.env.local`:

```env
DATABASE_URL=postgresql://...
```

---

## 2. Database Structure

Database-related files are located under:

```text
lib/db/
├── index.ts
├── schema.ts
└── migrations/
```

Responsibilities:

```text
schema.ts
→ Database schema

index.ts
→ Application database connection

migrations/
→ Versioned database migrations
```

The Drizzle CLI configuration lives at:

```text
drizzle.config.ts
```

---

## 3. Database Connection

The application connects to PostgreSQL using `postgres.js` and Drizzle:

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client, {
  schema,
});
```

Conceptually:

```text
Next.js
   ↓
Drizzle ORM
   ↓
postgres.js
   ↓
PostgreSQL
   ↓
Supabase
```

---

# Database Migrations

Drizzle Kit manages database migrations.

## Generate a Migration

After modifying `lib/db/schema.ts`:

```bash
npx drizzle-kit generate
```

This generates SQL migration files.

Always inspect the generated SQL before applying the migration.

---

## Apply Migrations

Run:

```bash
npx drizzle-kit migrate
```

This applies pending migrations to the PostgreSQL database configured through `DATABASE_URL`.

---

## Environment Variables and Drizzle Kit

Next.js automatically loads `.env.local`, but Drizzle Kit runs independently from the Next.js runtime.

Therefore, `drizzle.config.ts` explicitly loads `.env.local`:

```ts
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

Without this, `drizzle-kit` may report:

```text
url: undefined
```

even though Next.js can access `DATABASE_URL`.

---

## Commit Migrations

Database migrations should be committed to Git.

For example:

```text
lib/db/migrations/
├── 0000_initial_schema.sql
├── meta/
└── ...
```

Migrations represent the version history of the database schema and allow development, preview, and production databases to evolve consistently.

---

# Clerk → Application User Synchronization

Clerk owns authentication and identity.

PostgreSQL owns application-specific user data.

Therefore, a Clerk user and an application user are separate concepts:

```text
Clerk

user_abc123
Renan
renan@example.com

        ↓ synchronization

PostgreSQL

users
├── id
├── clerkId
├── email
├── name
├── role
├── createdAt
├── updatedAt
└── deletedAt
```

The `clerkId` provides the relationship between the two systems.

---

# Clerk Webhooks

Clerk webhooks synchronize user lifecycle events with the application database.

The webhook endpoint is:

```text
POST /api/webhooks/clerk
```

and is implemented at:

```text
app/api/webhooks/clerk/route.ts
```

The starter listens for:

```text
user.created
user.updated
user.deleted
```

The intended synchronization flow is:

```text
Clerk User Event
       ↓
Clerk Webhook
       ↓
POST /api/webhooks/clerk
       ↓
Verify Webhook Signature
       ↓
Process Event
       ↓
Drizzle
       ↓
PostgreSQL
```

---

## Webhook Verification

Webhook requests must be verified before their payload is trusted.

The endpoint uses Clerk's `verifyWebhook()`:

```ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    console.log("Clerk webhook:", evt.type);
    console.log("Webhook data:", evt.data);

    return Response.json({
      received: true,
      type: evt.type,
      id: evt.data.id,
    });
  } catch (error) {
    console.error("Webhook verification failed:", error);

    return new Response("Invalid webhook", {
      status: 400,
    });
  }
}
```

The signing secret is configured through:

```env
CLERK_WEBHOOK_SIGNING_SECRET=
```

Do not process webhook data before verification succeeds.

---

# Testing Clerk Webhooks Locally

Clerk cannot directly reach:

```text
http://localhost:3000
```

because localhost is only accessible from the local machine.

A tunnel can expose the local Next.js server through a temporary public HTTPS URL.

This starter has been tested using ngrok.

ngrok is development tooling installed on the machine and is **not a project dependency**.

---

## 1. Start Next.js

In one terminal:

```bash
npm run dev
```

---

## 2. Start ngrok

In another terminal:

```bash
ngrok http 3000
```

ngrok will provide a public URL similar to:

```text
https://example.ngrok-free.app
```

Traffic is forwarded as:

```text
Internet
   ↓
https://example.ngrok-free.app
   ↓
ngrok
   ↓
http://localhost:3000
```

---

## 3. Configure the Clerk Webhook

In the Clerk Dashboard, create a webhook endpoint pointing to:

```text
https://example.ngrok-free.app/api/webhooks/clerk
```

**Important:** include the complete webhook route:

```text
/api/webhooks/clerk
```

Do not configure only the ngrok root URL.

Incorrect:

```text
https://example.ngrok-free.app
```

Correct:

```text
https://example.ngrok-free.app/api/webhooks/clerk
```

Subscribe the endpoint to:

```text
user.created
user.updated
user.deleted
```

Copy the webhook signing secret provided by Clerk into:

```env
CLERK_WEBHOOK_SIGNING_SECRET=
```

Restart the Next.js development server after changing environment variables.

---

## 4. Test the Webhook

Send a test `user.created` event from Clerk.

The Next.js terminal should log something similar to:

```text
Clerk webhook: user.created
Webhook data: { ... }
```

The request should return HTTP `200`.

The ngrok request inspector can also be opened locally at:

```text
http://localhost:4040
```

The request should appear as:

```text
POST /api/webhooks/clerk
200 OK
```

A request appearing as:

```text
POST /
```

means the Clerk webhook URL was configured without `/api/webhooks/clerk`.
