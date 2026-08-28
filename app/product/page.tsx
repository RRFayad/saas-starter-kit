import { Show, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/backend/user";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await getUser();

  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <h1>Dashboard - Authenticated!</h1>
      <Show when="signed-in">
        <p>Clerk Authenticated! - {userId}</p>
        <UserButton />
        <p>{user?.id}</p>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </Show>
    </>
  );
}
