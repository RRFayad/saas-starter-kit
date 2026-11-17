"use server";

import type { GetDashboardResponse } from "@app/shared/schemas";

import { fetchBackendData } from "./client";

// Sample endpoint; its response shape is defined in @app/shared/schemas.
export const fetchDashboardData =
  async (): Promise<GetDashboardResponse | null> => {
    return fetchBackendData<GetDashboardResponse>("/dashboard");
  };
