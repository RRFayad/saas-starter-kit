"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  CreditCardIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  StarIcon,
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

const navigation = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCardIcon,
  },
  {
    title: "Account",
    href: "/account",
    icon: UserRoundIcon,
  },
];

type AppSidebarProps = {
  githubUrl: string;
};

const styles = {
  brand: tw(
    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold",
  ),
  brandIcon: tw("size-4 text-primary"),
  brandLabel: tw("truncate group-data-[collapsible=icon]:hidden"),
  account: tw("flex items-center gap-2 rounded-md px-2 py-1.5"),
  accountContent: tw("min-w-0 group-data-[collapsible=icon]:hidden"),
  accountLabel: tw("truncate text-sm font-medium text-sidebar-foreground"),
  accountHint: tw("mt-0.5 text-xs text-sidebar-foreground/60"),
  footerMenu: tw("mt-2"),
  footerIcon: tw("size-4"),
};

export const AppSidebar = ({ githubUrl }: AppSidebarProps) => {
  const pathname = usePathname();

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
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
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
      <SidebarFooter>
        <div className={styles.account}>
          <UserButton />
          <div className={styles.accountContent}>
            <p className={styles.accountLabel}>Account</p>
          </div>
        </div>
        {githubUrl && (
          <SidebarMenu className={styles.footerMenu}>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<a href={githubUrl} rel="noopener" target="_blank" />}
                tooltip="View on GitHub"
              >
                <StarIcon className={styles.footerIcon} />
                <span>View on GitHub</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
