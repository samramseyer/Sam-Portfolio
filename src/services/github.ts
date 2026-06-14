import { siteConfig } from "../config/site";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  topics: string[];
  has_pages: boolean;
  owner: {
    login: string;
    avatar_url: string;
    type: "User" | "Organization";
  };
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

const GITHUB_API = "https://api.github.com";

function authHeaders(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    };
  }
  return { Accept: "application/vnd.github+json" };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: authHeaders() });

  if (!response.ok) {
    throw new Error(`GitHub API error (${response.status}): ${url}`);
  }

  return response.json() as Promise<T>;
}

async function fetchAllPages<T>(url: string, maxPages = 3): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | null = url;

  for (let page = 0; page < maxPages && nextUrl; page++) {
    const response = await fetch(nextUrl, { headers: authHeaders() });

    if (!response.ok) {
      throw new Error(`GitHub API error (${response.status}): ${nextUrl}`);
    }

    const pageData = (await response.json()) as T[];
    results.push(...pageData);

    const linkHeader = response.headers.get("Link");
    nextUrl = parseNextLink(linkHeader);
  }

  return results;
}

function parseNextLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;

  const match = linkHeader
    .split(",")
    .map((part) => part.trim())
    .find((part) => part.includes('rel="next"'));

  if (!match) return null;

  const urlMatch = match.match(/<([^>]+)>/);
  return urlMatch?.[1] ?? null;
}

function isHidden(name: string): boolean {
  const hidden = siteConfig.hiddenRepos.map((repo) => repo.toLowerCase());
  return hidden.includes(name.toLowerCase());
}

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  return fetchJson<GitHubProfile>(`${GITHUB_API}/users/${siteConfig.githubUsername}`);
}

export async function fetchUserRepos(): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API}/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated&direction=desc`;
  return fetchAllPages<GitHubRepo>(url);
}

export async function fetchOrgRepos(org: string): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API}/orgs/${org}/repos?per_page=100&sort=updated&direction=desc&type=public`;
  return fetchAllPages<GitHubRepo>(url);
}

export async function fetchAllProjects(): Promise<GitHubRepo[]> {
  const [profileRepos, ...orgRepoLists] = await Promise.all([
    fetchUserRepos(),
    ...siteConfig.organizations.map((org) => fetchOrgRepos(org)),
  ]);

  const merged = new Map<number, GitHubRepo>();

  for (const repo of [...profileRepos, ...orgRepoLists.flat()]) {
    if (isHidden(repo.name)) continue;
    merged.set(repo.id, repo);
  }

  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 30) return `Updated ${diffDays} days ago`;
  if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
  return `Updated ${Math.floor(diffDays / 365)} years ago`;
}

export function languageColor(language: string | null): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    React: "#61dafb",
    "C#": "#178600",
    Go: "#00ADD8",
    Rust: "#dea584",
  };

  return colors[language ?? ""] ?? "#64748b";
}
