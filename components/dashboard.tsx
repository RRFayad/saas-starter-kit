import type { DashboardData } from "@/lib/backend/dashboard";
import type { HealthStatus } from "@/lib/backend/system";

type DashboardProps = {
  healthStatus: HealthStatus;
  dashboardData: DashboardData | null;
};

export const Dashboard = ({ healthStatus, dashboardData }: DashboardProps) => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>FastAPI health status: {healthStatus.status}</p>
      {dashboardData && (
        <p>Dashboard Protected Data: {dashboardData.dashboard}</p>
      )}
    </>
  );
};
