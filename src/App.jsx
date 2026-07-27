import React, { useEffect, useState } from "react";
import "./App.css";

const RESUME_PDF = `${import.meta.env.BASE_URL}Mayank-August-2026-2.pdf`;

function CodeSnippet({ title, language, code }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`code-snip ${open ? "open" : ""}`}>
      <button type="button" className="code-snip-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>
          <strong>{title}</strong>
          <em>{language}</em>
        </span>
        <span className="code-snip-chevron">{open ? "Hide" : "Show code"}</span>
      </button>
      {open && <pre className="code-snip-body">{code}</pre>}
    </div>
  );
}

function ArchDiagram({ type }) {
  if (type === "lead-assist") {
    return (
      <svg className="arch-svg interactive" viewBox="0 0 920 280" role="img" aria-label="Lead Assist architecture">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
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
              className={`arch-box arch-node ${i === 3 ? "arch-box-warn" : ""} ${i === 5 ? "arch-box-accent" : ""}`}
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
          Session-gated publish · PII stripped before the bus · SSE fan-out to agents
        </text>
      </svg>
    );
  }

  if (type === "gatekeeper") {
    return (
      <svg className="arch-svg interactive" viewBox="0 0 940 300" role="img" aria-label="QA Gatekeeper pattern">
        <defs>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
          </marker>
        </defs>
        <text x={20} y={24} className="arch-caption">
          Public pattern — intake channels → webhook API → run log → HITL → dual quality gates
        </text>
        {[
          [20, 45, 150, 48, "Intake", "Chat / PR / Ticket"],
          [200, 45, 150, 48, "Webhook API", "run intake"],
          [380, 45, 140, 48, "Run store", "audit log"],
          [550, 45, 150, 48, "Orchestrator", "multi-repo jobs"],
          [730, 45, 160, 48, "Human approve", "Slack HITL"],
        ].map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <rect x={x} y={y} width={w} height={h} rx="10" className={`arch-box ${i === 4 ? "arch-box-warn" : ""}`} />
            <text x={x + w / 2} y={y + 20} textAnchor="middle" className="arch-title">
              {t}
            </text>
            <text x={x + w / 2} y={y + 36} textAnchor="middle" className="arch-sub">
              {s}
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
        {[
          [20, 150, 220, 50, "Gate A — Services", "backend health checks"],
          [280, 150, 240, 50, "Gate B — Staging journey", "end-to-end UI path"],
          [560, 150, 200, 50, "Merge decision", "allow / block"],
        ].map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <rect x={x} y={y} width={w} height={h} rx="10" className={`arch-box ${i === 2 ? "arch-box-accent" : ""}`} />
            <text x={x + w / 2} y={y + 20} textAnchor="middle" className="arch-title">
              {t}
            </text>
            <text x={x + w / 2} y={y + 36} textAnchor="middle" className="arch-sub">
              {s}
            </text>
            {i < 2 && (
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
        <text x={470} y={250} textAnchor="middle" className="arch-caption">
          Pattern only — ports, secrets, repo manifests, and internal service names withheld
        </text>
      </svg>
    );
  }

  if (type === "recon") {
    return (
      <svg className="arch-svg interactive" viewBox="0 0 940 320" role="img" aria-label="ReconOps pattern">
        <defs>
          <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
          </marker>
        </defs>
        <text x={20} y={24} className="arch-caption">
          Public pattern — scheduler → thin workflow runner → agent API → parallel stages → HITL → actions
        </text>
        {[
          [20, 45, 140, 50, "Schedule", "daily / on-demand"],
          [190, 45, 160, 50, "Thin runner", "start + poll"],
          [380, 45, 160, 50, "Agent API", "graph brains"],
          [570, 45, 160, 50, "Complete?", "terminal status"],
        ].map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <rect x={x} y={y} width={w} height={h} rx="10" className={`arch-box ${i === 2 ? "arch-box-accent" : ""}`} />
            <text x={x + w / 2} y={y + 20} textAnchor="middle" className="arch-title">
              {t}
            </text>
            <text x={x + w / 2} y={y + 36} textAnchor="middle" className="arch-sub">
              {s}
            </text>
            {i < 3 && (
              <line
                x1={x + w + 2}
                y1={y + h / 2}
                x2={x + w + 26}
                y2={y + h / 2}
                className="arch-line"
                markerEnd="url(#arrow3)"
              />
            )}
          </g>
        ))}
        <text x={20} y={130} className="arch-caption">
          Agent pipeline (conceptual)
        </text>
        {[
          [20, 150, 100, 45, "Ingest"],
          [150, 150, 90, 45, "Stage A"],
          [260, 150, 90, 45, "Stage B"],
          [370, 150, 90, 45, "Stage C"],
          [490, 150, 120, 45, "Aggregate"],
          [640, 150, 120, 45, "HITL"],
          [790, 150, 120, 45, "Actions"],
        ].map(([x, y, w, h, t]) => (
          <g key={t}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="10"
              className={`arch-box ${t === "HITL" ? "arch-box-warn" : ""} ${t === "Actions" ? "arch-box-accent" : ""}`}
            />
            <text x={x + w / 2} y={y + 28} textAnchor="middle" className="arch-title">
              {t}
            </text>
          </g>
        ))}
        <text x={250} y={145} className="arch-caption">
          parallel
        </text>
        <text x={470} y={240} textAnchor="middle" className="arch-caption">
          Actions may include notify / ticket / domain API calls — exact routes and templates not published
        </text>
        <text x={470} y={275} textAnchor="middle" className="arch-caption">
          Runner stays thin; agent owns branching, parallelism, and human pause
        </text>
      </svg>
    );
  }

  return null;
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
      "NestJS BFF emits session-gated Kafka events only when an assist session is active. PII is masked before publish. Go SSE fans out to agent dashboards.",
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
      "Failover: multi-broker bus; publish skipped when session gate missing",
    ],
    snippet: {
      title: "Go SSE fan-out (illustrative)",
      language: "Go",
      code: `// Pattern: one goroutine per subscriber, non-blocking fan-out
func (h *Hub) Broadcast(evt Event) {
    h.mu.RLock()
    defer h.mu.RUnlock()
    for id, ch := range h.subs {
        select {
        case ch <- evt: // deliver
        default:
            // slow client — drop or disconnect policy
            go h.drop(id)
        }
    }
}`,
    },
  },
  {
    id: "gatekeeper",
    num: "02",
    label: "Paytm · Agentic Quality",
    title: "PP QA Gatekeeper",
    summary:
      "AI-assisted quality hub for Postpaid Lending: chat/PR/ticket intake, human approval in Slack, then dual automated gates (service checks + full staging journey) before merge allow/block.",
    problem:
      "Changes spanning multiple lending repos needed one AI + human path before production merges.",
    approach:
      "Webhook API persists runs, orchestrates multi-repo workspace jobs, requires Slack HITL, then runs Gate A (services) and Gate B (staging journey). Exact ports, manifests, and internal repo wiring stay private.",
    impact: [
      "Unsafe merges blocked pre-prod",
      "35% less manual PR review effort",
      "One control plane for chat, PR, and ticket→agent intake",
    ],
    tradeoffs: [
      {
        q: "Why Slack HITL before automated gates?",
        a: "Lending blast radius is high — AI prepares the run; humans approve; gates enforce allow/block.",
      },
      {
        q: "Why two gates instead of one?",
        a: "Service checks catch backend breaks early; staging journeys catch FE/automation regressions a unit-green miss.",
      },
    ],
    stackGroups: {
      Core: ["FastAPI", "MongoDB"],
      AI: ["Cursor Cloud Agents"],
      Collab: ["Slack", "Jira", "Bitbucket"],
      Quality: ["Service gates", "Staging journeys"],
    },
    diagram: "gatekeeper",
    decisions: [
      "Human approve is mandatory before gates",
      "Dual gate: services then end-to-end staging",
      "Public site shows pattern only — implementation details withheld",
    ],
    sequence: [
      "Intake from chat / PR / ticket channels",
      "Webhook API records the run",
      "Orchestrator schedules multi-repo jobs",
      "Human approve (HITL)",
      "Gate A — service checks",
      "Gate B — staging journey",
      "Allow or block merge",
    ],
    constraints: [
      "HITL required before automated gates",
      "Fail closed when secrets missing",
      "Merge only after both gates",
    ],
  },
  {
    id: "recon",
    num: "03",
    label: "Paytm · Ops / Agentic",
    title: "ReconOps — Thin runner + agent graph",
    summary:
      "Lender–Paytm reconciliation: a thin workflow runner starts/polls the job; an agent graph does ingest → parallel stages → aggregate → optional HITL → actions (notify / ticket / domain APIs).",
    problem:
      "Fire-and-forget jobs looked green while work failed; ops needed terminal status plus a real agent pipeline with a human pause before side effects.",
    approach:
      "Runner stays thin (start + poll to completed). Agent API owns branching, parallel stage work, HITL analyze, and execution. Daily HITL and auto templates exist — names, cron, and API paths not published here.",
    impact: [
      "Trustworthy completed-only outcomes",
      "40% less manual chase effort",
      "Parallel stages + HITL before side effects",
    ],
    tradeoffs: [
      {
        q: "Why keep the runner thin?",
        a: "Scheduler/secrets/poll stay in the runner; agent iteration (graph, HITL, actions) stays faster without YAML sprawl.",
      },
      {
        q: "Why HITL before actions?",
        a: "Analyze can draft notifications/tickets/API updates; humans approve before irreversible execution on the daily path.",
      },
    ],
    stackGroups: {
      Orchestration: ["Argo Workflows", "LangGraph"],
      Pattern: ["Thin runner", "Agent API"],
      Actions: ["Notify", "Tickets", "Domain APIs"],
      Cloud: ["Kubernetes", "Secrets", "Object storage"],
    },
    diagram: "recon",
    decisions: [
      "Runner: start job + poll until completed",
      "Agent: ingest → parallel stages → aggregate → HITL → actions",
      "Public diagrams omit routes, templates, and schedules",
    ],
    sequence: [
      "Schedule or on-demand trigger",
      "Thin runner starts agent job",
      "Ingest",
      "Parallel stages A/B/C",
      "Aggregate",
      "Optional HITL analyze",
      "Actions (notify / ticket / APIs)",
      "Runner confirms completed",
    ],
    constraints: [
      "Green only on terminal completed status",
      "HITL on the human-approved daily path",
      "Exact API contracts withheld publicly",
    ],
    snippet: {
      title: "Agent graph shape (illustrative)",
      language: "Python",
      code: `# Pattern: parallel stages then HITL before side effects
graph = StateGraph(ReconState)
graph.add_node("ingest", ingest)
graph.add_node("stage_a", stage_a)
graph.add_node("stage_b", stage_b)
graph.add_node("stage_c", stage_c)
graph.add_node("aggregate", aggregate)
graph.add_node("hitl", hitl_pause)
graph.add_node("actions", execute_actions)

graph.add_edge("ingest", "stage_a")
graph.add_edge("ingest", "stage_b")
graph.add_edge("ingest", "stage_c")
graph.add_edge("stage_a", "aggregate")
graph.add_edge("stage_b", "aggregate")
graph.add_edge("stage_c", "aggregate")
graph.add_conditional_edges("aggregate", needs_human, {"yes": "hitl", "no": "actions"})
graph.add_edge("hitl", "actions")`,
    },
  },
  {
    id: "indiamart-buyleads",
    num: "04",
    label: "IndiaMART · Platform",
    title: "Buyleads Platform — Go Migration and Latency",
    summary:
      "Owned high-traffic Buyleads display/purchase paths: legacy→Go migration, pgx pooling, Redis caching, and infra re-architecture for cost and p99.",
    problem:
      "Legacy services burned memory/CPU and p99 latency; infra cost and irrelevant-lead noise hurt marketplace conversion.",
    approach:
      "Spearheaded Go rewrite with pgx connection pooling and Redis; re-architected Buyleads display paths and optimized APIs on GCP/Kubernetes.",
    impact: [
      "+40% throughput · ~60% lower P99",
      "₹2.47M annual infra savings",
      "Stronger Buyleads conversion / relevance signal",
    ],
    tradeoffs: [
      {
        q: "Why Go + pgx over staying on legacy stacks?",
        a: "Lower memory per request and explicit pooling cut p99 ~60% while unlocking ₹2.47M/year infra savings.",
      },
    ],
    stackGroups: {
      Language: ["Go"],
      Data: ["PostgreSQL", "pgx", "Redis"],
      Cloud: ["GCP", "Kubernetes"],
      Domain: ["Buyleads", "Marketplace B2B"],
    },
  },
  {
    id: "indiamart-events-ai",
    num: "05",
    label: "IndiaMART · Events + AI",
    title: "Kafka Fan-out, LLM Pipelines and LangGraph Scoring",
    summary:
      "Event-driven notifications at sub-second latency, GCP LLM document pipelines, and LangGraph lead scoring with sales stakeholders.",
    problem:
      "Engagement lagged without real-time fan-out; manual extraction and slow lead triage left revenue on the table.",
    approach:
      "Kafka + Redis pub/sub broadcaster; GCP LLM pipelines for 50K+ files/month; LangGraph workflows flagging ~20% of 8K+ weekly leads as high-risk.",
    impact: [
      "+51.7% platform transactions from real-time engagement",
      "90% automation of manual extraction",
      "8K+ leads/week scored · ~20% high-risk for follow-up",
    ],
    tradeoffs: [
      {
        q: "Why Kafka + Redis together?",
        a: "Kafka for durable fan-out; Redis for hot pub/sub and sub-second delivery under concurrency.",
      },
    ],
    stackGroups: {
      Messaging: ["Kafka", "Redis"],
      AI: ["LangGraph", "GCP LLM", "Vertex / Gemini"],
      Language: ["Python", "Go"],
      Domain: ["Marketplace B2B"],
    },
  },
  {
    id: "artolio",
    num: "06",
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
  },
  {
    id: "nl2sql",
    num: "07",
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
    snippet: {
      title: "AST SQL safety gate (illustrative)",
      language: "Python",
      code: `FORBIDDEN = {"Drop", "Delete", "Truncate", "Alter"}

def assert_safe_select(sql: str, allowed_tables: set[str]) -> None:
    tree = sqlglot.parse_one(sql)
    if tree.find(sqlglot.exp.Drop) or tree.find(sqlglot.exp.Delete):
        raise ValueError("destructive statement blocked")
    tables = {t.name for t in tree.find_all(sqlglot.exp.Table)}
    if not tables.issubset(allowed_tables):
        raise ValueError("unauthorized table reference")
    # only SELECT-shaped trees proceed to the warehouse`,
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
            <a className="btn btn-ghost" href={RESUME_PDF} download="Mayank-August-2026-2.pdf">
              Download Resume (PDF)
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

                  {p.snippet && (
                    <CodeSnippet title={p.snippet.title} language={p.snippet.language} code={p.snippet.code} />
                  )}

                  {p.diagram && (
                    <div className="design-panel">
                      <div className="design-panel-head">
                        <div>
                          <h4>System design</h4>
                          <p>Public architecture pattern — implementation details, ports, and internal names withheld.</p>
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
