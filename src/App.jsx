import React, { useEffect, useState } from "react";
import "./App.css";

function ArchDiagram({ type }) {
  if (type === "lead-assist") {
    return (
      <svg className="arch-svg" viewBox="0 0 920 280" role="img" aria-label="Lead Assist architecture">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
          </marker>
        </defs>
        {[
          [20, 100, 120, 55, "Lending App", "Client"],
          [170, 100, 120, 55, "NestJS BFF", "Events"],
          [320, 100, 120, 55, "Redis Gate", "Session?"],
          [470, 100, 120, 55, "PII Mask", "PAN/Aadhaar"],
          [620, 100, 120, 55, "Kafka", "MSK Topic"],
          [770, 100, 120, 55, "Go SSE", "10K+ conns"],
        ].map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="10"
              className={`arch-box ${i === 3 ? "arch-box-warn" : ""} ${i === 5 ? "arch-box-accent" : ""}`}
            />
            <text x={x + w / 2} y={y + 24} textAnchor="middle" className="arch-title">
              {t}
            </text>
            <text x={x + w / 2} y={y + 42} textAnchor="middle" className="arch-sub">
              {s}
            </text>
            {i < 5 && (
              <line
                x1={x + w + 2}
                y1={y + h / 2}
                x2={x + w + 26}
                y2={y + h / 2}
                className="arch-line"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        ))}
        <rect x={770} y={185} width={120} height="48" rx="10" className="arch-box arch-box-accent" />
        <text x={830} y={205} textAnchor="middle" className="arch-title">
          Agent UI
        </text>
        <text x={830} y={222} textAnchor="middle" className="arch-sub">
          Dashboard
        </text>
        <line x1={830} y1={155} x2={830} y2={183} className="arch-line" markerEnd="url(#arrow)" />
        <text x={460} y={50} textAnchor="middle" className="arch-caption">
          Publish only if Redis leadassist:&#123;customerId&#125; exists · PII stripped before Kafka · Akamai SSE heartbeats
        </text>
      </svg>
    );
  }

  if (type === "gatekeeper-recon") {
    return (
      <svg className="arch-svg" viewBox="0 0 920 300" role="img" aria-label="Gatekeeper and ReconOps flow">
        <defs>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
          </marker>
        </defs>
        <text x={20} y={28} className="arch-caption">
          Gatekeeper (PR quality)
        </text>
        {[
          [20, 50, 130, 50, "Bitbucket PR"],
          [180, 50, 130, 50, "Cursor AI"],
          [340, 50, 150, 50, "Slack Approve"],
          [520, 50, 150, 50, "Staging Checks"],
          [700, 50, 180, 50, "Allow / Block"],
        ].map(([x, y, w, h, t], i) => (
          <g key={t}>
            <rect x={x} y={y} width={w} height={h} rx="10" className={`arch-box ${i === 2 ? "arch-box-warn" : ""}`} />
            <text x={x + w / 2} y={y + 30} textAnchor="middle" className="arch-title">
              {t}
            </text>
            {i < 4 && (
              <line
                x1={x + w + 2}
                y1={y + h / 2}
                x2={x + w + 26}
                y2={y + h / 2}
                className="arch-line"
                markerEnd="url(#arrow2)"
              />
            )}
          </g>
        ))}
        <text x={20} y={160} className="arch-caption">
          ReconOps (Argo on EKS)
        </text>
        {[
          [20, 180, 150, 50, "Trigger / Cron"],
          [200, 180, 160, 50, "Argo Workflow"],
          [390, 180, 160, 50, "Poll → completed"],
          [580, 180, 140, 50, "S3 / DWH"],
          [750, 180, 140, 50, "Prometheus"],
        ].map(([x, y, w, h, t], i) => (
          <g key={t}>
            <rect x={x} y={y} width={w} height={h} rx="10" className="arch-box arch-box-accent" />
            <text x={x + w / 2} y={y + 30} textAnchor="middle" className="arch-title">
              {t}
            </text>
            {i < 4 && (
              <line
                x1={x + w + 2}
                y1={y + h / 2}
                x2={x + w + 26}
                y2={y + h / 2}
                className="arch-line"
                markerEnd="url(#arrow2)"
              />
            )}
          </g>
        ))}
        <text x={460} y={270} textAnchor="middle" className="arch-caption">
          Human-in-the-loop for merges · fail closed on secrets · recon green only when status = completed
        </text>
      </svg>
    );
  }

  return (
    <svg className="arch-svg" viewBox="0 0 920 260" role="img" aria-label="MCP Hub architecture">
      <defs>
        <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
        </marker>
      </defs>
      {[
        [40, 90, 140, 55, "User Request"],
        [220, 90, 170, 55, "Orchestrator", "Strands / LangGraph"],
        [430, 90, 150, 55, "MCP Discovery"],
        [620, 40, 160, 55, "JSON Schema"],
        [620, 140, 160, 55, "Tool Execute"],
        [820, 90, 70, 55, "API"],
      ].map(([x, y, w, h, t, s], i) => (
        <g key={t}>
          <rect x={x} y={y} width={w} height={h} rx="10" className={`arch-box ${i === 3 ? "arch-box-warn" : ""}`} />
          <text x={x + w / 2} y={y + (s ? 22 : 32)} textAnchor="middle" className="arch-title">
            {t}
          </text>
          {s && (
            <text x={x + w / 2} y={y + 40} textAnchor="middle" className="arch-sub">
              {s}
            </text>
          )}
        </g>
      ))}
      <line x1={180} y1={117} x2={216} y2={117} className="arch-line" markerEnd="url(#arrow3)" />
      <line x1={390} y1={117} x2={426} y2={117} className="arch-line" markerEnd="url(#arrow3)" />
      <line x1={580} y1={100} x2={616} y2={70} className="arch-line" markerEnd="url(#arrow3)" />
      <line x1={580} y1={130} x2={616} y2={160} className="arch-line" markerEnd="url(#arrow3)" />
      <line x1={780} y1={67} x2={816} y2={100} className="arch-line" markerEnd="url(#arrow3)" />
      <line x1={780} y1={167} x2={816} y2={130} className="arch-line" markerEnd="url(#arrow3)" />
      <text x={460} y={230} textAnchor="middle" className="arch-caption">
        Tools discovered via MCP · outputs validated before side effects · structured JSON for backends
      </text>
    </svg>
  );
}

