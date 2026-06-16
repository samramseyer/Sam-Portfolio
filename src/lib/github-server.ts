import { siteConfig } from "../config/site";
import type { GitHubProfile, GitHubRepo } from "../services/github";

const GITHUB_API = "https://api.github.com";

function getToken(): string | undefined {
  return process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Sam-Portfolio-Build",
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function githubFetch(url: string): Promise<Response> {
  const response = await fetch(url, { headers: authHeaders() });
  if (!response.ok) {
    throw new Error(`GitHub API error (${response.status}) for ${url}`);
  }
  return response;
}

async function fetchAllPages<T>(url: string, maxPages = 3): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | null = url;

  for (let page = 0; page < maxPages && nextUrl; page++) {
    const response = await githubFetch(nextUrl);
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

function shouldPreferRepo(current: GitHubRepo, candidate: GitHubRepo): boolean {
  if (current.fork && !candidate.fork) return true;
  if (!current.fork && candidate.fork) return false;

  if (current.owner.type === "User" && candidate.owner.type === "Organization") {
    return true;
  }

  if (current.owner.type === "Organization" && candidate.owner.type === "User") {
    return false;
  }

  return new Date(candidate.updated_at).getTime() > new Date(current.updated_at).getTime();
}

function mergeRepos(repoLists: GitHubRepo[][]): GitHubRepo[] {
  const merged = new Map<string, GitHubRepo>();

  for (const repo of repoLists.flat()) {
    if (isHidden(repo.name)) continue;

    const key = repo.name.toLowerCase();
    const existing = merged.get(key);

    if (!existing || shouldPreferRepo(existing, repo)) {
      merged.set(key, repo);
    }
  }

  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

async function fetchGitHubProfile(): Promise<GitHubProfile> {
  if (getToken()) {
    return githubFetch(`${GITHUB_API}/user`).then((response) => response.json());
  }

  return githubFetch(`${GITHUB_API}/users/${siteConfig.githubUsername}`).then((response) =>
    response.json(),
  );
}

async function fetchUserRepos(): Promise<GitHubRepo[]> {
  if (getToken()) {
    const url = `${GITHUB_API}/user/repos?affiliation=owner,organization_member,collaborator&per_page=100&sort=updated&direction=desc`;
    return fetchAllPages<GitHubRepo>(url);
  }

  const url = `${GITHUB_API}/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated&direction=desc`;
  return fetchAllPages<GitHubRepo>(url);
}

async function fetchOrgRepos(org: string): Promise<GitHubRepo[]> {
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

export interface BuildGitHubData {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  error: string | null;
}

export async function fetchBuildGitHubData(): Promise<BuildGitHubData> {
  try {
    const [profile, repos] = await Promise.all([fetchGitHubProfile(), fetchAllProjects()]);
    return { profile, repos, error: null };
  } catch (error) {
    return {
      profile: null,
      repos: [],
      error: error instanceof Error ? error.message : "Failed to load GitHub data at build time",
    };
  }
}
