import type { HealthStatus } from "@/lib/backend/system";

type DashboardProps = {
  healthStatus: HealthStatus;
};

export const Dashboard = ({ healthStatus }: DashboardProps) => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>FastAPI health status: {healthStatus.status}</p>
    </>
  );
};
