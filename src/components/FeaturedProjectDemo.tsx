import { siteConfig } from "../config/site";

interface FeaturedProjectDemoProps {
  variant?: "default" | "hero";
}

export function FeaturedProjectDemo({ variant = "default" }: FeaturedProjectDemoProps) {
  const project = siteConfig.featuredProject;
  const isHero = variant === "hero";

  return (
    <div
      className={isHero ? "hero-demo" : "animate-fade-up mx-auto w-full max-w-3xl"}
      style={isHero ? undefined : { animationDelay: "0.15s" }}
    >
      <div className={`demo-shell ${isHero ? "hero-demo-shell" : ""}`}>
        <div className="demo-chrome">
          <div className="demo-dots">
            <span />
            <span />
            <span />
          </div>
          <p className="demo-url">{project.demoUrl.replace("https://", "")}</p>
          <span className="demo-live">Live</span>
        </div>

        <div className={`demo-viewport ${isHero ? "hero-demo-viewport" : ""}`}>
          <iframe
            src={project.demoUrl}
            title={`${project.name} live demo`}
            className="demo-iframe"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        <div className={`demo-footer ${isHero ? "hero-demo-footer" : ""}`}>
          <div>
            <p className="font-display text-sm font-semibold leading-snug text-sand">{project.name}</p>
            {!isHero && <p className="prose-block mt-2 text-xs text-muted">{project.tagline}</p>}
          </div>
          {!isHero && (
            <>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-accent-glow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-3 py-1.5 text-xs"
                >
                  Open Full Demo
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-3 py-1.5 text-xs"
                >
                  View Code
                </a>
              </div>
            </>
          )}
          {isHero && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-accent-glow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-3 py-1.5 text-xs"
              >
                Open demo
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
