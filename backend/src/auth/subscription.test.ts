import Fastify from "fastify";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { createSubscription, createUser, startApi } from "../testing/api";
import { authenticate } from "./authenticate";
import { requireSubscriptionPlan } from "./subscription";

// A test-only route behind requireSubscriptionPlan("premium"), since the sample
// /dashboard only needs basic. It returns request.subscription's plan.
const createPremiumApp = () => {
  const app = Fastify({ logger: false });

  app.decorateRequest("user");
  app.decorateRequest("subscription");
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireSubscriptionPlan("premium"));
  app.get("/premium", async (request) => ({
    plan: request.subscription?.plan ?? null,
  }));

  return app;
};

let api: Awaited<ReturnType<typeof startApi>>;
let premiumApi: Awaited<ReturnType<typeof startApi>>;

beforeAll(async () => {
  api = await startApi();
  premiumApi = await startApi(createPremiumApp());
});

afterAll(async () => {
  await api.close();
  await premiumApi.close();
});

describe("billing off", () => {
  it("lets every signed-in user in, with no subscription", async () => {
    await createUser("reader");

    const response = await premiumApi.as("reader").get("/premium");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ plan: null });
  });
});

describe("billing on", () => {
  beforeEach(() => {
    vi.stubEnv("BILLING_ENABLED", "true");
  });

  it("refuses a user with no subscription", async () => {
    await createUser("reader");

    const response = await premiumApi.as("reader").get("/premium");

    expect(response.status).toBe(403);
    expect(response.data).toEqual({
      detail: "An active subscription is required",
    });
  });

  it("refuses an inactive subscription", async () => {
    const user = await createUser("reader");
    await createSubscription(user.id, "premium", "canceled");

    const response = await premiumApi.as("reader").get("/premium");

    expect(response.status).toBe(403);
    expect(response.data).toEqual({
      detail: "An active subscription is required",
    });
  });

  it("refuses a plan below the required one", async () => {
    const user = await createUser("reader");
    await createSubscription(user.id, "basic");

    const response = await premiumApi.as("reader").get("/premium");

    expect(response.status).toBe(403);
    expect(response.data).toEqual({ detail: "The premium plan is required" });
  });

  it.each([
    ["premium", "active"],
    ["premium", "trialing"],
    ["all_in", "active"],
  ] as const)(
    "lets in an %s plan that is %s, as request.subscription",
    async (plan, status) => {
      const user = await createUser("reader");
      await createSubscription(user.id, plan, status);

      const response = await premiumApi.as("reader").get("/premium");

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ plan });
    },
  );

  it("guards the real subscribed routes", async () => {
    const user = await createUser("reader");

    const refused = await api.as("reader").get("/dashboard");
    await createSubscription(user.id, "basic");
    const allowed = await api.as("reader").get("/dashboard");

    expect(refused.status).toBe(403);
    expect(allowed.status).toBe(200);
  });
});
