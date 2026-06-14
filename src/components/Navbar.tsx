import { siteConfig } from "../config/site";

export function Navbar() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display text-sm font-bold tracking-tight text-sand transition hover:text-craft-light"
        >
          {siteConfig.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition hover:text-craft-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary px-4 py-2 text-sm"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
