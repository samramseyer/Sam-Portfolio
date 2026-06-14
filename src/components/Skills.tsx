import { siteConfig } from "../config/site";
import { SectionHeading } from "./About";

const themeStyles = {
  dev: {
    card: "hover:border-accent/40 hover:shadow-accent/10",
    badge: "border-accent/30 bg-accent/10 text-accent-glow",
    dot: "bg-accent",
    label: "text-accent-glow",
  },
  craft: {
    card: "hover:border-craft/40 hover:shadow-craft/10",
    badge: "border-craft/30 bg-craft/10 text-craft-light",
    dot: "bg-craft-light",
    label: "text-craft-light",
  },
  service: {
    card: "hover:border-service-light/40 hover:shadow-service/10",
    badge: "border-service-light/30 bg-service/20 text-service-light",
    dot: "bg-service-light",
    label: "text-service-light",
  },
} as const;

export function Skills() {
  return (
    <section id="skills" className="section-workshop px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={siteConfig.sectionCopy.skillsEyebrow}
          title={siteConfig.sectionCopy.skillsTitle}
          description={siteConfig.sectionCopy.skillsDescription}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.journey.map((step) => (
            <div key={step.title} className="journey-card rounded-2xl border p-6">
              <p className="font-mono text-xs uppercase tracking-wider leading-normal text-craft-light">
                {step.year}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-sand">
                {step.title}
              </h3>
              <p className="prose-block mt-3 text-sm text-muted">{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {siteConfig.skills.map((group) => {
            const theme = themeStyles[group.theme as keyof typeof themeStyles];

            return (
              <article
                key={group.category}
                className={`skill-card rounded-2xl border border-border p-6 transition hover:-translate-y-1 hover:shadow-lg ${theme.card}`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                  <h3 className={`font-display font-semibold ${theme.label}`}>{group.category}</h3>
                </div>

                <p className="prose-block mb-6 text-sm text-muted">{group.description}</p>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className={`rounded-lg border px-3 py-2 font-mono text-xs leading-normal ${theme.badge}`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
