import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Dashboard } from "@/components/product/dashboard";
import { getCurrentUser } from "@/lib/backend/user";

const DashboardPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await getCurrentUser();

  return <Dashboard user={user} userId={userId} />;
};

export default DashboardPage;
