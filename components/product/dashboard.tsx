"use client";

import { UserButton } from "@clerk/nextjs";

import type { User } from "@/types/user";

type DashboardProps = {
  user: User;
  userId: string;
};

export const Dashboard = ({ user, userId }: DashboardProps) => {
  return (
    <>
      <h1>Dashboard - Authenticated!</h1>
      <p>Clerk Authenticated! - {userId}</p>
      <UserButton />
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </>
  );
};
