"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type RedirectAfterDelayProps = {
  href: string;
  delayMilliseconds?: number;
};

export const RedirectAfterDelay = ({
  href,
  delayMilliseconds = 5000,
}: RedirectAfterDelayProps) => {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.replace(href);
    }, delayMilliseconds);

    return () => window.clearTimeout(timeoutId);
  }, [delayMilliseconds, href, router]);

  return null;
};
