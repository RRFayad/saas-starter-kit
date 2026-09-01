import type { SubscriptionPlan } from "@/types/database";

export const stripePriceIds = {
  basic: process.env.STRIPE_BASIC_PRICE_ID || null,
  premium: process.env.STRIPE_PREMIUM_PRICE_ID || null,
  all_in: process.env.STRIPE_ALL_IN_PRICE_ID || null,
} satisfies Record<SubscriptionPlan, string | null>;
