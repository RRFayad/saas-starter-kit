import { SignIn } from "@clerk/nextjs";

const styles = {
  page: "flex min-h-screen items-center justify-center",
};

const SignInPage = () => {
  return (
    <div className={styles.page}>
      <SignIn />
    </div>
  );
};

export default SignInPage;
