import { siteConfig } from "../config/site";

export function FeaturedProjectDemo() {
  const project = siteConfig.featuredProject;

  return (
    <div
      className="animate-fade-up mx-auto w-full max-w-lg lg:mx-0"
      style={{ animationDelay: "0.15s" }}
    >
      <div className="demo-shell">
        <div className="demo-chrome">
          <div className="demo-dots">
            <span />
            <span />
            <span />
          </div>
          <p className="demo-url">{project.demoUrl.replace("https://", "")}</p>
          <span className="demo-live">Live</span>
        </div>

        <div className="demo-viewport">
          <iframe
            src={project.demoUrl}
            title={`${project.name} live demo`}
            className="demo-iframe"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        <div className="demo-footer">
          <div>
            <p className="font-display text-sm font-semibold leading-snug text-sand">{project.name}</p>
            <p className="prose-block mt-2 text-xs text-muted">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-accent-glow">
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
        </div>
      </div>
    </div>
  );
}
