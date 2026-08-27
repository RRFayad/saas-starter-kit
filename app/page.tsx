import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <Show when="signed-out">
        <SignInButton forceRedirectUrl={"/product"} />
        <SignUpButton forceRedirectUrl={"/product"} />
      </Show>

      <Show when="signed-in">
        <p>Authenticated!</p>
        <UserButton />
      </Show>
    </main>
  );
}
