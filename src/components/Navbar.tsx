import { useEffect, useState } from "react";
import { siteConfig } from "../config/site";

const DESKTOP_NAV_MIN_WIDTH = 1024;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_NAV_MIN_WIDTH}px)`);

    const handleViewportChange = () => {
      if (mediaQuery.matches) setMenuOpen(false);
    };

    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="min-w-0 truncate font-display text-sm font-bold tracking-tight text-sand transition hover:text-craft-light sm:text-base"
          onClick={closeMenu}
        >
          {siteConfig.name}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
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

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hidden px-4 py-2 text-sm lg:inline-flex"
          >
            GitHub
          </a>

          <button
            type="button"
            className="nav-toggle inline-flex lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`nav-toggle-bar ${menuOpen ? "nav-toggle-bar-top-open" : ""}`} />
            <span className={`nav-toggle-bar ${menuOpen ? "nav-toggle-bar-middle-open" : ""}`} />
            <span className={`nav-toggle-bar ${menuOpen ? "nav-toggle-bar-bottom-open" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`nav-mobile lg:hidden ${menuOpen ? "nav-mobile-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
      >
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <div className="nav-mobile-panel">
          <ul className="nav-mobile-links">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-mobile-link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary nav-mobile-github"
            onClick={closeMenu}
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
