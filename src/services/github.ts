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

// Dev uses the Vite proxy (/api/github) for reliable headers and fewer CORS edge cases.
const GITHUB_API = import.meta.env.DEV ? "/api/github" : "https://api.github.com";
const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_PREFIX = "github-cache:";

function hasToken(): boolean {
  return Boolean(import.meta.env.VITE_GITHUB_TOKEN);
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function getCached<T>(url: string): T | null {
  try {
    const raw = sessionStorage.getItem(`${CACHE_PREFIX}${url}`);
    if (!raw) return null;

    const { expires, data } = JSON.parse(raw) as { expires: number; data: T };
    if (Date.now() > expires) {
      sessionStorage.removeItem(`${CACHE_PREFIX}${url}`);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCached<T>(url: string, data: T): void {
  try {
    sessionStorage.setItem(
      `${CACHE_PREFIX}${url}`,
      JSON.stringify({ expires: Date.now() + CACHE_TTL_MS, data }),
    );
  } catch {
    // Ignore quota errors — cache is optional.
  }
}

async function parseGitHubError(response: Response): Promise<string> {
  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = response.headers.get("x-ratelimit-reset");

  if (response.status === 403 && remaining === "0") {
    const resetTime = reset
      ? new Date(Number(reset) * 1000).toLocaleTimeString()
      : "soon";
    return `GitHub API rate limit exceeded. Resets around ${resetTime}. Add VITE_GITHUB_TOKEN in .env for higher limits.`;
  }

  if (response.status === 401) {
    return "GitHub API authentication failed. Check VITE_GITHUB_TOKEN in .env.";
  }

  if (response.status === 404) {
    return "GitHub API resource not found. Check githubUsername and organization slugs in site config.";
  }

  try {
    const body = (await response.json()) as { message?: string };
    if (body.message) {
      return `GitHub API error (${response.status}): ${body.message}`;
    }
  } catch {
    // Response body was not JSON.
  }

  return `GitHub API error (${response.status})`;
}

async function githubFetch(url: string): Promise<Response> {
  const response = await fetch(url, { headers: authHeaders() });

  if (!response.ok) {
    throw new Error(await parseGitHubError(response));
  }

  return response;
}

async function fetchJson<T>(url: string): Promise<T> {
  const cached = getCached<T>(url);
  if (cached) return cached;

  const response = await githubFetch(url);
  const data = (await response.json()) as T;
  setCached(url, data);
  return data;
}

async function fetchAllPages<T>(url: string, maxPages = 3): Promise<T[]> {
  const cached = getCached<T[]>(url);
  if (cached) return cached;

  const results: T[] = [];
  let nextUrl: string | null = url;

  for (let page = 0; page < maxPages && nextUrl; page++) {
    const response = await githubFetch(nextUrl);
    const pageData = (await response.json()) as T[];
    results.push(...pageData);

    const linkHeader = response.headers.get("Link");
    nextUrl = parseNextLink(linkHeader);
  }

  setCached(url, results);
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
  const nextUrl = urlMatch?.[1] ?? null;
  if (!nextUrl) return null;

  // Keep paginated requests on the dev proxy when GitHub returns absolute URLs.
  if (import.meta.env.DEV && nextUrl.startsWith("https://api.github.com")) {
    return nextUrl.replace("https://api.github.com", "/api/github");
  }

  return nextUrl;
}

function isHidden(name: string): boolean {
  const hidden = siteConfig.hiddenRepos.map((repo) => repo.toLowerCase());
  return hidden.includes(name.toLowerCase());
}

function mergeRepos(repoLists: GitHubRepo[][]): GitHubRepo[] {
  const merged = new Map<number, GitHubRepo>();

  for (const repo of repoLists.flat()) {
    if (isHidden(repo.name)) continue;
    merged.set(repo.id, repo);
  }

  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  if (hasToken()) {
    return fetchJson<GitHubProfile>(`${GITHUB_API}/user`);
  }

  return fetchJson<GitHubProfile>(`${GITHUB_API}/users/${siteConfig.githubUsername}`);
}

export async function fetchUserRepos(): Promise<GitHubRepo[]> {
  if (hasToken()) {
    const url = `${GITHUB_API}/user/repos?affiliation=owner,organization_member,collaborator&per_page=100&sort=updated&direction=desc`;
    return fetchAllPages<GitHubRepo>(url);
  }

  const url = `${GITHUB_API}/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated&direction=desc`;
  return fetchAllPages<GitHubRepo>(url);
}

export async function fetchOrgRepos(org: string): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API}/orgs/${org}/repos?per_page=100&sort=updated&direction=desc&type=public`;
  return fetchAllPages<GitHubRepo>(url);
}

export async function fetchAllProjects(): Promise<GitHubRepo[]> {
  const results = await Promise.allSettled([
    fetchUserRepos(),
    ...siteConfig.organizations.map((org) => fetchOrgRepos(org)),
  ]);

  const repoLists: GitHubRepo[][] = [];
  const errors: string[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      repoLists.push(result.value);
    } else {
      errors.push(result.reason instanceof Error ? result.reason.message : String(result.reason));
    }
  }

  const repos = mergeRepos(repoLists);
  if (repos.length === 0 && errors.length > 0) {
    throw new Error(errors[0]);
  }

  return repos;
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

function findProjectOverride(repo: GitHubRepo) {
  const key = Object.keys(siteConfig.projectOverrides).find(
    (name) => name.toLowerCase() === repo.name.toLowerCase(),
  );

  return key ? siteConfig.projectOverrides[key] : undefined;
}

export function getProjectTitle(repo: GitHubRepo): string {
  return findProjectOverride(repo)?.title ?? repo.name;
}

export function getProjectDescription(repo: GitHubRepo): string {
  const override = findProjectOverride(repo);
  if (override) return override.description;

  const githubDescription = repo.description?.trim();
  if (githubDescription) return githubDescription;

  if (repo.language) {
    return `${repo.language} project from my GitHub portfolio — open the repo to explore the code.`;
  }

  return "Personal development project — open the repo to explore the code and README.";
}
