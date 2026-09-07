import { SignUp } from "@clerk/nextjs";

const styles = {
  page: "flex min-h-screen items-center justify-center",
};

const SignUpPage = () => {
  return (
    <div className={styles.page}>
      <SignUp
        fallbackRedirectUrl="/dashboard"
        signInFallbackRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignUpPage;
