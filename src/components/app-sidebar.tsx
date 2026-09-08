"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  CreditCardIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  UserRoundIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { tw } from "@/lib/utils";

const workspaceNavigation = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
];

const settingsNavigation = [
  {
    title: "Account",
    href: "/account",
    icon: UserRoundIcon,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCardIcon,
  },
];

const styles = {
  brand: tw(
    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold",
  ),
  brandIcon: tw("size-4 text-primary"),
  brandLabel: tw("truncate group-data-[collapsible=icon]:hidden"),
  account: tw("flex items-center gap-2 rounded-md px-2 py-1.5"),
  accountContent: tw("min-w-0 group-data-[collapsible=icon]:hidden"),
  accountLabel: tw("truncate text-sm font-medium text-sidebar-foreground"),
  accountEmail: tw("mt-0.5 truncate text-xs text-sidebar-foreground/60"),
};

export const AppSidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const accountName = user?.fullName ?? user?.firstName ?? "Signed in";
  const accountEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className={styles.brand}>
          <SparklesIcon className={styles.brandIcon} />
          <span className={styles.brandLabel}>SaaS Starter Kit</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceNavigation.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    render={<Link href={item.href} />}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {settingsNavigation.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  render={<Link href={item.href} />}
                  tooltip={item.title}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarFooter>
        <div className={styles.account}>
          <UserButton />
          <div className={styles.accountContent}>
            <p className={styles.accountLabel}>{accountName}</p>
            {accountEmail && (
              <p className={styles.accountEmail}>{accountEmail}</p>
            )}
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
