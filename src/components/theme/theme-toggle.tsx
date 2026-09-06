"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const styles = {
  sunIcon: "hidden dark:block",
  moonIcon: "dark:hidden",
};

/**
 * Renders both icons and lets CSS pick one, so server and client
 * markup match without a mounted guard.
 */
export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className={styles.sunIcon} />
      <MoonIcon className={styles.moonIcon} />
    </Button>
  );
};
