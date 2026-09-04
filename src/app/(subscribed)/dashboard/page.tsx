import { Dashboard } from "@/components/dashboard";
import { getHealthStatus } from "@/lib/backend/system";
import { getDashboardData } from "@/lib/backend/dashboard";

const DashboardPage = async () => {
  const healthStatus = await getHealthStatus();
  const dashboardData = await getDashboardData();

  return (
    <Dashboard healthStatus={healthStatus} dashboardData={dashboardData} />
  );
};

export default DashboardPage;
