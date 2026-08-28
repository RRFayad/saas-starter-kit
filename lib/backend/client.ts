"use server";

import axios from "axios";

const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
  throw new Error("BACKEND_URL environment variable is not set");
}

export const backendClient = axios.create({
  baseURL: backendUrl,
});
