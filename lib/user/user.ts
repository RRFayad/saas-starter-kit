import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import type { User } from "@/types/database";

export const getUserByClerkId = async (
  clerkId: string,
): Promise<User | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  return user ?? null;
};

export const addStripeCustomerIdToUserDb = async (
  user: User,
  stripeCustomerId: string,
): Promise<User> => {
  const [updatedUser] = await db
    .update(users)
    .set({ stripeCustomerId })
    .where(eq(users.id, user.id))
    .returning();

  return updatedUser;
};
