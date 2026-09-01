import "server-only";

import Stripe from "stripe";
import type { User } from "@/types/database";
import { getErrorMessageAndThrow } from "../utils";
import { addStripeCustomerIdToUserDb } from "../user/user";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

export const stripe = new Stripe(stripeSecretKey);

export const createStripeCustomer = async (user: User) => {
  const stripeCustomer = await stripe.customers.create(
    {
      email: user.email,
      metadata: {
        userId: user.id.toString(),
        clerkId: user.clerkId,
      },
    },
    {
      idempotencyKey: `customer-${user.id}`,
    },
  );
  return stripeCustomer;
};

export const createStripeCheckoutSession = async ({
  priceId,
  user,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  user: User;
  successUrl: string;
  cancelUrl?: string;
}) => {
  let updatedUser;

  if (!user.stripeCustomerId) {
    try {
      const customer = await createStripeCustomer(user);
      updatedUser = await addStripeCustomerIdToUserDb(user, customer.id);
    } catch (error) {
      getErrorMessageAndThrow(
        "Failed to add Stripe Customer to create checkout",
        error,
      );
    }
  }

  const customerId = (user.stripeCustomerId || updatedUser?.stripeCustomerId)!;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_update: { name: "auto", address: "auto" },
    success_url: successUrl,
    cancel_url: cancelUrl || `/`,
  });

  if (!session.url) {
    throw new Error("Stripe checkout session URL is missing");
  }

  return session.url;
};
