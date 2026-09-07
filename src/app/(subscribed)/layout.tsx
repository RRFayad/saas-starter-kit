import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { canCurrentUserAccessSubscriptionPlan } from "@/lib/subscription/subscription";
import { SubscriptionPlan } from "@/types/database";

type SubscribedLayoutProps = {
  children: ReactNode;
};

const SubscribedLayout = async ({ children }: SubscribedLayoutProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!(await canCurrentUserAccessSubscriptionPlan(SubscriptionPlan.Basic))) {
    redirect("/pricing");
  }

  return children;
};

export default SubscribedLayout;
