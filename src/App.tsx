import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { useGitHubData } from "./hooks/useGitHubData";

export default function App() {
  const { profile, repos, loading, error } = useGitHubData();

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero profile={profile} />
        <About />
        <Skills />
        <Projects repos={repos} loading={loading} error={error} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
