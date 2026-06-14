import { siteConfig } from "../config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-raised/80 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {siteConfig.name}. Carpenter · Veteran · Developer.
        </p>
        <p className="font-mono text-xs text-service-light/80">Projects synced from GitHub</p>
      </div>
    </footer>
  );
}
