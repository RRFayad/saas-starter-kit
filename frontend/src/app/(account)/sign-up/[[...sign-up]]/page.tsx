import { randomUUID } from "node:crypto";
import { ClerkLoaded, SignUp } from "@clerk/nextjs";
import { connection } from "next/server";

import { BlurFade } from "@/components/velora/blur-fade";
import { featureFlags } from "@/lib/feature-flags";
import { routes } from "@/lib/routes";
import { tw } from "@/lib/utils";

// Clerk test mode (development keys): +clerk_test emails verify with this code.
const DEMO_VERIFICATION_CODE = "424242";

const styles = {
  page: tw("flex min-h-screen flex-col items-center justify-center gap-4 p-4"),
  demoHintSlot: tw("flex min-h-20 items-end"),
  demoHint: tw(
    "max-w-sm rounded-xl border bg-card px-4 py-3 text-center text-sm text-foreground",
  ),
  demoCode: tw("font-semibold"),
};

const createDemoEmail = () =>
  `demo-${randomUUID().slice(0, 8)}+clerk_test@example.com`;

const SignUpPage = async () => {
  if (featureFlags.signUpDemoModeEnabled) {
    // Render per request, not at build: every visitor gets their own email.
    await connection();
  }

  const initialValues = featureFlags.signUpDemoModeEnabled
    ? { emailAddress: createDemoEmail() }
    : undefined;

  return (
    <div className={styles.page}>
      {featureFlags.signUpDemoModeEnabled && (
        <div className={styles.demoHintSlot}>
          <ClerkLoaded>
            <BlurFade delay={0.3}>
              <p className={styles.demoHint}>
                <b>Demo:</b> any <code>name+clerk_test@example.com</code> works,
                no inbox needed. The verification code is{" "}
                <span className={styles.demoCode}>
                  {DEMO_VERIFICATION_CODE}
                </span>
                .
              </p>
            </BlurFade>
          </ClerkLoaded>
        </div>
      )}
      <SignUp
        fallbackRedirectUrl={routes.appHome}
        signInFallbackRedirectUrl={routes.appHome}
        initialValues={initialValues}
      />
    </div>
  );
};

export default SignUpPage;
