import React, { useEffect, useState } from "react";
import "./App.css";

const projects = [
  {
    num: "01",
    label: "Paytm Lending · Flagship",
    title: "Lead Assist Live Journey Streaming",
    summary:
      "A privacy-safe, event-driven pipeline so Collections agents can watch the customer’s lending app in real time and intervene before applications stall.",
    problem:
      "Agents needed live visibility into what customers see across 120+ loan stages — without leaking PAN, Aadhaar, phone, or DOB into Kafka or analytics.",
    approach:
      "NestJS BFF publishes session-gated journey events to Kafka only when a live assist session is active (Redis gate). Sensitive fields are masked before publish. A Go SSE service fans updates out to agent dashboards with Akamai-aware keepalives.",
    impact: [
      "22% fewer lending drop-offs via faster agent intervention",
      "60% lower display latency for agents",
      "10K+ concurrent SSE sessions; adopted by 15+ teams",
    ],
    stack: ["Go", "SSE", "NestJS", "Kafka", "Redis", "PII Masking"],
  },
  {
    num: "02",
    label: "Paytm · Agentic Quality",
    title: "PP QA Gatekeeper",
    summary:
      "An AI-assisted PR quality hub for Postpaid Lending that analyzes changes, asks humans to approve in Slack, runs staging checks, then allows or blocks merges.",
    problem:
      "Multi-repo Postpaid changes were merging without a consistent AI + human gate, increasing risk of unsafe production releases.",
    approach:
      "Built Cursor-driven analysis with Slack human-in-the-loop approval and automated staging journey checks. Partnered with QA and engineering leads so the gate became part of the normal PR path.",
    impact: [
      "Unsafe merges blocked before production",
      "35% less manual PR review effort",
      "Standardized quality signal across Bitbucket repos",
    ],
    stack: ["Cursor AI", "Slack", "Bitbucket", "Staging Checks", "CI"],
  },
  {
    num: "03",
    label: "Paytm · Platform Ops",
    title: "ReconOps on Argo Workflows",
    summary:
      "Productionized lender–Paytm reconciliation as an agentic ops pipeline that only reports success when the run truly completes.",
    problem:
      "Fire-and-forget orchestration produced false-green recon runs and heavy manual report chasing.",
    approach:
      "Moved recon onto Argo Workflows with async POST + poll-until-completed, AWS Secrets Manager, S3/DWH wiring, Helm on EKS, and Prometheus scrape for lending-central-ops.",
    impact: [
      "Eliminated false-green reconciliation runs",
      "40% less manual report processing effort",
      "Scheduled, secret-safe stage/prod path on EKS",
    ],
    stack: ["Argo Workflows", "AWS SM", "S3/DWH", "Helm", "EKS", "Prometheus"],
  },
  {
    num: "04",
    label: "Personal · 2025–2026",
    title: "Agentic Workflow Orchestrator & MCP Hub",
    summary:
      "A cloud-agents framework for enterprise backend tasks: multi-step tool use, context retrieval, and strict structured outputs.",
    problem:
      "LLM agents that call tools ad-hoc are hard to trust in production backends — missing schemas, unsafe side effects, and brittle JSON.",
    approach:
      "Designed an orchestrator around Model Context Protocol (MCP) and AWS Strands so agents can discover tools safely, pull the right context, execute multi-step workflows, and return validated structured JSON for downstream systems.",
    impact: [
      "Reusable pattern for safe tool-calling agents",
      "Clear separation of planning, tools, and structured responses",
      "Foundation for Cursor / cloud-agent style backends",
    ],
    stack: ["MCP", "AWS Strands", "Cloud Agents", "JSON Schema", "Python/Go"],
  },
  {
    num: "05",
    label: "Personal · Marketplace",
    title: "Artolio (Gigsetu) — Hyperlocal Artist Marketplace",
    summary:
      "A B2C marketplace to discover nearby artists, book appointments, manage reviews, and run artist dashboards — geo-first from day one.",
    problem:
      "Local creative talent is hard to find and book online; most marketplace templates ignore location and multi-role dashboards.",
    approach:
      "Full-stack product: Next.js frontend, Node BFF, Go API, PostgreSQL + PostGIS for nearby search, Supabase Auth/Storage for portfolios. Deployed across Vercel (web) and Render (API/BFF).",
    impact: [
      "End-to-end booking + review + dashboard flows",
      "Geo-spatial artist discovery with PostGIS",
      "Production-style split: FE / BFF / Go / Supabase",
    ],
    stack: ["Next.js", "Node BFF", "Go", "PostGIS", "Supabase", "Vercel", "Render"],
  },
  {
    num: "06",
    label: "Hackathon Winner · 2025",
    title: "NL-to-SQL RAG Engine",
    summary:
      "Schema-aware retrieval-augmented generation that turns natural language into validated SQL across messy multi-table enterprise schemas.",
    problem:
      "Business users wait on analysts for ad-hoc queries; raw LLM SQL often breaks joins, hallucinates columns, or is unsafe to run.",
    approach:
      "Built a RAG pipeline that retrieves relevant schema context, drafts SQL, then validates with AST-based checks before execution — presented with teammates and won first place.",
    impact: [
      "About 5× faster analytical query refinement",
      "95%-class accuracy direction from related NL→SQL work",
      "First place hackathon award",
    ],
    stack: ["RAG", "Python", "SQL AST", "LLMs", "Schema Retrieval"],
  },
];

