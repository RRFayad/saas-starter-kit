import { SignUp } from "@clerk/nextjs";

const styles = {
  page: "flex min-h-screen items-center justify-center",
};

const SignUpPage = () => {
  return (
    <div className={styles.page}>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
