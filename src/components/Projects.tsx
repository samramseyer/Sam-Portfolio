import { useMemo, useState, type ReactNode } from "react";
import { siteConfig } from "../config/site";
import {
  formatRelativeDate,
  languageColor,
  type GitHubRepo,
} from "../services/github";
import { SectionHeading } from "./About";

interface ProjectsProps {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

type Filter = "all" | "personal" | "organization";

export function Projects({ repos, loading, error }: ProjectsProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredRepos = useMemo(() => {
    if (filter === "personal") {
      return repos.filter((repo) => repo.owner.login === siteConfig.githubUsername);
    }
    if (filter === "organization") {
      return repos.filter((repo) => repo.owner.type === "Organization");
    }
    return repos;
  }, [repos, filter]);

  const orgCount = repos.filter((repo) => repo.owner.type === "Organization").length;

  return (
    <section id="projects" className="section-projects px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Live from GitHub"
          description="Repositories pulled directly from my profile and configured organizations, updated automatically."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            All ({repos.length})
          </FilterButton>
          <FilterButton
            active={filter === "personal"}
            onClick={() => setFilter("personal")}
          >
            Personal
          </FilterButton>
          {siteConfig.organizations.length > 0 && (
            <FilterButton
              active={filter === "organization"}
              onClick={() => setFilter("organization")}
            >
              Organization ({orgCount})
            </FilterButton>
          )}
        </div>

        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-2xl border border-border bg-surface-overlay"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="mt-12 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
            <p className="font-medium">Could not load projects</p>
            <p className="mt-2 text-sm opacity-80">{error}</p>
          </div>
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <div className="mt-12 rounded-2xl border border-border bg-surface-overlay p-8 text-center text-muted">
            No projects found for this filter.
            {siteConfig.organizations.length === 0 && (
              <p className="mt-3 text-sm">
                Add organization slugs in{" "}
                <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-craft-light">
                  src/config/site.ts
                </code>{" "}
                to include org repos.
              </p>
            )}
          </div>
        )}

        {!loading && !error && filteredRepos.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
        active ? "filter-active" : "filter-idle"
      }`}
    >
      {children}
    </button>
  );
}

function getDemoUrl(repo: GitHubRepo): string | null {
  if (repo.homepage) return repo.homepage;
  if (repo.has_pages) {
    return `https://${repo.owner.login}.github.io/${repo.name}/`;
  }
  return null;
}

function ProjectCard({ repo }: { repo: GitHubRepo }) {
  const isOrg = repo.owner.type === "Organization";
  const demoUrl = getDemoUrl(repo);

  return (
    <article className="panel-card group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-craft/10">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display font-semibold text-sand group-hover:text-craft-light">
            {repo.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted">
            {isOrg ? (
              <span className="text-service-light">org / {repo.owner.login}</span>
            ) : (
              <span>@{repo.owner.login}</span>
            )}
          </p>
        </div>
        {repo.language && (
          <span
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: languageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
      </div>

      <p className="prose-block mb-6 flex-1 text-sm text-muted line-clamp-3">
        {repo.description || "No description provided."}
      </p>

      <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted">
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
        <span>{formatRelativeDate(repo.updated_at)}</span>
        {repo.fork && <span className="text-craft-light">Fork</span>}
      </div>

      <div className="flex gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-4 py-2 text-sm"
        >
          View Code
        </a>
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-4 py-2 text-sm"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
