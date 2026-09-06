import Link from "next/link";
import { SparklesIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <SparklesIcon className="size-5 text-primary" />
          Full-Stack SaaS Starter Kit
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link
            href="/components"
            className="transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/themes"
            className="transition-colors hover:text-foreground"
          >
            Sign Up
          </Link>
        </nav>
        <div className="flex items-center gap-2">
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
}
