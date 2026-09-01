import { Button } from "@/components/ui/button";
import { checkout } from "@/actions/checkout";
import { stripePriceIds } from "@/lib/constants";
import type { SubscriptionPlan } from "@/types/database";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const availablePlans = Object.entries(stripePriceIds).filter(
  (entry): entry is [SubscriptionPlan, string] => Boolean(entry[1]),
);

if (availablePlans.length === 0) {
  throw new Error("At least one Stripe price ID must be configured");
}

const Home = () => {
  return (
    <main>
      <Show when="signed-out">
        <SignInButton forceRedirectUrl={"/product"} />
        <SignUpButton forceRedirectUrl={"/product"} />
      </Show>

      <Show when="signed-in">
        <p>Authenticated!</p>
        <UserButton />
        {availablePlans.map(([plan]) => (
          <form action={checkout} key={plan}>
            <input name="plan" type="hidden" value={plan} />
            <Button type="submit">Subscribe to {plan}</Button>
          </form>
        ))}
      </Show>
    </main>
  );
};

export default Home;
