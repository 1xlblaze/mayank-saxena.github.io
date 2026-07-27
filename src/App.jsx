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

  if (type === "gatekeeper") {
    return (
      <svg className="arch-svg" viewBox="0 0 940 320" role="img" aria-label="PP QA Gatekeeper architecture">
        <defs>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
          </marker>
        </defs>
        <text x={20} y={24} className="arch-caption">
          Intake: Cursor chat QA · Bitbucket PR Gatekeeper · Jira → Cursor Cloud
        </text>
        {[
          [20, 45, 150, 48, "Webhooks", "Jira / BB / Slack"],
          [200, 45, 160, 48, "FastAPI :8765", "pp-qa-gatekeeper"],
          [390, 45, 140, 48, "Mongo", "run log"],
          [560, 45, 150, 48, "Orchestrators", "workspace jobs"],
          [740, 45, 160, 48, "Slack Approve", "HITL"],
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
        <text x={20} y={130} className="arch-caption">
          Dual gates after approval · repos via workspace/repos.manifest.json
        </text>
        {[
          [20, 150, 200, 50, "Gate 1 — Service", "nexus / BFF / marvel"],
          [260, 150, 220, 50, "Gate 2 — Staging journey", "FE + automation"],
          [520, 150, 180, 50, "Allow / Block merge", "Bitbucket"],
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
        <text x={20} y={240} className="arch-caption">
          Coordinates: workflow-nexus · lending BFF · marvel · Postpaid FE · automation
        </text>
        <text x={470} y={290} textAnchor="middle" className="arch-caption">
          Slack HITL control plane · Gate 1 service · Gate 2 full staging journey
        </text>
      </svg>
    );
  }

  if (type === "recon") {
    return (
      <svg className="arch-svg" viewBox="0 0 940 340" role="img" aria-label="ReconOps Argo plus LangGraph">
        <defs>
          <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
          </marker>
        </defs>
        <text x={20} y={24} className="arch-caption">
          lending-central-ops · Argo = thin HTTP · LangGraph API = brains
        </text>
        {[
          [20, 45, 150, 50, "Cron 06:00 IST", "or manual"],
          [200, 45, 170, 50, "Argo thin HTTP", "POST /v1/runs"],
          [400, 45, 160, 50, "Poll ~30s", "until completed"],
          [590, 45, 180, 50, "LangGraph API", "recon brains"],
        ].map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <rect x={x} y={y} width={w} height={h} rx="10" className={`arch-box ${i === 3 ? "arch-box-accent" : ""}`} />
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
          LangGraph pipeline
        </text>
        {[
          [20, 150, 100, 45, "Ingest"],
          [150, 150, 70, 45, "S1"],
          [240, 150, 70, 45, "S2"],
          [330, 150, 70, 45, "S3"],
          [430, 150, 120, 45, "Aggregate"],
          [580, 150, 140, 45, "HITL analyze"],
          [750, 150, 160, 45, "Execute"],
        ].map(([x, y, w, h, t]) => (
          <g key={t}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="10"
              className={`arch-box ${t === "HITL analyze" ? "arch-box-warn" : ""} ${t === "Execute" ? "arch-box-accent" : ""}`}
            />
            <text x={x + w / 2} y={y + 28} textAnchor="middle" className="arch-title">
              {t}
            </text>
          </g>
        ))}
        <text x={185} y={145} className="arch-caption">
          parallel
        </text>
        <line x1={120} y1={172} x2={148} y2={172} className="arch-line" markerEnd="url(#arrow3)" />
        <line x1={400} y1={172} x2={428} y2={172} className="arch-line" markerEnd="url(#arrow3)" />
        <line x1={550} y1={172} x2={578} y2={172} className="arch-line" markerEnd="url(#arrow3)" />
        <line x1={720} y1={172} x2={748} y2={172} className="arch-line" markerEnd="url(#arrow3)" />
        <text x={20} y={230} className="arch-caption">
          Execute: email · Jira · LMS · templates recon-ops-daily (+ approve HITL) · recon-ops-run (auto)
        </text>
        <text x={470} y={290} textAnchor="middle" className="arch-caption">
          S1/S2/S3 in parallel · HITL before execution · Argo only wraps POST + poll
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
      "AI-native QA hub for Postpaid Lending: Cursor chat QA, Bitbucket PR Gatekeeper, and Jira → Cursor Cloud intake — FastAPI webhooks, Mongo run log, Slack HITL, then Gate 1 (service) + Gate 2 (full staging journey).",
    problem:
      "Multi-repo Postpaid changes (nexus, BFF, marvel, FE, automation) lacked one orchestrated AI + human path before merge.",
    approach:
      "Core: FastAPI webhooks (:8765) → Mongo run log → orchestrators → Slack approve → Gate 1 service checks + Gate 2 full staging journey. Workspace coordination via repos.manifest.json across workflow-nexus, BFF, marvel, FE, and automation.",
    impact: [
      "Unsafe merges blocked pre-prod across Bitbucket repos",
      "35% less manual PR review effort",
      "One control plane for chat, PR, and Jira→Cloud Agent intake",
    ],
    tradeoffs: [
      {
        q: "Why Slack HITL before Gate 1 / Gate 2?",
        a: "Lending blast radius is high — AI prepares the run; humans approve; then automated service + staging journey gates enforce merge allow/block.",
      },
      {
        q: "Why two gates instead of one staging check?",
        a: "Gate 1 catches service-level breaks early; Gate 2 runs the full staging journey so FE/automation regressions do not slip past a green service check.",
      },
    ],
    stackGroups: {
      Core: ["FastAPI", "MongoDB"],
      AI: ["Cursor", "Cursor Cloud"],
      Collab: ["Slack", "Jira", "Bitbucket"],
      Fleet: ["workflow-nexus", "BFF", "marvel", "FE", "automation"],
    },
    diagram: "gatekeeper",
    decisions: [
      "Webhook intake on :8765 with run persistence in Mongo",
      "Slack approve is mandatory before gates",
      "repos.manifest.json defines multi-repo workspace scope",
    ],
    sequence: [
      "Intake: Cursor chat / Bitbucket PR / Jira → Cursor Cloud",
      "FastAPI webhook (:8765) writes Mongo run log",
      "Orchestrator loads repos.manifest.json workspace",
      "Slack interactive approve (HITL)",
      "Gate 1 — service checks (nexus / BFF / marvel)",
      "Gate 2 — full staging journey (FE + automation)",
      "Allow or block merge",
    ],
    constraints: [
      "HITL required before automated gates",
      "Fail closed on missing webhook secrets",
      "Merge decision only after Gate 1 + Gate 2",
    ],
  },
  {
    id: "recon",
    num: "03",
    label: "Paytm · lending-central-ops",
    title: "ReconOps — Argo (thin HTTP) + LangGraph API",
    summary:
      "LAN mismatch / lender–Paytm reconciliation in lending-central-ops: Argo only POSTs /v1/runs and polls ~30s; LangGraph API is the brains — ingest → S1/S2/S3 parallel → aggregate → HITL analyze → execute (email / Jira / LMS).",
    problem:
      "Fire-and-forget orchestration produced false-green recon; business actions needed a real agent pipeline with an optional human pause.",
    approach:
      "Argo templates recon-ops-daily (+ approve HITL) and recon-ops-run (auto), cron 06:00 IST. Argo stays a thin HTTP client; LangGraph runs ingest, parallel S1/S2/S3, aggregate, HITL pause, then execution via email, Jira, and LMS API calls.",
    impact: [
      "Trustworthy completed-only recon outcomes",
      "40% less manual report / chase effort",
      "Parallel S1/S2/S3 + HITL before side effects",
    ],
    tradeoffs: [
      {
        q: "Why keep Argo thin instead of putting graph logic in the workflow YAML?",
        a: "Argo owns schedule, secrets, and poll-to-complete; LangGraph owns branching, parallel stages, and HITL — cleaner ownership and faster agent iteration.",
      },
      {
        q: "Why HITL pause before execution?",
        a: "Analyze can draft email/Jira/LMS actions; humans approve on recon-ops-daily before irreversible execution. recon-ops-run stays auto when policy allows.",
      },
    ],
    stackGroups: {
      Orchestration: ["Argo Workflows", "LangGraph"],
      Runtime: ["lending-central-ops", "HTTP /v1/runs"],
      Actions: ["Email", "Jira", "LMS API"],
      Cloud: ["EKS", "AWS SM", "S3/DWH"],
    },
    diagram: "recon",
    decisions: [
      "Argo: POST /v1/runs + poll ~30s until completed",
      "LangGraph: ingest → parallel S1/S2/S3 → aggregate → HITL → execute",
      "Templates: recon-ops-daily (+ approve) and recon-ops-run (auto)",
      "Cron 06:00 IST for daily recon",
    ],
    sequence: [
      "Cron 06:00 IST or manual / approve template",
      "Argo POST /v1/runs (thin HTTP)",
      "LangGraph ingest",
      "S1 / S2 / S3 in parallel",
      "Aggregate results",
      "HITL pause (analyze) on daily+approve path",
      "Execute: email / Jira / LMS",
      "Argo poll until status = completed",
    ],
    constraints: [
      "Green only when run status = completed",
      "Parallel fan-out limited to S1/S2/S3 stage contracts",
      "HITL required on recon-ops-daily + approve template",
    ],
    trace: `$ argo submit recon-ops-daily
> POST /v1/runs  → run_id=r_18
> LangGraph: ingest OK
> S1∥S2∥S3 aggregate OK
> HITL pause — analyze draft (email/Jira/LMS)
> approve → execute LMS GET/PATCH + Jira + email
> poll 30s … status=completed
✓ recon green`,
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
    trace: `$ curl -s "$BFF/api/search?lat=28.66&lng=77.43&km=8" | jq '.artists|length'
12
$ curl -s -X POST "$BFF/api/bookings" -d '{"artistId":"a_18","slot":"2026-08-01T10:00+05:30"}'
{"id":"bk_1042","status":"CONFIRMED"}
# PostGIS: ST_DWithin(geom, point, meters) on artists`,
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
