"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
  throw new Error("BACKEND_URL environment variable is not set");
}

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
