import { siteConfig } from "../config/site";
import { SectionHeading } from "./About";

export function Contact() {
  return (
    <section id="contact" className="section-warm px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect"
          description="Open to collaboration, freelance work, and full-time opportunities."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <a href={`mailto:${siteConfig.email}`} className="panel-card group p-8 transition">
            <p className="eyebrow !text-xs">Email</p>
            <p className="mt-4 text-xl leading-relaxed font-medium text-sand group-hover:text-craft-light">
              {siteConfig.email}
            </p>
          </a>

          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-card group p-8 transition"
          >
            <p className="eyebrow !text-xs">GitHub</p>
            <p className="mt-4 text-xl leading-relaxed font-medium text-sand group-hover:text-craft-light">
              github.com/{siteConfig.githubUsername}
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
