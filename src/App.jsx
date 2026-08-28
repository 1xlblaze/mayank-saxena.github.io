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
        <h2 className="section-title">Ownership at scale — latency, reliability, privacy.</h2>
        <p className="lead">
          Over 4+ years across FinTech lending and B2B/B2C marketplaces, I build distributed backend systems designed
          for low latency, zero-downtime reliability, and privacy at scale. Specialized in Go/NestJS microservices,
          Kafka/Redis event streaming, Kubernetes orchestration, and production agentic AI (LangGraph, MCP, Cloud
          Agents). Track record of saving ₹2.47M in annual infra costs, serving 10K+ concurrent SSE sessions, and
          driving major conversion wins.
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
