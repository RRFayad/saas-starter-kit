"use server";

import type { User } from "@/types/database";
import { getAuthenticatedBackendClient } from "./client";

export const getCurrentUser = async (): Promise<User> => {
  const backendClient = await getAuthenticatedBackendClient();

  const response = await backendClient.get<User>("/user");

  return response.data;
};
