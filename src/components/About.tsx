import { siteConfig } from "../config/site";

export function About() {
  return (
    <section id="about" className="section-warm px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title={siteConfig.sectionCopy.aboutTitle}
          description={siteConfig.sectionCopy.aboutDescription}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 text-lg text-muted">
            {siteConfig.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="prose-block">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="panel-card p-8">
            <h3 className="eyebrow mb-7 !text-xs">Highlights</h3>
            <ul className="space-y-5">
              {siteConfig.highlights.map((item, index) => (
                <li key={item} className="flex items-start gap-3 text-muted">
                  <span
                    className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      index % 3 === 0
                        ? "bg-craft-light"
                        : index % 3 === 1
                          ? "bg-service-light"
                          : "bg-accent"
                    }`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold leading-snug text-sand sm:text-4xl">{title}</h2>
      {description && <p className="prose-block mt-5 max-w-2xl text-lg text-muted">{description}</p>}
    </div>
  );
}
