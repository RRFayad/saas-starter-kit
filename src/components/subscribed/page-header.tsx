import type { ReactNode } from "react";

import { tw } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
};

const styles = {
  wrapper: tw("flex flex-col justify-between gap-4 sm:flex-row sm:items-end"),
  eyebrow: tw("text-sm font-medium text-primary"),
  title: tw("mt-1 text-3xl font-semibold tracking-tight"),
  description: tw("mt-2 max-w-6xl text-sm text-muted-foreground"),
  action: tw("w-fit"),
};

export const PageHeader = ({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </section>
  );
};
