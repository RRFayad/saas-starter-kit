import type { ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site-config";
import { requireCurrentUserSubscriptionPlan } from "@/lib/subscription/subscription";
import { SubscriptionPlan } from "@/types/database";
import { tw } from "@/lib/utils";

type SubscribedLayoutProps = {
  children: ReactNode;
};

const styles = {
  inset: tw("min-h-svh"),
  header: tw("flex h-14 items-center justify-between border-b px-4 lg:px-6"),
  content: tw("flex-1 p-4 lg:p-6"),
};

const SubscribedLayout = async ({ children }: SubscribedLayoutProps) => {
  await requireCurrentUserSubscriptionPlan(SubscriptionPlan.Basic);

  return (
    <SidebarProvider>
      <AppSidebar githubUrl={siteConfig.github} />
      <SidebarInset className={styles.inset}>
        <header className={styles.header}>
          <SidebarTrigger />
          <ThemeToggle />
        </header>
        <div className={styles.content}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SubscribedLayout;
