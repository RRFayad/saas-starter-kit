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

const Success = () => {
  return (
    <main className={styles.page}>
      <RedirectAfterDelay href={routes.workspace.overview} />
      <h1 className={styles.heading}>Subscription confirmed.</h1>
      <p className={styles.description}>
        Your subscription is being synchronized. Continue to your overview.
      </p>
      <Button asChild>
        <Link href={routes.workspace.overview}>Continue to overview</Link>
      </Button>
    </main>
  );
};

export default Success;
