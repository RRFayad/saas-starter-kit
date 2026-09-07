import type { ReactNode } from "react";

import { requireCurrentUserSubscriptionPlan } from "@/lib/subscription/subscription";
import { SubscriptionPlan } from "@/types/database";

type SubscribedLayoutProps = {
  children: ReactNode;
};

const SubscribedLayout = async ({ children }: SubscribedLayoutProps) => {
  await requireCurrentUserSubscriptionPlan(SubscriptionPlan.Basic);

  return children;
};

export default SubscribedLayout;
