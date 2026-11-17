import { z } from "zod";

// Sample endpoint: delete this file with the dashboard feature.

// ---------- GET /dashboard ----------

export const dashboardMetricIconSchema = z.enum([
  "revenue",
  "customers",
  "conversion",
  "refunds",
]);

export const getDashboardResponseSchema = z.object({
  user_email: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      change: z.string(),
      icon: dashboardMetricIconSchema,
      positive: z.boolean(),
    }),
  ),
  revenue_activity: z.object({
    total: z.string(),
    points: z.array(
      z.object({
        label: z.string(),
        value: z.number(),
      }),
    ),
  }),
  recent_activity: z.array(
    z.object({
      customer: z.string(),
      action: z.string(),
      amount: z.string(),
    }),
  ),
});

// ---------- Types ----------

export type DashboardMetricIcon = z.infer<typeof dashboardMetricIconSchema>;
export type GetDashboardResponse = z.infer<typeof getDashboardResponseSchema>;
