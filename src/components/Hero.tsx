import { siteConfig } from "../config/site";
import { FeaturedProjectDemo } from "./FeaturedProjectDemo";
import type { GitHubProfile } from "../services/github";

interface HeroProps {
  profile: GitHubProfile | null;
}

function HeroCornerAccent({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1">
        <line x1="8" y1="22" x2="88" y2="22" opacity="0.45" />
        <line x1="8" y1="34" x2="72" y2="34" opacity="0.38" />
        <line x1="8" y1="46" x2="56" y2="46" opacity="0.32" />
        <line x1="8" y1="58" x2="40" y2="58" opacity="0.26" />
        <line x1="8" y1="70" x2="28" y2="70" opacity="0.2" />
      </g>
      <g fill="currentColor">
        {Array.from({ length: 20 }).map((_, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          return (
            <circle
              key={index}
              cx={98 + col * 7}
              cy={16 + row * 7}
              r="1.35"
              opacity={0.22 + (index % 5) * 0.06}
            />
          );
        })}
      </g>
    </svg>
  );
}

function HeroCodeOrbit() {
  return (
    <div className="hero-orbit" aria-hidden>
      <svg className="hero-orbit-svg" viewBox="0 0 480 480" fill="none">
        <circle cx="240" cy="240" r="228" stroke="currentColor" strokeWidth="1" opacity="0.1" />
        <circle cx="240" cy="240" r="196" stroke="currentColor" strokeWidth="1" opacity="0.14" />
        <circle cx="240" cy="240" r="164" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        <circle cx="240" cy="240" r="132" stroke="currentColor" strokeWidth="1" opacity="0.24" />
        <circle cx="240" cy="240" r="100" stroke="currentColor" strokeWidth="1" opacity="0.32" />
        <circle cx="240" cy="240" r="68" stroke="currentColor" strokeWidth="1" opacity="0.42" />
      </svg>
      <span className="hero-orbit-code">&lt;/&gt;</span>
    </div>
  );
}

export function Hero({ profile }: HeroProps) {
  const eyebrowParts = siteConfig.heroEyebrow.split(" · ");
  const sublineParts = siteConfig.heroSubline.split(" · ");

  return (
    <section className="hero-ref">
      <HeroCornerAccent className="hero-corner hero-corner-tr" />
      <HeroCornerAccent className="hero-corner hero-corner-bl" />

      <div className="hero-ref-inner">
        <div className="hero-ref-grid">
          <div className="hero-ref-content animate-fade-up">
            <p className="hero-ref-eyebrow">
              {eyebrowParts.map((part, index) => (
                <span key={part}>
                  {index > 0 && (
                    <span className="hero-ref-bullet" aria-hidden>
                      •
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </p>

            <h1 className="hero-ref-name">{siteConfig.name}</h1>

            <p className="hero-ref-role">{siteConfig.heroRole}</p>

            <p className="hero-ref-subline">
              {sublineParts.map((part, index) => (
                <span key={part}>
                  {index > 0 && (
                    <span className="hero-ref-bullet" aria-hidden>
                      •
                    </span>
                  )}
                  {part}
                  {index < sublineParts.length - 1 ? " " : ""}
                </span>
              ))}
            </p>

            <div className="hero-ref-actions">
              <a href="#projects" className="btn-primary px-6 py-3 text-sm">
                View Projects
              </a>
              <a href="#contact" className="btn-secondary px-6 py-3 text-sm">
                Get in Touch
              </a>
            </div>

            {profile && (
              <p className="hero-ref-meta">
                <strong>{profile.public_repos}</strong> public repos on GitHub
              </p>
            )}
          </div>

          <div className="hero-ref-visual animate-fade-up" style={{ animationDelay: "0.12s" }}>
            <HeroCodeOrbit />
            <FeaturedProjectDemo variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
