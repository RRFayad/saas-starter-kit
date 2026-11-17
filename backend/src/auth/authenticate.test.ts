import { afterAll, beforeAll, expect, it } from "vitest";

import { createUser, startApi } from "../testing/api";

// Through the sample /dashboard route (billing off), which needs a signed-in user.

let api: Awaited<ReturnType<typeof startApi>>;

beforeAll(async () => {
  api = await startApi();
});

afterAll(async () => {
  await api.close();
});

it("refuses a signed-out request", async () => {
  const response = await api.as().get("/dashboard");

  expect(response.status).toBe(401);
  expect(response.data).toEqual({ detail: "Not authenticated" });
});

it("refuses a signed-in user with no users row", async () => {
  const response = await api.as("stranger").get("/dashboard");

  expect(response.status).toBe(404);
  expect(response.data).toEqual({ detail: "User not found" });
});

it("runs the route as the signed-in user", async () => {
  await createUser("reader");

  const response = await api.as("reader").get("/dashboard");

  expect(response.status).toBe(200);
  expect(response.data.user_email).toBe("reader@example.com");
});
