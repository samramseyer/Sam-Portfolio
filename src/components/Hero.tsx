import { siteConfig } from "../config/site";
import type { GitHubProfile } from "../services/github";
import { FeaturedProjectDemo } from "./FeaturedProjectDemo";

interface HeroProps {
  profile: GitHubProfile | null;
}

const badgeClass = {
  craft: "badge-craft",
  edu: "badge-edu",
  army: "badge-army",
} as const;

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse-glow absolute -right-24 top-20 h-72 w-72 rounded-full bg-craft/15 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-service/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="animate-fade-up space-y-7">
          <p className="eyebrow">{siteConfig.heroEyebrow}</p>

          <h1 className="text-4xl font-bold leading-[1.12] text-sand sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-gradient-hero">{siteConfig.name}</span>
          </h1>

          <p className="prose-block max-w-2xl text-lg text-muted">{siteConfig.tagline}</p>

          <div className="flex flex-wrap gap-x-2 gap-y-2.5">
            {siteConfig.heroBadges.map((badge) => (
              <span
                key={badge.label}
                className={`hero-badge ${badgeClass[badge.style]}`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#projects" className="btn-primary px-6 py-3 text-sm">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary px-6 py-3 text-sm">
              Get in Touch
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-6 py-3 text-sm"
            >
              @{siteConfig.githubUsername}
            </a>
          </div>

          {profile && (
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted">
              <span>
                <strong className="text-sand">{profile.public_repos}</strong> public repos
              </span>
              <span>
                <strong className="text-sand">{profile.followers}</strong> followers
              </span>
            </div>
          )}
        </div>

        <FeaturedProjectDemo />
      </div>
    </section>
  );
}