const skillGroups = [
  {
    title: "Languages & Frameworks",
    items: ["Go", "Python", "TypeScript", "NestJS", "SQL", "JavaScript", "React"],
  },
  {
    title: "Agentic AI",
    items: ["MCP", "AWS Strands", "Cloud Agents", "Cursor", "LangGraph", "LLMOps", "RAG", "PII Masking"],
  },
  {
    title: "Distributed Systems",
    items: ["Event-Driven Architecture", "Kafka", "MSK", "Redis", "SSE", "Pub/Sub", "gRPC"],
  },
  {
    title: "Cloud & Platform",
    items: ["Kubernetes", "Helm", "Argo", "Docker", "Jenkins", "AWS", "GCP", "EKS", "CI/CD"],
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const t = requestAnimationFrame(() => setVisible(true));
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(t);
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className={`page ${visible ? "is-ready" : ""}`}>
      <div className="grain" aria-hidden="true" />

      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="logo">
            Mayank<span>Saxena</span>
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
            {[
              ["work", "Work"],
              ["projects", "Projects"],
              ["experience", "Experience"],
              ["skills", "Skills"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="stream-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="hero-inner">
          <p className="eyebrow reveal">Senior Software Engineer · Paytm Lending</p>
          <h1 className="reveal delay-1">
            Mayank
            <br />
            Saxena
          </h1>
          <p className="hero-line reveal delay-2">
            I design event-driven systems that stream live state, keep PII off the wire, and put
            humans in the loop with agentic AI.
          </p>
          <div className="cta-row reveal delay-3">
            <a className="btn btn-primary" href="#projects">
              View selected work
            </a>
            <a className="btn btn-ghost" href="mailto:mayankidmsaxena@gmail.com">
              Let’s talk
            </a>
          </div>
        </div>
      </header>

      <section id="work" className="impact">
        <div className="wrap impact-grid">
          <div className="impact-item">
            <strong>60%</strong>
            <span>Faster agent display</span>
          </div>
          <div className="impact-item">
            <strong>10K+</strong>
            <span>Live SSE sessions</span>
          </div>
          <div className="impact-item">
            <strong>22%</strong>
            <span>Fewer drop-offs</span>
          </div>
          <div className="impact-item">
            <strong>₹2.47M</strong>
            <span>Infra saved / year</span>
          </div>
        </div>
      </section>

      <section className="section wrap about-block">
        <div className="section-kicker">About</div>
        <h2 className="section-title">Backend systems that feel instant — and stay safe at scale.</h2>
        <p className="lead">
          4+ years across FinTech lending and B2B/B2C marketplaces. I specialize in Kafka/Redis/SSE
          architectures, Go and NestJS services, Kubernetes delivery, and agentic workflows (MCP,
          AWS Strands, Cursor, LangGraph). Currently shipping Lead Assist and platform quality tools
          at Paytm; previously led Go migrations and LLM pipelines at IndiaMART.
        </p>
      </section>

      <section id="projects" className="section projects-section">
        <div className="wrap">
          <div className="section-kicker">Selected work</div>
          <h2 className="section-title">Projects with the problem, approach, and impact.</h2>
        </div>

        <div className="project-rail">
          {projects.map((p) => (
            <article className="project" key={p.num}>
              <div className="wrap project-grid">
                <div className="project-meta">
                  <span className="project-num">{p.num}</span>
                  <span className="project-label">{p.label}</span>
                </div>
                <div className="project-body">
                  <h3>{p.title}</h3>
                  <p className="project-summary">{p.summary}</p>

                  <div className="project-detail">
                    <div>
                      <h4>Problem</h4>
                      <p>{p.problem}</p>
                    </div>
                    <div>
                      <h4>Approach</h4>
                      <p>{p.approach}</p>
                    </div>
                  </div>

                  <div className="project-impact">
                    <h4>Impact</h4>
                    <ul>
                      {p.impact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="tags">
                    {p.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section wrap">
        <div className="section-kicker">Experience</div>
        <h2 className="section-title">Where the systems shipped.</h2>

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
              Lead Assist + Go SSE for live lending journeys — 10K+ sessions, 60% latency cut, 22%
              fewer drop-offs.
            </li>
            <li>
              AI PR Gatekeeper and Argo ReconOps — safer merges, trustworthy recon, less manual ops
              effort.
            </li>
            <li>
              Stack IT/E2E across 5 microservices and LOC BRE retry hardening on the Go orchestrator.
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
              Legacy→Go migration with pgx/Redis — +40% throughput, 60% lower P99, INR 2.47M savings.
            </li>
            <li>
              Kafka + Redis fan-out driving 51.7% higher transactions; LangGraph scoring for 8K+
              leads/week.
            </li>
            <li>
              GCP LLM pipelines (50K+ files/month, 90% automation) and NL→SQL at 95% accuracy.
            </li>
          </ul>
        </article>
      </section>

      <section id="skills" className="section wrap">
        <div className="section-kicker">Capabilities</div>
        <h2 className="section-title">Stack I use in production.</h2>
        <div className="skills">
          {skillGroups.map((group) => (
            <div className="skill" key={group.title}>
              <h4>{group.title}</h4>
              <div className="tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-band">
        <div className="wrap contact-inner">
          <div className="section-kicker light">Contact</div>
          <h2>Building something real-time, distributed, or agentic?</h2>
          <p>
            I’m open to senior backend, platform, and agentic systems roles — and thoughtful
            collaborations.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:mayankidmsaxena@gmail.com">
              mayankidmsaxena@gmail.com
            </a>
            <a
              className="btn btn-ghost light"
              href="https://linkedin.com/in/themayanksaxena"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-ghost light"
              href="https://github.com/1xlblaze"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <p className="muted">Ghaziabad, Uttar Pradesh, India · +91-93543-87004</p>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {year} Mayank Saxena</span>
          <a href="https://1xlblaze.github.io/mayank-saxena.github.io/">Portfolio</a>
        </div>
      </footer>
    </div>
  );
}
