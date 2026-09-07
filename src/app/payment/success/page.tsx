import Link from "next/link";

import { RedirectAfterDelay } from "@/components/payment/redirect-after-delay";
import { Button } from "@/components/ui/button";

const styles = {
  page: "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center",
  heading: "text-3xl font-semibold tracking-tight",
  description: "max-w-md text-muted-foreground",
};

const Success = () => {
  return (
    <main className={styles.page}>
      <RedirectAfterDelay href="/dashboard" />
      <h1 className={styles.heading}>Subscription confirmed.</h1>
      <p className={styles.description}>
        Your subscription is being synchronized. Continue to your dashboard.
      </p>
      <Button asChild>
        <Link href="/dashboard">Continue to dashboard</Link>
      </Button>
    </main>
  );
};

export default Success;
