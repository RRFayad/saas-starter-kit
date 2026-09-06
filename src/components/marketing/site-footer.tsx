import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const groups = [
  {
    title: "Explore",
    links: [
      { text: "Live Demo", href: "/" },
      { text: "Pricing", href: "/pricing" },
      { text: "FAQ", href: "/#faq" },
    ],
  },
  ...(siteConfig.github
    ? [
        {
          title: "Resources",
          links: [
            { text: "GitHub", href: siteConfig.github },
            {
              text: "README",
              href: `${siteConfig.github}/blob/main/README.md`,
            },
          ],
        },
      ]
    : []),
];

const styles = {
  footer: "border-t border-border/40 py-14",
  content: "mx-auto grid max-w-6xl gap-10 px-4 lg:px-8",
  contentWithResources: "md:grid-cols-[1.6fr_1fr_1fr]",
  contentWithoutResources: "md:grid-cols-[1.6fr_1fr]",
  brand: "font-semibold",
  description: "mt-3 max-w-xs text-sm text-muted-foreground",
  groupTitle: "text-sm font-semibold",
  links: "mt-4 space-y-2.5 text-sm text-muted-foreground",
  link: "transition-colors hover:text-foreground",
  footerBar:
    "mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-border/40 px-4 pt-6 text-xs text-muted-foreground md:flex-row lg:px-8",
};

export const SiteFooter = () => {
  const contentStyles = `${styles.content} ${
    siteConfig.github
      ? styles.contentWithResources
      : styles.contentWithoutResources
  }`;

  return (
    <footer className={styles.footer}>
      <div className={contentStyles}>
        <div>
          <Link href="/" className={styles.brand}>
            SaaS Starter Kit
          </Link>
          <p className={styles.description}>
            A full-stack foundation for building and shipping modern SaaS
            products.
          </p>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <ul className={styles.links}>
              {group.links.map((link) => (
                <li key={link.text}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} rel="noopener" className={styles.link}>
                      {link.text}
                    </a>
                  ) : (
                    <Link href={link.href} className={styles.link}>
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={styles.footerBar}>
        <span>© 2026 Renan Fayad</span>
        {siteConfig.github && (
          <a
            href={siteConfig.github}
            aria-label="GitHub"
            rel="noopener"
            target="_blank"
            className={styles.link}
          >
            GitHub
          </a>
        )}
      </div>
    </footer>
  );
};
