import { Show, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  console.log(userId);

  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <h1>Dashboard - Authenticated!</h1>
      <Show when="signed-in">
        <p>Authenticated!</p>
        <UserButton />
      </Show>
    </>
  );
}
