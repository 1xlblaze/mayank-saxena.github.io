export const PROJECT_FILTERS = ["All", "Paytm", "IndiaMART", "Agentic AI", "Personal"];

export const projects = [
  {
    id: "nexus",
    num: "01",
    filter: ["Paytm"],
    featured: true,
    accent: "teal",
    label: "Paytm Lending · Core",
    title: "Workflow Nexus",
    kicker: "Central FSM orchestrator",
    summary:
      "Go-based, config-driven finite-state orchestration for the full loan lifecycle — new products and lenders ship as configuration, not deploys.",
    problem:
      "Each lending product grew its own state machine. Adding a lender meant code, review, and a release train for journeys that were 90% the same.",
    approach:
      "One Go service owns HTTP + async ingress (Kafka / SQS). FSM schemas live in a document store; Redis caches hot paths; PostgreSQL holds durable lead state. Hard/soft reset recovers stuck leads without operator folklore.",
    impact: [
      "New lenders via config, not code deploys",
      "Central state machine across LOC, EMI, post-onboarding",
      "120+ journey stages mapped to frontend contracts",
    ],
    tradeoffs: [
      {
        q: "Why config-over-code for FSMs?",
        a: "Lending products share shape; the variance is transitions, guards, and side-effects. Schemas iterate faster than binaries, with one orchestrator to observe and reset.",
      },
      {
        q: "Why both Kafka and SQS?",
        a: "Bus events (bureau, risk) want replay and fan-out; lender callbacks want simple, durable queues. Two ingresses, one apply() path.",
      },
    ],
    stackGroups: {
      Language: ["Go", "Fiber"],
      Data: ["MongoDB", "PostgreSQL", "Redis"],
      Messaging: ["Kafka", "SQS"],
      Pattern: ["Config-driven FSM"],
    },
    diagram: "nexus",
    sequence: [
      "Client submits via BFF",
      "Nexus loads product FSM schema",
      "Guard + transition + persist",
      "Async events (Kafka / SQS) re-enter apply()",
      "State mapped to frontend contract",
    ],
    constraints: [
      "Public pattern only — product codes and internal topic names withheld",
      "Stuck-lead recovery via hard/soft reset, not ad-hoc DB edits",
      "Schema changes are reviews; runtime stays one binary",
    ],
    decisions: [
      "Document store for schemas, relational store for lead state",
      "Single apply() for HTTP and async so invariants stay in one place",
    ],
    snippet: {
      title: "FSM apply path (illustrative)",
      language: "Go",
      code: `func (n *Nexus) Apply(ctx context.Context, lead Lead, ev Event) error {
    schema, err := n.schemas.Load(lead.Product)
    if err != nil {
        return err
    }
    next, err := schema.Transition(lead.State, ev)
    if err != nil {
        return err
    }
    return n.store.Commit(ctx, lead.ID, next)
}`,
    },
  },
  {
    id: "bff",
    num: "02",
    filter: ["Paytm"],
    featured: true,
    accent: "teal",
    label: "Paytm Lending · Gateway",
    title: "lending-bff-fe",
    kicker: "NestJS backend-for-frontend",
    summary:
      "The orchestration layer between lending apps and 15+ backends — signal-based routing, shared KYC mixins, schema-driven pages.",
    problem:
      "Each app was becoming a switchboard: product rules, lender quirks, and page schemas leaked into the client and duplicated across services.",
    approach:
      "NestJS BFF owns journey orchestration. Handlers are selected by journey signal, not a thick if/else. Mixins share KYC / video-KYC / account-aggregator paths. Downstream calls are typed, retried, and traced.",
    impact: [
      "Single orchestration layer for multi-product lending",
      "Schema-driven UI — pages compose from backend contracts",
      "15+ integrations behind one client-facing API",
    ],
    tradeoffs: [
      {
        q: "Why a BFF instead of clients talking to each service?",
        a: "Clients should not know 15 retry policies, auth edges, or product forks. The BFF is the place mixins and signal routing actually pay rent.",
      },
      {
        q: "Why signal-based handlers?",
        a: "Loan state is the routing key. New states register a handler; they do not grow a god-switch in the controller.",
      },
    ],
    stackGroups: {
      Framework: ["NestJS 10", "TypeScript"],
      Data: ["MySQL", "Redis"],
      Messaging: ["Kafka"],
      Observability: ["OpenTelemetry"],
    },
    diagram: "bff",
    sequence: [
      "App requests schema or submit",
      "BFF resolves journey signal",
      "Handler + mixins call downstreams",
      "Response shaped as page schema / next state",
    ],
    constraints: [
      "Downstream names on the public site are pattern-level only",
      "Client never holds lender-specific branching",
    ],
    decisions: [
      "Mixins for shared KYC-class flows",
      "Schema builder so FE stays declarative",
    ],
    snippet: {
      title: "Signal routing (illustrative)",
      language: "TypeScript",
      code: `@Signal('VKYC_PENDING')
async handleVkyc(ctx: JourneyCtx) {
  const session = await this.kyc.resume(ctx.leadId);
  return this.pages.build(ctx.product, {
    state: 'VKYC_PENDING',
    session,
  });
}`,
    },
  },
  {
    id: "lead-assist",
    num: "03",
    filter: ["Paytm"],
    featured: true,
    accent: "teal",
    label: "Paytm Lending · Flagship",
    title: "Lead Assist Live Journey Streaming",
    kicker: "Privacy-safe SSE",
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
      Edge: ["SSE"],
      Framework: ["NestJS BFF"],
    },
    diagram: "lead-assist",
    decisions: [
      "Mask at the BFF edge so analytics never sees raw PII",
      "Fail-fast multi-broker bus config in production",
      "Dedicated session gate vs main BFF cache",
    ],
    sequence: [
      "Client lending UI emits schema fetch/submit",
      "NestJS BFF checks Redis session gate",
      "PII mask (PAN / Aadhaar / phone / DOB)",
      "Kafka publish",
      "Go SSE fan-out + heartbeats",
      "Agent dashboard renders live stage",
    ],
    constraints: [
      "Latency: agent display p95 targeted well under interactive thresholds (~60% cut vs prior)",
      "Scale: 10K+ concurrent SSE connections on Go goroutines",
      "Privacy: no raw PII on Kafka / analytics topics",
      "Failover: publish skipped when session gate missing",
    ],
    snippet: {
      title: "Go SSE fan-out (illustrative)",
      language: "Go",
      code: `func (h *Hub) Broadcast(evt Event) {
    h.mu.RLock()
    defer h.mu.RUnlock()
    for id, ch := range h.subs {
        select {
        case ch <- evt:
        default:
            go h.drop(id)
        }
    }
}`,
    },
  },
  {
    id: "gatekeeper",
    num: "04",
    filter: ["Paytm", "Agentic AI"],
    featured: true,
    accent: "purple",
    label: "Paytm · Agentic Quality",
    title: "PP QA Gatekeeper",
    kicker: "Dual-gate merge control",
    summary:
      "AI-assisted quality hub: chat / PR / ticket intake, human approval in Slack, then dual automated gates before merge allow/block.",
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
      Quality: ["Coverage delta", "Playwright E2E"],
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
    snippet: {
      title: "Dual-gate orchestration (illustrative)",
      language: "Python",
      code: `async def run_gates(run_id: str) -> str:
    await wait_hitl(run_id)
    a = await gate_services(run_id)   # coverage, db diff, unit
    if a.failed:
        return "BLOCKED"
    b = await gate_staging(run_id)    # mocks, e2e, logs
    return "MERGEABLE" if b.passed else "BLOCKED"`,
    },
  },
  {
    id: "recon",
    num: "05",
    filter: ["Paytm", "Agentic AI"],
    featured: true,
    accent: "purple",
    label: "Paytm · Ops / Agentic",
    title: "ReconOps — Thin runner + agent graph",
    kicker: "LangGraph reconciliation",
    summary:
      "Lender–Paytm LAN mismatch reconciliation: a thin runner starts/polls; an agent graph does ingest → parallel stages → aggregate → HITL → actions.",
    problem:
      "Fire-and-forget jobs looked green while work failed; ops needed terminal status plus a real agent pipeline with a human pause before side effects.",
    approach:
      "Runner stays thin (start + poll to completed). Agent API owns branching, parallel stage work, HITL analyze, and execution. Triage/math is pure Python; LLMs interpret and draft — they do not decide.",
    impact: [
      "Trustworthy completed-only outcomes",
      "40% less manual chase effort",
      "~5K+ LANs/day automated (parallel S1/S2/S3)",
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
      Data: ["Trino", "PostgreSQL checkpoint"],
      Actions: ["Notify", "Tickets", "Object storage"],
    },
    diagram: "recon",
    decisions: [
      "Runner: start job + poll until completed",
      "Agent: ingest → parallel stages → aggregate → HITL → actions",
      "LLMs draft; Python owns triage math",
    ],
    sequence: [
      "Schedule or on-demand trigger",
      "Thin runner starts agent job",
      "Ingest + pandas triage",
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
    volumes: [
      { id: "S1", title: "Closed at Paytm, active at lender", volume: "~580 / day" },
      { id: "S2", title: "Active at Paytm, closed at lender", volume: "~3 / day" },
      { id: "S3", title: "Lender-only, missing at Paytm", volume: "~4500 / day" },
    ],
    snippet: {
      title: "Agent graph shape (illustrative)",
      language: "Python",
      code: `graph = StateGraph(ReconState)
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
graph.add_conditional_edges("aggregate", needs_human, {"yes": "hitl", "no": "actions"})
graph.add_edge("hitl", "actions")`,
    },
  },
  {
    id: "pp-recon",
    num: "06",
    filter: ["Paytm", "Agentic AI"],
    featured: true,
    accent: "purple",
    label: "Paytm · Funnel Health",
    title: "PP Onboarding Recon",
    kicker: "Hourly funnel watchdog",
    summary:
      "Hourly postpaid funnel health: ClickHouse baselines, z-score breach detection, Python RCA draft, agent enrichment, then Jira + Slack.",
    problem:
      "Funnel success-rate drops were found late, in standup, after the window to intervene had closed.",
    approach:
      "Scheduled job: collect → evaluate (7-day median + z-score) → write RCA draft → specialist agent polishes with log/funnel context → Jira + Slack. Humans still own the call; the loop just never sleeps.",
    impact: [
      "Proactive funnel health instead of next-day autopsies",
      "Agent-enriched RCA with human oversight",
      "Breach vs healthy posted on a predictable cadence",
    ],
    tradeoffs: [
      {
        q: "Why z-score on a 7-day median?",
        a: "Absolute SR thresholds lie on weekends and campaigns. A rolling median plus z-score flags the unusual, not the merely lower.",
      },
      {
        q: "Why a Python draft before the agent?",
        a: "Numbers are deterministic. The agent adds log/funnel narrative; it does not invent the breach.",
      },
    ],
    stackGroups: {
      Language: ["Python"],
      Data: ["ClickHouse"],
      Agents: ["Cursor agent", "MCP"],
      Collab: ["Jira", "Slack"],
    },
    diagram: "pp-recon",
    sequence: [
      "Collect funnel tables",
      "Evaluate vs 7d median + z-score",
      "Write RCA draft (Python)",
      "Agent enriches with logs / funnel context",
      "Create Jira + notify Slack",
    ],
    constraints: [
      "Public site omits channel names, hosts, and query catalogs",
      "Agent enriches; thresholds stay in code",
    ],
    decisions: [
      "Fail open to a healthy heartbeat so silence is itself a signal",
      "SLA tracked on the ticket, not in chat",
    ],
    snippet: {
      title: "Threshold evaluation (illustrative)",
      language: "Python",
      code: `def is_breach(sr: float, median_7d: float, std_7d: float, z: float = 2.0) -> bool:
    if std_7d <= 0:
        return False
    return abs(sr - median_7d) / std_7d >= z`,
    },
  },
  {
    id: "indiamart-buyleads",
    num: "07",
    filter: ["IndiaMART"],
    featured: true,
    accent: "amber",
    label: "IndiaMART · Platform",
    title: "Buyleads Platform — Go Migration",
    kicker: "Latency, cost, relevance",
    summary:
      "Owned high-traffic Buyleads display/purchase paths: legacy→Go migration, pgx pooling, Redis caching, and infra re-architecture for cost and p99.",
    problem:
      "Legacy services burned memory/CPU and p99 latency; infra cost and irrelevant-lead noise hurt marketplace conversion.",
    approach:
      "Spearheaded Go rewrite with pgx connection pooling and Redis; re-architected Buyleads display paths and optimized APIs on GCP/Kubernetes.",
    impact: [
      "+40% throughput · ~60% lower P99",
      "₹2.47M annual infra savings",
      "55% reduction in irrelevant leads · 20+ services at 0% delay",
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
    diagram: "buyleads",
    sequence: [
      "Request hits Go display/purchase path",
      "Redis cache or pgx pool to PostgreSQL",
      "Relevance filters applied before render",
    ],
    constraints: [
      "Owned display and purchase paths end-to-end",
      "Migration had to keep marketplace SLAs during cutover",
    ],
    decisions: [
      "Pool in the app, not a mystery sidecar",
      "Cache the hot read path; keep purchase strongly consistent",
    ],
    beforeAfter: {
      before: [
        { k: "P99", v: "~2000ms" },
        { k: "Throughput", v: "Baseline" },
        { k: "Infra", v: "₹2.47M / yr extra" },
        { k: "Relevance", v: "Noisy" },
      ],
      after: [
        { k: "P99", v: "~800ms (−60%)" },
        { k: "Throughput", v: "+40%" },
        { k: "Infra", v: "₹0 extra" },
        { k: "Relevance", v: "−55% junk leads" },
      ],
    },
    snippet: {
      title: "pgx pooling (illustrative)",
      language: "Go",
      code: `cfg, _ := pgxpool.ParseConfig(os.Getenv("DATABASE_URL"))
cfg.MaxConns = 32
cfg.MinConns = 8
cfg.MaxConnIdleTime = 5 * time.Minute
pool, err := pgxpool.NewWithConfig(ctx, cfg)
rows, err := pool.Query(ctx, displaySQL, userID)`,
    },
  },
  {
    id: "indiamart-events-ai",
    num: "08",
    filter: ["IndiaMART", "Agentic AI"],
    featured: false,
    accent: "purple",
    label: "IndiaMART · Events + AI",
    title: "Kafka Fan-out, LLM Pipelines and LangGraph Scoring",
    kicker: "Realtime + models",
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
      AI: ["LangGraph", "GCP LLM"],
      Language: ["Python", "Go"],
      Domain: ["Marketplace B2B"],
    },
  },
  {
    id: "artolio",
    num: "09",
    filter: ["Personal"],
    featured: false,
    accent: "amber",
    label: "Personal · Marketplace",
    title: "Artolio (Gigsetu) — Hyperlocal Artist Marketplace",
    kicker: "Geo-first B2C",
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
    num: "10",
    filter: ["Personal", "Agentic AI"],
    featured: false,
    accent: "purple",
    label: "Hackathon Winner · 2025",
    title: "NL-to-SQL RAG Engine",
    kicker: "Schema-aware, AST-gated",
    summary:
      "Schema-aware RAG that turns natural language into AST-validated SQL across multi-table enterprise schemas.",
    problem: "Raw LLM SQL hallucinates columns and can emit destructive statements.",
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
        raise ValueError("unauthorized table reference")`,
    },
  },
];
