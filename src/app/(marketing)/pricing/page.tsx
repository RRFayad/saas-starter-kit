import { PricingCards } from "@/components/marketing/pricing-cards";
import { getAvailableStripePlans } from "@/lib/stripe/config";

const styles = {
  page: "py-24",
  content: "mx-auto max-w-6xl px-4 lg:px-8",
  heading: "text-center text-4xl font-semibold tracking-tight",
  description: "mx-auto mt-4 max-w-xl text-center text-muted-foreground",
};

const PricingPage = () => {
  const plans = getAvailableStripePlans();

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Choose a plan to continue.</h1>
        <p className={styles.description}>
          Your subscription unlocks the dashboard and product features.
        </p>
        <PricingCards plans={plans} />
      </div>
    </main>
  );
};

export default PricingPage;
