import "server-only";

import { getBooleanEnvVar, getEnvVar } from "@/lib/utils";

export const featureFlags = {
  landingPageEnabled: getBooleanEnvVar("LANDING_PAGE_ENABLED"),
  billingEnabled: getBooleanEnvVar("BILLING_ENABLED"),
  // Optional: shows the Clerk test-user hint on sign-up.
  signUpDemoModeEnabled:
    getEnvVar("SIGN_UP_DEMO_MODE_ENABLED", false) === "true",
} as const;
