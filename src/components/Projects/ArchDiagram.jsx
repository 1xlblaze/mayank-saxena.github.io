function Box({ x, y, w, h, t, s, variant = "", onClick, active }) {
  const cls = `arch-box arch-node ${variant} ${active ? "arch-box-active" : ""}`;
  return (
    <g className={onClick ? "arch-clickable" : ""} onClick={onClick} role={onClick ? "button" : undefined}>
      <rect x={x} y={y} width={w} height={h} rx="10" className={cls} />
      <text x={x + w / 2} y={s ? y + 22 : y + h / 2 + 4} textAnchor="middle" className="arch-title">
        {t}
      </text>
      {s && (
        <text x={x + w / 2} y={y + 40} textAnchor="middle" className="arch-sub">
          {s}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, marker = "url(#ms-arrow)" }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="arch-line" markerEnd={marker} />;
}

function Defs() {
  return (
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <marker id="ms-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#3dd6c6" />
      </marker>
    </defs>
  );
}

export function ArchDiagram({ type, selected, onSelect }) {
  if (type === "nexus") {
    const nodes = [
      { id: "fe", x: 20, y: 90, w: 130, h: 56, t: "Lending App", s: "submit / schema" },
      { id: "bff", x: 180, y: 90, w: 130, h: 56, t: "BFF", s: "orchestrate" },
      { id: "nx", x: 340, y: 90, w: 150, h: 56, t: "Nexus FSM", s: "Go apply()", variant: "arch-box-accent" },
      { id: "mongo", x: 540, y: 20, w: 120, h: 50, t: "Schemas", s: "document store" },
      { id: "redis", x: 680, y: 20, w: 120, h: 50, t: "Cache", s: "Redis" },
      { id: "pg", x: 540, y: 160, w: 120, h: 50, t: "Lead state", s: "PostgreSQL" },
      { id: "bus", x: 680, y: 160, w: 200, h: 50, t: "Async ingress", s: "Kafka + SQS" },
    ];
    return (
      <svg className="arch-svg interactive" viewBox="0 0 920 250" role="img" aria-label="Workflow Nexus architecture">
        <Defs />
        {nodes.map((n) => (
          <Box key={n.id} {...n} active={selected === n.id} onClick={onSelect ? () => onSelect(n.id) : undefined} />
        ))}
        <Arrow x1={150} y1={118} x2={176} y2={118} />
        <Arrow x1={310} y1={118} x2={336} y2={118} />
        <Arrow x1={415} y1={90} x2={415} y2={72} />
        <Arrow x1={490} y1={118} x2={536} y2={185} />
        <text x={460} y={240} textAnchor="middle" className="arch-caption">
          Config-driven FSMs · HTTP + async share one apply() · public pattern only
        </text>
      </svg>
    );
  }

  if (type === "bff") {
    const spokes = [
      [20, 170, "Orchestration"],
      [160, 170, "Workflows"],
      [300, 170, "Lender APIs"],
      [440, 170, "Risk / BRE"],
      [580, 170, "KYC"],
      [720, 170, "MySQL · Redis · Kafka"],
    ];
    return (
      <svg className="arch-svg interactive" viewBox="0 0 920 250" role="img" aria-label="BFF integration web">
        <Defs />
        <Box x={300} y={24} w={280} h={56} t="Lending apps" s="postpaid · LOC · EMI" />
        <Arrow x1={440} y1={80} x2={440} y2={104} />
        <Box
          x={300}
          y={104}
          w={280}
          h={52}
          t="lending-bff-fe"
          s="@Signal routing"
          variant="arch-box-accent"
          active={selected === "bff"}
          onClick={onSelect ? () => onSelect("bff") : undefined}
        />
        {spokes.map(([x, y, t], i) => (
          <g key={t}>
            <Arrow x1={440} y1={156} x2={x + 70} y2={y} />
            <Box
              x={x}
              y={y}
              w={i === 5 ? 180 : 130}
              h={48}
              t={t}
              active={selected === t}
              onClick={onSelect ? () => onSelect(t) : undefined}
            />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "lead-assist") {
    const nodes = [
      [20, 100, 120, 55, "Lending App", "Client", ""],
      [170, 100, 120, 55, "NestJS BFF", "Events", ""],
      [320, 100, 120, 55, "Redis Gate", "Session?", ""],
      [470, 100, 120, 55, "PII Mask", "PAN/Aadhaar", "arch-box-warn"],
      [620, 100, 120, 55, "Kafka", "Topic", ""],
      [770, 100, 120, 55, "Go SSE", "10K+ conns", "arch-box-accent"],
    ];
    return (
      <svg className="arch-svg interactive" viewBox="0 0 920 280" role="img" aria-label="Lead Assist architecture">
        <Defs />
        {nodes.map(([x, y, w, h, t, s, v], i) => (
          <g key={t}>
            <Box x={x} y={y} w={w} h={h} t={t} s={s} variant={v} active={selected === t} onClick={onSelect ? () => onSelect(t) : undefined} />
            {i < 5 && <Arrow x1={x + w + 2} y1={y + h / 2} x2={x + w + 26} y2={y + h / 2} />}
          </g>
        ))}
        <Box x={770} y={185} w={120} h={48} t="Agent UI" s="Dashboard" variant="arch-box-accent" />
        <Arrow x1={830} y1={155} x2={830} y2={183} />
        <text x={460} y={50} textAnchor="middle" className="arch-caption">
          Session-gated publish · PII stripped before the bus · SSE fan-out to agents
        </text>
      </svg>
    );
  }

  if (type === "gatekeeper") {
    const top = [
      [20, 45, 150, 48, "Intake", "Chat / PR / Ticket"],
      [200, 45, 150, 48, "Webhook API", "run intake"],
      [380, 45, 140, 48, "Run store", "audit log"],
      [550, 45, 150, 48, "Orchestrator", "multi-repo jobs"],
      [730, 45, 160, 48, "Human approve", "Slack HITL"],
    ];
    const bot = [
      [20, 150, 220, 50, "Gate A — Services", "coverage · db · unit"],
      [280, 150, 240, 50, "Gate B — Staging", "e2e · logs"],
      [560, 150, 200, 50, "Merge decision", "allow / block"],
    ];
    return (
      <svg className="arch-svg interactive" viewBox="0 0 940 300" role="img" aria-label="QA Gatekeeper pattern">
        <Defs />
        <text x={20} y={24} className="arch-caption">
          Intake → webhook → run log → HITL → dual quality gates
        </text>
        {top.map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <Box
              x={x}
              y={y}
              w={w}
              h={h}
              t={t}
              s={s}
              variant={i === 4 ? "arch-box-warn" : ""}
              active={selected === t}
              onClick={onSelect ? () => onSelect(t) : undefined}
            />
            {i < 4 && <Arrow x1={x + w + 2} y1={y + h / 2} x2={x + w + 26} y2={y + h / 2} />}
          </g>
        ))}
        {bot.map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <Box
              x={x}
              y={y}
              w={w}
              h={h}
              t={t}
              s={s}
              variant={i === 2 ? "arch-box-accent" : ""}
              active={selected === t}
              onClick={onSelect ? () => onSelect(t) : undefined}
            />
            {i < 2 && <Arrow x1={x + w + 2} y1={y + h / 2} x2={x + w + 26} y2={y + h / 2} />}
          </g>
        ))}
        <text x={470} y={250} textAnchor="middle" className="arch-caption">
          Pattern only — ports, secrets, repo manifests, and internal names withheld
        </text>
      </svg>
    );
  }

  if (type === "recon") {
    const pipe = [
      [20, 150, 100, 45, "Ingest"],
      [150, 150, 90, 45, "S1"],
      [260, 150, 90, 45, "S2"],
      [370, 150, 90, 45, "S3"],
      [490, 150, 120, 45, "Aggregate"],
      [640, 150, 120, 45, "HITL"],
      [790, 150, 120, 45, "Actions"],
    ];
    return (
      <svg className="arch-svg interactive" viewBox="0 0 940 280" role="img" aria-label="ReconOps pattern">
        <Defs />
        <text x={20} y={24} className="arch-caption">
          Scheduler → thin runner → agent graph → parallel stages → HITL → actions
        </text>
        <Box x={20} y={45} w={140} h={50} t="Schedule" s="daily / on-demand" />
        <Box x={190} y={45} w={160} h={50} t="Thin runner" s="start + poll" />
        <Box x={380} y={45} w={160} h={50} t="Agent API" s="graph brains" variant="arch-box-accent" />
        <Box x={570} y={45} w={160} h={50} t="Complete?" s="terminal status" />
        <Arrow x1={160} y1={70} x2={186} y2={70} />
        <Arrow x1={350} y1={70} x2={376} y2={70} />
        <Arrow x1={540} y1={70} x2={566} y2={70} />
        {pipe.map(([x, y, w, h, t]) => (
          <Box
            key={t}
            x={x}
            y={y}
            w={w}
            h={h}
            t={t}
            variant={t === "HITL" ? "arch-box-warn" : t === "Actions" ? "arch-box-accent" : ""}
            active={selected === t}
            onClick={onSelect ? () => onSelect(t) : undefined}
          />
        ))}
        <text x={250} y={140} className="arch-caption">
          parallel
        </text>
        <text x={470} y={230} textAnchor="middle" className="arch-caption">
          Triage is Python; LLMs draft. Runner stays thin; agent owns branching and pause.
        </text>
      </svg>
    );
  }

  if (type === "pp-recon") {
    const steps = [
      [20, 80, 150, 55, "ClickHouse", "funnel tables"],
      [200, 80, 160, 55, "Evaluate", "7d median + z"],
      [390, 80, 150, 55, "RCA draft", "Python"],
      [570, 80, 160, 55, "Agent polish", "logs + context"],
      [760, 80, 150, 55, "Jira + Slack", "track SLA"],
    ];
    return (
      <svg className="arch-svg interactive" viewBox="0 0 940 220" role="img" aria-label="Funnel health recon">
        <Defs />
        {steps.map(([x, y, w, h, t, s], i) => (
          <g key={t}>
            <Box
              x={x}
              y={y}
              w={w}
              h={h}
              t={t}
              s={s}
              variant={i === 3 ? "arch-box-accent" : ""}
              active={selected === t}
              onClick={onSelect ? () => onSelect(t) : undefined}
            />
            {i < 4 && <Arrow x1={x + w + 2} y1={y + h / 2} x2={x + w + 26} y2={y + h / 2} />}
          </g>
        ))}
        <text x={470} y={180} textAnchor="middle" className="arch-caption">
          Hourly collect → evaluate → draft → enrich → ticket. Agent narrates; thresholds stay in code.
        </text>
      </svg>
    );
  }

  if (type === "buyleads") {
    return (
      <svg className="arch-svg interactive" viewBox="0 0 920 220" role="img" aria-label="Buyleads before after">
        <Defs />
        <Box x={40} y={50} w={280} h={120} t="Legacy path" s="high mem · P99 ~2s" variant="arch-box-warn" />
        <Box x={600} y={50} w={280} h={120} t="Go + pgx + Redis" s="P99 −60% · +40% tput" variant="arch-box-accent" />
        <Arrow x1={340} y1={110} x2={580} y2={110} />
        <text x={460} y={104} textAnchor="middle" className="arch-title">
          rewrite
        </text>
        <text x={460} y={200} textAnchor="middle" className="arch-caption">
          Display + purchase owned end-to-end · ₹2.47M/year infra saved
        </text>
      </svg>
    );
  }

  return null;
}

export const DIAGRAM_HINTS = {
  nexus: {
    fe: "Apps never hold FSM rules — they submit events and render the mapped state.",
    bff: "BFF translates product UX into Nexus events and page schemas.",
    nx: "One apply() for HTTP and async so transitions cannot diverge.",
    mongo: "Schemas versioned in a document store — config, not a release.",
    redis: "Hot schema and session cache.",
    pg: "Durable lead state, not the place for ad-hoc operator edits.",
    bus: "Kafka for fan-out domain events; SQS for lender callbacks.",
  },
  bff: {
    bff: "Signal → handler. Mixins cover shared KYC-class work.",
    Orchestration: "Upstream journey/orchestration services.",
    Workflows: "Nexus and sibling workflow engines.",
    "Lender APIs": "Lender integration layer — contracts not published here.",
    "Risk / BRE": "Decisioning. BFF does not re-implement policy.",
    KYC: "Identity and video-KYC adapters.",
    "MySQL · Redis · Kafka": "App state, cache, and the event bus.",
  },
  "lead-assist": {
    "Lending App": "Customer events only leave the app as schema fetch / submit.",
    "NestJS BFF": "Checks the Redis gate, then masks PII before Kafka.",
    "Redis Gate": "O(1) existence check. No agent watching → no publish.",
    "PII Mask": "PAN / Aadhaar / phone / DOB stripped at publish, log, and storage.",
    Kafka: "Durable bus. Payload is already masked.",
    "Go SSE": "Goroutine fan-out, 10K+ concurrent, slow clients dropped.",
  },
  gatekeeper: {
    Intake: "Chat, PR webhook, or ticket → one run record.",
    "Webhook API": "Auth’d intake. Fail closed if secrets missing.",
    "Run store": "Audit log for HITL and gates.",
    Orchestrator: "Multi-repo jobs, still pattern-level here.",
    "Human approve": "Slack HITL is mandatory before Gate A.",
    "Gate A — Services": "Coverage delta, DB diff, unit.",
    "Gate B — Staging": "Playwright journey + log classify.",
    "Merge decision": "MERGEABLE only after both gates.",
  },
  recon: {
    Ingest: "Pandas triage on the daily book files.",
    S1: "Closed at Paytm, active at lender — ~580/day.",
    S2: "Active at Paytm, closed at lender — rare, ~3/day.",
    S3: "Lender-only missing at Paytm — bulk, ~4500/day.",
    Aggregate: "Python math, not the LLM.",
    HITL: "Slack pause before side effects.",
    Actions: "Notify / ticket / object storage — routes unpublished.",
  },
  "pp-recon": {
    ClickHouse: "Funnel tables, not the warehouse catalog.",
    Evaluate: "7d median + z-score. Weekends do not fake a breach.",
    "RCA draft": "Deterministic Python numbers.",
    "Agent polish": "Logs + funnel context. Agent narrates, does not invent.",
    "Jira + Slack": "Ticket owns the SLA.",
  },
};
