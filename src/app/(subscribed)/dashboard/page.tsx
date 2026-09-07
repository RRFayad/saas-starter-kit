import { Overview } from "@/components/app/overview";
import { requireCurrentUserSubscriptionPlan } from "@/lib/subscription/subscription";
import { SubscriptionPlan } from "@/types/database";

const DashboardPage = async () => {
  await requireCurrentUserSubscriptionPlan(SubscriptionPlan.Basic);

  return <Overview />;
};

export default DashboardPage;
