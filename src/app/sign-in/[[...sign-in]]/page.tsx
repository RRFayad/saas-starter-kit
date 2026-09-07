import { SignIn } from "@clerk/nextjs";
import { tw } from "@/lib/utils";

const styles = {
  page: tw("flex min-h-screen items-center justify-center"),
};

const SignInPage = () => {
  return (
    <div className={styles.page}>
      <SignIn
        fallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;
