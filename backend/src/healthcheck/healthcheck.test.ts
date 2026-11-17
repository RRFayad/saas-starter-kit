import { afterAll, beforeAll, expect, it } from "vitest";

import { startApi } from "../testing/api";

let api: Awaited<ReturnType<typeof startApi>>;

beforeAll(async () => {
  api = await startApi();
});

afterAll(async () => {
  await api.close();
});

it("answers a signed-out request", async () => {
  const response = await api.as().get("/healthcheck");

  expect(response.status).toBe(200);
  expect(response.data).toEqual({ status: "OK" });
});

it("answers an unknown route with 404 and { detail }", async () => {
  const response = await api.as().get("/nope");

  expect(response.status).toBe(404);
  expect(response.data).toEqual({ detail: "Not found" });
});
