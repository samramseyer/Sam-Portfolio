import { useEffect, useState } from "react";
import {
  fetchAllProjects,
  fetchGitHubProfile,
  type GitHubProfile,
  type GitHubRepo,
} from "../services/github";

interface GitHubData {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

interface UseGitHubDataOptions {
  initialProfile?: GitHubProfile | null;
  initialRepos?: GitHubRepo[];
  initialError?: string | null;
}

export function useGitHubData(options: UseGitHubDataOptions = {}): GitHubData {
  const hasInitialData = (options.initialRepos?.length ?? 0) > 0;

  const [profile, setProfile] = useState<GitHubProfile | null>(options.initialProfile ?? null);
  const [repos, setRepos] = useState<GitHubRepo[]>(options.initialRepos ?? []);
  const [loading, setLoading] = useState(!hasInitialData && !options.initialError);
  const [error, setError] = useState<string | null>(options.initialError ?? null);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      if (!hasInitialData) {
        setLoading(true);
      }

      try {
        const [profileData, repoData] = await Promise.all([
          fetchGitHubProfile(),
          fetchAllProjects(),
        ]);

        if (!cancelled) {
          setProfile(profileData);
          setRepos(repoData);
          setError(null);
        }
      } catch (err) {
        if (!cancelled && !hasInitialData) {
          setError(err instanceof Error ? err.message : "Failed to load GitHub data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    refresh();

    return () => {
      cancelled = true;
    };
  }, [hasInitialData]);

  return { profile, repos, loading, error };
}
