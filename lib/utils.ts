import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GetEnvVar = {
  (name: string): string;
  (name: string, throwErr: true): string;
  (name: string, throwErr: false): string | null;
};

export const getEnvVar = ((
  name: string,
  throwErr = true,
): string | null => {
  const value = process.env[name];

  if (!value) {
    if (throwErr) {
      throw new Error(`${name} environment variable is not set`);
    }

    return null;
  }

  return value;
}) as GetEnvVar;

export const getErrorMessageAndThrow = (
  logMessage: string,
  error: unknown,
): never => {
  let errorMessage;

  if (error instanceof Error) errorMessage = error.message;
  if (error && typeof error === "object" && "message" in error) {
    errorMessage = String(error.message);
  }
  if (typeof error === "string") errorMessage = error;
  if (!errorMessage) errorMessage = "Unknown error";

  console.error(logMessage, errorMessage);

  throw error;
};
