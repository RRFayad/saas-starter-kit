import Link from "next/link";

import { RedirectAfterDelay } from "@/components/payment/redirect-after-delay";
import { Button } from "@/components/ui/button";

const styles = {
  page: "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center",
  heading: "text-3xl font-semibold tracking-tight",
  description: "max-w-md text-muted-foreground",
};

const Cancelled = () => {
  return (
    <main className={styles.page}>
      <RedirectAfterDelay href="/pricing" />
      <h1 className={styles.heading}>Checkout cancelled.</h1>
      <p className={styles.description}>
        No subscription was created. You can choose a plan whenever you are
        ready.
      </p>
      <Button asChild>
        <Link href="/pricing">Back to pricing</Link>
      </Button>
    </main>
  );
};

export default Cancelled;
