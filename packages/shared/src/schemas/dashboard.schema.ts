import { z } from "zod";

// Sample endpoint: delete this file with the dashboard feature.

export const dashboardMetricIconSchema = z.enum([
  "revenue",
  "customers",
  "conversion",
  "refunds",
]);

export const dashboardResponseSchema = z.object({
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

export type DashboardMetricIcon = z.infer<typeof dashboardMetricIconSchema>;
export type DashboardResponse = z.infer<typeof dashboardResponseSchema>;
