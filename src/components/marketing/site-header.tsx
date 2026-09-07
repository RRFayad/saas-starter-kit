import Link from "next/link";
import { SparklesIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site-config";

const styles = {
  header:
    "fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl",
  content:
    "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8",
  brand: "flex items-center gap-2 font-semibold",
  brandIcon: "size-5 text-primary",
  navigation: "hidden items-center gap-6 text-sm text-muted-foreground md:flex",
  navigationLink: "transition-colors hover:text-foreground",
  actions: "flex items-center gap-2",
};

export const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.brand}>
          <SparklesIcon className={styles.brandIcon} />
          Full-Stack SaaS Starter Kit
        </Link>
        <nav className={styles.navigation}>
          <Link href="/sign-in" className={styles.navigationLink}>
            Sign In
          </Link>
          <Link href="/sign-up" className={styles.navigationLink}>
            Sign Up
          </Link>
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          {siteConfig.github && (
            <Button variant="outline" size="sm" asChild>
              <a href={siteConfig.github} rel="noopener" target="_blank">
                <StarIcon />
                Github Repo
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
