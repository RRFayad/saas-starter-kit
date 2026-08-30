import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

export const stripe = new Stripe(stripeSecretKey);

export const getStripeCheckoutSession = async ({
  priceId,
  domainUrlToBeRedirected,
  customerId,
  successUrl,
}: {
  priceId: string;
  domainUrlToBeRedirected: string;
  customerId: string;
  successUrl?: string;
}) => {
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
    success_url: successUrl || `${domainUrlToBeRedirected}/payment/success`,
    cancel_url: `${domainUrlToBeRedirected}/payment/cancelled`,
  });

  return session.url as string;
};
