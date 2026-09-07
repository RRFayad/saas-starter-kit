import { UserProfile } from "@clerk/nextjs";

import { tw } from "@/lib/utils";

const styles = {
  page: tw("mx-auto w-full max-w-4xl space-y-8"),
  eyebrow: tw("text-sm font-medium text-primary"),
  heading: tw("mt-1 text-3xl font-semibold tracking-tight"),
  description: tw("mt-2 max-w-2xl text-sm text-muted-foreground"),
  profile: tw("rounded-xl"),
};

const AccountPage = () => {
  return (
    <main className={styles.page}>
      <section>
        <p className={styles.eyebrow}>Account</p>
        <h1 className={styles.heading}>Manage your account.</h1>
        <p className={styles.description}>
          Your profile and security settings are securely managed by Clerk, our
          authentication provider. <br /> We only store the account details
          required to operate this application.
        </p>
      </section>
      <section className={styles.profile}>
        <UserProfile />
      </section>
    </main>
  );
};

export default AccountPage;
