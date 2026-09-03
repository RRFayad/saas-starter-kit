import { Dashboard } from "@/components/dashboard";
import { getHealthStatus } from "@/lib/backend/system";

const DashboardPage = async () => {
  const healthStatus = await getHealthStatus();

  return <Dashboard healthStatus={healthStatus} />;
};

export default DashboardPage;