const projects = [
  {
    id: "lead-assist",
    num: "01",
    label: "Paytm Lending · Flagship",
    title: "Lead Assist Live Journey Streaming",
    summary:
      "Privacy-safe, event-driven pipeline so Collections agents watch the customer lending app live and intervene before applications stall.",
    problem:
      "Agents needed live visibility across 120+ loan stages without leaking PAN, Aadhaar, phone, or DOB into Kafka/analytics.",
    approach:
      "NestJS BFF emits session-gated Kafka events (Redis key must exist). PII is masked before publish. Go SSE fans out to agent dashboards with Akamai-aware heartbeats.",
    impact: [
      "22% fewer lending drop-offs",
      "60% lower agent display latency",
      "10K+ concurrent SSE sessions · 15+ teams",
    ],
    tradeoffs: [
      {
        q: "Why Go SSE instead of NestJS for fan-out?",
        a: "Goroutines give a lower memory footprint per long-lived connection and cleaner backpressure for 10K+ concurrent SSE streams than Node event-loop fan-out.",
      },
      {
        q: "Why Redis for session gating?",
        a: "O(1) existence check before publish avoids Kafka spam when no agent is assisting — cheaper and safer than always-on telemetry.",
      },
    ],
    stackGroups: {
      Language: ["Go", "TypeScript"],
      Messaging: ["Kafka", "MSK"],
      "Cache/State": ["Redis"],
      Edge: ["SSE", "Akamai"],
      Framework: ["NestJS BFF"],
    },
    diagram: "lead-assist",
    decisions: [
      "Mask at the BFF edge so analytics never sees raw PII",
      "Fail-fast multi-broker MSK config in production",
      "Dedicated Lead Assist Redis vs main BFF cache",
    ],
    sequence: [
      "Client lending UI emits schema fetch/submit",
      "NestJS BFF checks Redis session gate",
      "PII mask (PAN / Aadhaar / phone / DOB)",
      "Kafka publish (MSK topic)",
      "Go SSE fan-out + heartbeats",
      "Agent dashboard renders live stage",
    ],
    constraints: [
      "Latency: agent display p95 targeted well under interactive thresholds (~60% cut vs prior)",
      "Scale: 10K+ concurrent SSE connections on Go goroutines",
      "Privacy: no raw PII on Kafka / analytics topics",
      "Failover: multi-broker MSK; publish skipped when session gate missing",
    ],
  },
  {
    id: "gatekeeper",
    num: "02",
    label: "Paytm · Agentic Quality",
    title: "PP QA Gatekeeper",
    summary:
      "AI PR quality hub for Postpaid Lending: analyze → Slack human approve → staging checks → allow/block merge.",
    problem:
      "Multi-repo Postpaid changes lacked a consistent AI + human gate before production.",
    approach:
      "Cursor analysis with Slack interactive approval and staging journey checks, owned with QA and engineering leads.",
    impact: [
      "Unsafe merges blocked pre-prod",
      "35% less manual PR review effort",
      "Consistent signal across Bitbucket repos",
    ],
    tradeoffs: [
      {
        q: "Why human-in-the-loop instead of fully automated merge?",
        a: "Lending releases are high-blast-radius; AI proposes, humans approve — reduces false confidence while still cutting review toil.",
      },
    ],
    stackGroups: {
      AI: ["Cursor"],
      Collab: ["Slack"],
      SCM: ["Bitbucket"],
      Quality: ["Staging checks", "CI"],
    },
    diagram: "gatekeeper-recon",
    decisions: [
      "Slack approval as the merge control plane",
      "Staging journey must pass before allow",
      "Fail closed when webhook secrets are missing",
    ],
    sequence: [
      "Bitbucket PR opened",
      "Cursor AI analysis",
      "Slack interactive human approval",
      "Staging journey checks",
      "Allow or block merge",
    ],
    constraints: [
      "Human-in-the-loop required for merge allow",
      "Fail closed if webhook / secrets unset",
      "No silent bypass of staging gates",
    ],
  },
  {
    id: "recon",
    num: "03",
    label: "Paytm · Platform Ops",
    title: "ReconOps on Argo Workflows",
    summary:
      "Lender–Paytm reconciliation that only reports green when the async run reaches completed.",
    problem:
      "Fire-and-forget orchestration created false-green recon and manual report chasing.",
    approach:
      "Argo on EKS with poll-until-completed, AWS Secrets Manager, S3/DWH artifacts, Helm, Prometheus scrape.",
    impact: [
      "Eliminated false-green recon runs",
      "40% less manual report effort",
      "Scheduled secret-safe stage/prod path",
    ],
    tradeoffs: [
      {
        q: "Why poll-to-complete over fire-and-forget?",
        a: "Ops trust requires terminal state. Async POST + poll fails the workflow unless status = completed.",
      },
    ],
    stackGroups: {
      Orchestration: ["Argo Workflows"],
      Cloud: ["EKS", "Helm", "AWS SM"],
      Data: ["S3", "DWH"],
      Observability: ["Prometheus"],
    },
    diagram: "gatekeeper-recon",
    decisions: [
      "ExternalSecrets for recon credentials",
      "No unsafe bypass flags in prod templates",
      "Prometheus annotations on central-ops",
    ],
    sequence: [
      "Schedule / manual trigger",
      "Argo Workflow starts on EKS",
      "Async POST then poll until completed",
      "Artifacts to S3 / DWH",
      "Prometheus scrape + ops visibility",
    ],
    constraints: [
      "Green only when status = completed (no false-green)",
      "Secrets via AWS SM / ExternalSecrets",
      "Stage vs prod URL targeting explicit in params",
    ],
  },
  {
    id: "mcp",
    num: "04",
    label: "Personal · 2025–2026",
    title: "Agentic Workflow Orchestrator & MCP Hub",
    summary:
      "Cloud-agents framework for enterprise backends: MCP tool discovery, multi-step execution, schema-validated JSON.",
    problem:
      "Ad-hoc LLM tool calls are unsafe — missing schemas, brittle JSON, uncontrolled side effects.",
    approach:
      "Orchestrator on AWS Strands / LangGraph patterns with MCP server discovery and JSON Schema validation before tool execution.",
    impact: [
      "Reusable safe tool-calling pattern",
      "Clear plan → tools → structured response split",
      "Ready for Cursor / cloud-agent backends",
    ],
    tradeoffs: [
      {
        q: "Why MCP + schema validation?",
        a: "Discovery stays dynamic; execution stays constrained. Invalid payloads never reach backend tools.",
      },
    ],
    stackGroups: {
      AI: ["MCP", "AWS Strands", "LangGraph"],
      Validation: ["JSON Schema"],
      Runtime: ["Cloud Agents"],
    },
    diagram: "mcp",
    decisions: [
      "Validate before side effects",
      "Tool allowlists over open function calling",
      "Structured outputs for downstream APIs",
    ],
    sequence: [
      "User / system request",
      "Orchestrator (Strands / LangGraph)",
      "MCP server tool discovery",
      "JSON Schema validation",
      "Backend tool execution",
      "Structured response to caller",
    ],
    constraints: [
      "Invalid JSON never reaches tools",
      "Allowlisted tools only",
      "Deterministic structured outputs for APIs",
    ],
    trace: `$ agent.run --goal "fetch_lender_status" --schema strict
> mcp.discover tools=[lms.getStatus, s3.putArtifact]
> plan: getStatus → validate → putArtifact
> tool lms.getStatus {"loanId":"LN-9f2a"} 
< {"status":"ACTIVE","stage":"MANDATE"}
> schema.validate OK
> tool s3.putArtifact {"key":"recon/LN-9f2a.json"}
< {"ok":true,"etag":"ab12..."}
✓ workflow completed`,
  },
  {
    id: "artolio",
    num: "05",
    label: "Personal · Marketplace",
    title: "Artolio (Gigsetu) — Hyperlocal Artist Marketplace",
    summary:
      "B2C marketplace to discover nearby artists, book appointments, and run reviews/dashboards — geo-first.",
    problem:
      "Local creative talent is hard to find/book; templates ignore PostGIS and multi-role dashboards.",
    approach:
      "Next.js + Node BFF + Go API + PostgreSQL/PostGIS + Supabase Auth/Storage; Vercel + Render deploy.",
    impact: [
      "End-to-end book / review / dashboard flows",
      "Nearby search with PostGIS",
      "Clean FE / BFF / Go / Supabase split",
    ],
    tradeoffs: [
      {
        q: "Why BFF between Next.js and Go?",
        a: "Keeps CORS, auth edge concerns, and API shaping out of the Go domain service — mirrors production lending BFF patterns.",
      },
    ],
    stackGroups: {
      Frontend: ["Next.js"],
      BFF: ["Node"],
      API: ["Go"],
      Data: ["PostgreSQL", "PostGIS", "Supabase"],
    },
    trace: `$ curl -s "$BFF/api/search?lat=28.66&lng=77.43&km=8" | jq '.artists|length'
12
$ curl -s -X POST "$BFF/api/bookings" -d '{"artistId":"a_18","slot":"2026-08-01T10:00+05:30"}'
{"id":"bk_1042","status":"CONFIRMED"}
# PostGIS: ST_DWithin(geom, point, meters) on artists`,
  },
  {
    id: "nl2sql",
    num: "06",
    label: "Hackathon Winner · 2025",
    title: "NL-to-SQL RAG Engine",
    summary:
      "Schema-aware RAG that turns natural language into AST-validated SQL across multi-table enterprise schemas.",
    problem:
      "Raw LLM SQL hallucinates columns and can emit destructive statements.",
    approach:
      "Retrieve schema context → draft SQL → AST validation blocks DROP/DELETE and unauthorized joins before run.",
    impact: [
      "~5× faster analytics query refinement",
      "Destructive SQL blocked pre-execution",
      "First-place hackathon",
    ],
    tradeoffs: [
      {
        q: "Why AST checks instead of prompt-only safety?",
        a: "Prompts are advisory; AST gates are enforceable — reject DROP/DELETE and disallowed table access before the warehouse sees the query.",
      },
    ],
    stackGroups: {
      AI: ["RAG", "LLMs"],
      Safety: ["SQL AST"],
      Language: ["Python"],
    },
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

function StackBadges({ groups }) {
  return (
    <div className="stack-groups">
      {Object.entries(groups).map(([role, tags]) => (
        <div className="stack-group" key={role}>
          <span className="stack-role">{role}</span>
          <div className="tags">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enlarged, setEnlarged] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const t = requestAnimationFrame(() => setVisible(true));
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(t);
    };
  }, []);

  useEffect(() => {
    if (!enlarged) return undefined;
    const onKey = (e) => e.key === "Escape" && setEnlarged(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [enlarged]);

  const year = new Date().getFullYear();
  const active = projects.find((p) => p.id === enlarged);

  return (
    <div className={`page ${visible ? "is-ready" : ""}`}>
      <div className="grain" aria-hidden="true" />

      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="logo">
            Mayank<span>Saxena</span>
          </a>
          <button className="menu-btn" type="button" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {[
              ["impact", "Impact"],
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
            Senior Software Engineer specializing in high-throughput backend architecture, real-time
            event-driven systems, and production agentic AI pipelines.
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

      <section id="impact" className="impact">
        <div className="wrap impact-grid">
          <div className="impact-item">
            <strong>60%</strong>
            <span>Latency reduction</span>
          </div>
          <div className="impact-item">
            <strong>10K+</strong>
            <span>SSE sessions</span>
          </div>
          <div className="impact-item">
            <strong>22%</strong>
            <span>Conversion boost</span>
          </div>
          <div className="impact-item">
            <strong>₹2.47M</strong>
            <span>Infra saved / year</span>
          </div>
        </div>
      </section>

      <section className="section wrap about-block">
        <div className="section-kicker">About</div>
        <h2 className="section-title">Ownership at scale — latency, reliability, privacy.</h2>
        <p className="lead">
          Over 4+ years across FinTech lending and B2B/B2C marketplaces, I build distributed backend
          systems designed for low latency, zero-downtime reliability, and privacy at scale.
          Specialized in Go/NestJS microservices, Kafka/Redis event streaming, Kubernetes
          orchestration, and integrating enterprise agentic AI (MCP, AWS Strands, LangGraph). Track
          record of saving ₹2.47M in annual infra costs, serving 10K+ concurrent SSE sessions, and
          driving major conversion wins.
        </p>
      </section>

      <section id="projects" className="section projects-section">
        <div className="wrap">
          <div className="section-kicker">Selected work</div>
          <h2 className="section-title">Architecture, trade-offs, and measurable impact.</h2>
        </div>

        <div className="project-rail">
          {projects.map((p) => (
            <article className="project" key={p.id} id={p.id}>
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

                  <div className="tradeoffs">
                    <h4>Engineering trade-offs</h4>
                    {p.tradeoffs.map((t) => (
                      <div className="tradeoff" key={t.q}>
                        <strong>{t.q}</strong>
                        <p>{t.a}</p>
                      </div>
                    ))}
                  </div>

                  <StackBadges groups={p.stackGroups} />

                  {p.diagram && (
                    <div className="design-panel">
                      <div className="design-panel-head">
                        <div>
                          <h4>System design</h4>
                          <p>Sanitized production pattern — no proprietary service names or secrets.</p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary btn-small"
                          onClick={() => setEnlarged(p.id)}
                        >
                          Enlarge diagram
                        </button>
                      </div>
                      <div className="design-diagram inline-diagram">
                        <ArchDiagram type={p.diagram} />
                      </div>
                      {p.sequence && (
                        <div className="design-cols">
                          <div>
                            <h5>Sequence / pipeline</h5>
                            <ol>
                              {p.sequence.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
                          </div>
                          <div>
                            <h5>Constraints &amp; decisions</h5>
                            <ul>
                              {(p.constraints || []).map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                              {(p.decisions || []).map((d) => (
                                <li key={`d-${d}`}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {p.trace && (
                    <div className="trace-block">
                      <div className="trace-label">Runtime trace</div>
                      <pre className="trace">{p.trace}</pre>
                    </div>
                  )}
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
              Lead Assist + Go SSE — 10K+ sessions, 60% latency cut, 22% fewer drop-offs with Redis
              gate + PII masking.
            </li>
            <li>AI PR Gatekeeper and Argo ReconOps — safer merges, trustworthy recon completion.</li>
            <li>Stack IT/E2E across 5 services; LOC BRE retry hardening on Go orchestrator.</li>
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
              Legacy → Go + pgx + Redis — +40% throughput, 60% lower P99, ₹2.47M annual infra
              savings.
            </li>
            <li>
              Kafka/Redis fan-out (+51.7% transactions); LangGraph scoring for 8K+ leads/week.
            </li>
            <li>GCP LLM pipelines (50K+ files/month) and NL→SQL at 95% accuracy.</li>
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
          <h2>Building high-throughput, real-time, or agentic systems?</h2>
          <p>Open to senior backend, platform, and agentic systems conversations.</p>
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
            <a className="btn btn-ghost light" href="https://github.com/1xlblaze" target="_blank" rel="noreferrer">
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

      {active && (
        <div className="modal-backdrop" onClick={() => setEnlarged(null)} role="presentation">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <p className="section-kicker">System design</p>
                <h3 id="modal-title">{active.title}</h3>
              </div>
              <button type="button" className="modal-close" onClick={() => setEnlarged(null)} aria-label="Close">
                ×
              </button>
            </div>
            <div className="modal-diagram">
              <ArchDiagram type={active.diagram} />
            </div>
            <div className="modal-decisions">
              <h4>Sequence</h4>
              <ol>
                {(active.sequence || []).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <h4>Constraints &amp; decisions</h4>
              <ul>
                {(active.constraints || []).map((c) => (
                  <li key={c}>{c}</li>
                ))}
                {(active.decisions || []).map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
