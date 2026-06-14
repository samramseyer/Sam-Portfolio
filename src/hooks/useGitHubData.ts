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

export function useGitHubData(): GitHubData {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
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
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load GitHub data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, repos, loading, error };
}
