"use server";
import axios from "axios";

import { fetchBackendData } from "./client";

export type DashboardData = {
  dashboard: string;
};

export const getDashboardData = async () => {
  return fetchBackendData<DashboardData>("/dashboard");
};
