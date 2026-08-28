"use server";

import { User } from "@/types/user";
import { backendClient } from "./client";

export const getUser = async (): Promise<User | null> => {
  const response = await backendClient.get<User | null>("/user");
  return response.data;
};
