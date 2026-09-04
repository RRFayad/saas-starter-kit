import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { canCurrentUserAccessSubscriptionPlan } from "@/lib/subscription/subscription";
import { SubscriptionPlan } from "@/types/database";

type SubscribedLayoutProps = {
  children: ReactNode;
};

const SubscribedLayout = async ({ children }: SubscribedLayoutProps) => {
  if (!(await canCurrentUserAccessSubscriptionPlan(SubscriptionPlan.Basic))) {
    redirect("/");
  }

  return children;
};

export default SubscribedLayout;
