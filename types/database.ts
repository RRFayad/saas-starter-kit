import type { users } from "@/lib/db/schema";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export enum SubscriptionPlan {
  Basic = "basic",
  Premium = "premium",
  AllIn = "all_in",
}
