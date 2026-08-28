import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Seo } from "./components/Seo.jsx";
import { Navbar, BottomNav } from "./components/Nav/Navbar.jsx";
import { ScrollProgress } from "./components/Nav/ScrollProgress.jsx";
import { HeroSection } from "./components/Hero/HeroSection.jsx";
import { ImpactStrip, MetricsSection } from "./components/Metrics/MetricsSection.jsx";
import { ProjectsSection } from "./components/Projects/ProjectsSection.jsx";
import { SkillsSection } from "./components/Skills/SkillsSection.jsx";
import { ExperienceSection } from "./components/Experience/ExperienceSection.jsx";
import { PublicationsSection } from "./components/Publications/PublicationsSection.jsx";
import { ContactSection } from "./components/Contact/ContactSection.jsx";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function App() {
  const [ready, setReady] = useState(false);
  const [egg, setEgg] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    let buf = [];
    const onKey = (e) => {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (buf.join() === KONAMI.join() || e.key === "`") setEgg((v) => !v);
      if (e.key === "Escape") setEgg(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className={`page ${ready ? "is-ready" : ""}`}>
      <Seo />
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 400, top: 72 }}
        toastOptions={{
          style: { background: "#0e151d", color: "#f2f5f8", border: "1px solid rgba(242,245,248,.12)" },
        }}
      />
      <a className="skip" href="#work">
        Skip to work
      </a>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <ImpactStrip />

      <section className="section wrap about-block">
        <div className="section-kicker">About</div>
        <h2 className="section-title">I make high-traffic systems feel instant.</h2>
        <p className="lead">
          Over 4+ years at Paytm Lending and IndiaMART, I take messy backends and make them faster, cheaper, and safer
          for the people who use them. Employee of the Year. Two IEEE papers. ₹2.47M saved in a year. If you like
          diagrams and trade-offs, the work below is for you — if you just want proof, start with the numbers.
        </p>
        <p className="lead" style={{ marginTop: "1rem" }}>
          Day to day: Go, NestJS, Kafka, Redis, Kubernetes, and production AI agents (LangGraph, MCP, Cloud Agents).
        </p>
      </section>

      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <MetricsSection />
      <PublicationsSection />
      <ContactSection />

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {year} Mayank Saxena</span>
          <a href="https://1xlblaze.github.io/mayank-saxena.github.io/">Portfolio</a>
        </div>
      </footer>
      <BottomNav />

      {egg && (
        <div className="egg" role="dialog" aria-label="Hidden terminal">
          <pre>{`mayank@lending:~$ whoami
backend architect · agentic systems
$ systems --owned
nexus  bff  lead-assist  gatekeeper  reconops  funnel-recon  buyleads
$ impact
₹2.47M saved · 60% p99 ↓ · 10K+ sse · 0% delay
$ echo "hire him"
hire him`}</pre>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => setEgg(false)}>
            exit
          </button>
        </div>
      )}
    </div>
  );
}
