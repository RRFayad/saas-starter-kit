"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { stripePriceIds } from "@/lib/constants";
import { subscriptionPlan } from "@/lib/db/schema";
import {
  createStripeCheckoutSession,
  createStripeCustomerPortalSession,
} from "@/lib/stripe";
import { getUserByClerkId } from "@/lib/user/user";
import { getEnvVar } from "@/lib/utils";
import type { SubscriptionPlan } from "@/types/database";

const isSubscriptionPlan = (value: string): value is SubscriptionPlan => {
  return subscriptionPlan.enumValues.includes(value as SubscriptionPlan);
};

export const checkout = async (formData: FormData) => {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    throw new Error("Unauthorized");
  }

  const plan = formData.get("plan");

  if (typeof plan !== "string" || !isSubscriptionPlan(plan)) {
    throw new Error("Invalid subscription plan");
  }

  const user = await getUserByClerkId(clerkUserId);

  if (!user) {
    throw new Error("Application user not found");
  }

  const frontendUrl = getEnvVar("FRONTEND_URL");
  const priceId = stripePriceIds[plan];

  if (!priceId) {
    throw new Error(`Stripe price is not configured for plan: ${plan}`);
  }

  const checkoutUrl = await createStripeCheckoutSession({
    priceId,
    user,
    successUrl: `${frontendUrl}/payment/success`,
    cancelUrl: `${frontendUrl}/payment/cancelled`,
  });

  redirect(checkoutUrl);
};

export const customerPortal = async () => {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    throw new Error("Unauthorized");
  }

  const user = await getUserByClerkId(clerkUserId);

  if (!user) {
    throw new Error("Application user not found");
  }

  if (!user.stripeCustomerId) {
    throw new Error("Stripe customer not found");
  }

  const frontendUrl = getEnvVar("FRONTEND_URL");
  const portalUrl = await createStripeCustomerPortalSession({
    customerId: user.stripeCustomerId,
    returnUrl: `${frontendUrl}/product`,
  });

  redirect(portalUrl);
};
