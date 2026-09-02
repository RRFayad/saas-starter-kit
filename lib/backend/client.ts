"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

import { getEnvVar } from "@/lib/utils";

const backendUrl = getEnvVar("BACKEND_URL");

export const backendClient = axios.create({
  baseURL: backendUrl,
});

export const getAuthenticatedBackendClient = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    throw new Error("Unable to retrieve Clerk session token");
  }

  return axios.create({
    baseURL: backendUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
