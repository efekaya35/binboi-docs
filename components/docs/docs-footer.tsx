import Link from "next/link";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.369A19.791 19.791 0 0015.558 3c-.207.375-.45.88-.617 1.275a18.27 18.27 0 00-5.882 0A12.64 12.64 0 008.442 3a19.736 19.736 0 00-4.76 1.369C.533 9.046-.32 13.58.106 18.057A19.9 19.9 0 006 21a14.32 14.32 0 001.273-2.05 12.93 12.93 0 01-2.004-.97c.168-.123.332-.252.49-.387 3.863 1.808 8.054 1.808 11.872 0 .16.135.324.264.492.387a12.88 12.88 0 01-2.006.971A14.19 14.19 0 0018.39 21a19.86 19.86 0 005.895-2.943c.5-5.187-.838-9.68-3.968-13.688zM8.02 15.331c-1.154 0-2.101-1.055-2.101-2.35 0-1.296.928-2.351 2.1-2.351 1.183 0 2.12 1.064 2.101 2.35 0 1.296-.928 2.351-2.1 2.351zm7.96 0c-1.154 0-2.101-1.055-2.101-2.35 0-1.296.928-2.351 2.1-2.351 1.183 0 2.12 1.064 2.101 2.35 0 1.296-.928 2.351-2.1 2.351z" />
    </svg>
  );
}

const productLinks = [
  { label: "Introduction", href: "/docs/introduction" },
  { label: "Quick Start", href: "/docs/quick_start" },
  { label: "Installation", href: "/docs/installation" },
  { label: "HTTP Tunnels", href: "/docs/http_tunnels" },
];

const resourcesLinks = [
  { label: "Documentation", href: "/docs/introduction" },
  { label: "CLI Reference", href: "/docs/cli" },
  { label: "Troubleshooting", href: "/docs/troubleshooting" },
  { label: "Changelog", href: "/changelog" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "GitHub", href: "https://github.com/Miransas/binboi", external: true },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "License", href: "/license" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="space-y-4">
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-white/5 blur-3xl opacity-20" />
      </div> */}
      <p className="text-sm font-medium text-white/35">{title}</p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-[15px] text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DocsFooter() {
  return (
    <footer className="mt-28 border-t border-white/[0.06] bg-black">
        <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-white/5 blur-3xl opacity-20" />
      </div>
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr] lg:gap-16">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-white">
                binboi
              </span>
              <span className="rounded border border-white/[0.08] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
                docs
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-white/50">
              Self-hosted tunnels for developers. Expose local services to the
              internet with automatic HTTPS and clean request debugging.
            </p>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Resources" links={resourcesLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} Miransas. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://x.com/miransas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Miransas on X"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white"
            >
              <XIcon className="h-4.5 w-4.5" />
            </a>

            <a
              href="https://github.com/Miransas/binboi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Binboi on GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white"
            >
              <GithubIcon className="h-4.5 w-4.5" />
            </a>

            <a
              href="https://discord.gg/your-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Binboi on Discord"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white"
            >
              <DiscordIcon className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}