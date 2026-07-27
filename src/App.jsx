import React, { useEffect, useState } from "react";
import "./App.css";

const skills = [
  {
    title: "Languages & Frameworks",
    items: "Go, Python, TypeScript, NestJS, SQL, JavaScript, React",
  },
  {
    title: "Agentic AI",
    items: "MCP, AWS Strands, Cloud Agents, Cursor, LangGraph, LLMOps, RAG, PII Masking",
  },
  {
    title: "Distributed Systems",
    items: "Event-Driven Architecture, Kafka, MSK, Redis, ElastiCache, SSE, Pub/Sub, gRPC",
  },
  {
    title: "Cloud & Platform",
    items: "Kubernetes, Helm, Argo Workflows, Docker, Jenkins, AWS, GCP, EKS, CI/CD",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="page">
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="logo">
            Mayank Saxena
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {["about", "experience", "projects", "skills", "contact"].map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow">Senior Software Engineer · Paytm Lending</p>
          <h1>Mayank Saxena</h1>
          <p className="hero-line">
            Event-driven backends, real-time streaming, and agentic systems for FinTech and
            marketplaces.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#experience">
              See work
            </a>
            <a className="btn btn-ghost" href="mailto:mayankidmsaxena@gmail.com">
              Email me
            </a>
          </div>
          <div className="social">
            <a href="https://github.com/1xlblaze" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/themayanksaxena" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:mayankidmsaxena@gmail.com">Email</a>
          </div>
        </div>
      </header>

      <section className="stats wrap">
        <div className="stat">
          <strong>60%</strong>
          <span>Lower display latency</span>
        </div>
        <div className="stat">
          <strong>10K+</strong>
          <span>Concurrent SSE sessions</span>
        </div>
        <div className="stat">
          <strong>22%</strong>
          <span>Fewer lending drop-offs</span>
        </div>
        <div className="stat">
          <strong>₹2.47M</strong>
          <span>Annual infra savings</span>
        </div>
      </section>

      <section id="about" className="section wrap narrow">
        <h2>About</h2>
        <p className="lead">
          I design event-driven systems that move state in real time — Kafka, Redis, SSE, Go, and
          NestJS — and ship them on Kubernetes. At Paytm Lending I built Lead Assist live journey
          streaming and agentic quality/recon tooling. Before that at IndiaMART I led Go migrations
          and LLM pipelines that drove 51.7% higher engagement and INR 2.47M yearly savings.
        </p>
      </section>

      <section id="experience" className="section wrap">
        <h2>Experience</h2>

        <article className="job">
          <div className="job-head">
            <div>
              <h3>Senior Software Engineer, Lending Platform</h3>
              <p className="org">Paytm · Noida</p>
            </div>
            <time>Sep 2025 – Present</time>
          </div>
          <ul>
            <li>
              Engineered a Go SSE service for 10K+ concurrent sessions across 120+ loan stages —
              60% lower agent display latency, adopted by 15+ teams.
            </li>
            <li>
              Cut lending drop-offs by 22% with a NestJS session-gated Kafka pipeline streaming live
              customer journeys with PII masking.
            </li>
            <li>
              Productionized ReconOps on Argo Workflows (AWS SM, S3/DWH, Helm/EKS) — eliminated
              false-green runs; 40% less manual report effort.
            </li>
            <li>
              Shipped AI PR Quality Hub (Cursor + Slack human approval) blocking unsafe merges; 35%
              less manual PR review effort.
            </li>
            <li>
              Hardened LOC marketplace BRE retries in Go and stabilized Stack IT/E2E across 5
              lending services (45% less flaky-pipeline triage).
            </li>
          </ul>
        </article>

        <article className="job">
          <div className="job-head">
            <div>
              <h3>Software Engineer</h3>
              <p className="org">IndiaMART Intermesh Limited · Noida</p>
            </div>
            <time>Mar 2022 – Sep 2025</time>
          </div>
          <ul>
            <li>
              Spearheaded legacy-to-Go migration with pgx + Redis — +40% throughput, 60% lower P99,
              INR 2.47M annual savings.
            </li>
            <li>
              Designed Kafka + Redis notification fan-out — 51.7% increase in platform transactions.
            </li>
            <li>
              Deployed GCP LLM pipelines for 50K+ files/month (90% automation) and NL-to-SQL at 95%
              accuracy.
            </li>
            <li>
              Shipped LangGraph lead scoring for 8K+ leads/week, flagging 20% as high-risk.
            </li>
          </ul>
        </article>
      </section>

      <section id="projects" className="section wrap">
        <h2>Projects</h2>
        <div className="projects">
          <article className="card">
            <h3>Agentic Workflow Orchestrator &amp; MCP Hub</h3>
            <p>
              Cloud agents framework with MCP and AWS Strands for safe multi-step tool calls,
              context retrieval, and structured JSON parsing.
            </p>
          </article>
          <article className="card">
            <h3>Artolio (Gigsetu)</h3>
            <p>
              Hyperlocal B2C artist marketplace — Next.js, Node BFF, Go API, PostgreSQL + PostGIS,
              Supabase Auth/Storage.
            </p>
          </article>
          <article className="card">
            <h3>NL-to-SQL RAG Engine</h3>
            <p>
              Hackathon winner. Schema-aware RAG with AST SQL validation — 5× faster multi-table
              analytics.
            </p>
          </article>
        </div>
      </section>

      <section id="skills" className="section wrap">
        <h2>Skills</h2>
        <div className="skills">
          {skills.map((group) => (
            <div className="skill" key={group.title}>
              <h4>{group.title}</h4>
              <p>{group.items}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section wrap narrow contact">
        <h2>Contact</h2>
        <p className="lead">Open to senior backend, platform, and agentic systems conversations.</p>
        <div className="cta-row center">
          <a className="btn btn-primary" href="mailto:mayankidmsaxena@gmail.com">
            mayankidmsaxena@gmail.com
          </a>
          <a
            className="btn btn-ghost"
            href="https://linkedin.com/in/themayanksaxena"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a className="btn btn-ghost" href="https://github.com/1xlblaze" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <p className="muted">Ghaziabad, Uttar Pradesh, India · +91-93543-87004</p>
      </section>

      <footer className="footer">
        <p>
          © {year} Mayank Saxena ·{" "}
          <a href="https://1xlblaze.github.io/mayank-saxena.github.io/">Portfolio</a>
        </p>
      </footer>
    </div>
  );
}
