import type { SubscriptionPlan } from "@/types/database";

import { getEnvVar } from "@/lib/utils";

export const stripePriceIds = {
  basic: getEnvVar("STRIPE_BASIC_PRICE_ID", false),
  premium: getEnvVar("STRIPE_PREMIUM_PRICE_ID", false),
  all_in: getEnvVar("STRIPE_ALL_IN_PRICE_ID", false),
} satisfies Record<SubscriptionPlan, string | null>;
