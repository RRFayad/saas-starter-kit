import Link from "next/link";

import { RedirectAfterDelay } from "@/components/payment/redirect-after-delay";
import { Button } from "@/components/ui/button";
import { tw } from "@/lib/utils";
import { routes } from "@/lib/routes";

const styles = {
  page: tw(
    "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center",
  ),
  heading: tw("text-3xl font-semibold tracking-tight"),
  description: tw("max-w-md text-muted-foreground"),
};

const Cancelled = () => {
  return (
    <main className={styles.page}>
      <RedirectAfterDelay href={routes.pricing} />
      <h1 className={styles.heading}>Checkout cancelled.</h1>
      <p className={styles.description}>
        No subscription was created. You can choose a plan whenever you are
        ready.
      </p>
      <Button asChild>
        <Link href={routes.pricing}>Back to pricing</Link>
      </Button>
    </main>
  );
};

export default Cancelled;
