import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { useGitHubData } from "../hooks/useGitHubData";
import type { GitHubProfile, GitHubRepo } from "../services/github";

interface PortfolioAppProps {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  initialError?: string | null;
}

export default function PortfolioApp({
  profile: initialProfile,
  repos: initialRepos,
  initialError = null,
}: PortfolioAppProps) {
  const { profile, repos, loading, error } = useGitHubData({
    initialProfile,
    initialRepos,
    initialError,
  });

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero profile={profile ?? initialProfile} />
        <About />
        <Skills />
        <Projects repos={repos} loading={loading} error={error} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
