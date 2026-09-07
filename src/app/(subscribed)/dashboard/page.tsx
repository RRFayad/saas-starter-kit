import { Dashboard } from "@/components/dashboard";
import { getHealthStatus } from "@/lib/backend/system";
import { getDashboardData } from "@/lib/backend/dashboard";
import { requireCurrentUserSubscriptionPlan } from "@/lib/subscription/subscription";
import { SubscriptionPlan } from "@/types/database";

const DashboardPage = async () => {
  await requireCurrentUserSubscriptionPlan(SubscriptionPlan.Basic);

  const healthStatus = await getHealthStatus();
  const dashboardData = await getDashboardData();

  return (
    <Dashboard healthStatus={healthStatus} dashboardData={dashboardData} />
  );
};

export default DashboardPage;
