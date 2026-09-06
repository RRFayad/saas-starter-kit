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

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border/40 py-14">
      <div
        className={`mx-auto grid max-w-6xl gap-10 px-4 lg:px-8 ${
          siteConfig.github
            ? "md:grid-cols-[1.6fr_1fr_1fr]"
            : "md:grid-cols-[1.6fr_1fr]"
        }`}
      >
        <div>
          <Link href="/" className="font-semibold">
            SaaS Starter Kit
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A full-stack foundation for building and shipping modern SaaS
            products.
          </p>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <li key={link.text}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      rel="noopener"
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-border/40 px-4 pt-6 text-xs text-muted-foreground md:flex-row lg:px-8">
        <span>© 2026 Renan Fayad</span>
        {siteConfig.github && (
          <a
            href={siteConfig.github}
            aria-label="GitHub"
            rel="noopener"
            target="_blank"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        )}
      </div>
    </footer>
  );
};
