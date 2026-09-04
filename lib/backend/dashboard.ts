"use server";
import axios from "axios";

import { getAuthenticatedBackendClient } from "./client";

export type DashboardData = {
  dashboard: string;
};

export const getDashboardData = async (): Promise<DashboardData | null> => {
  try {
    const backendClient = await getAuthenticatedBackendClient();
    const response = await backendClient.get<DashboardData>("/dashboard");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to load dashboard data", error.message);
      return null;
    }

    throw error;
  }
};
