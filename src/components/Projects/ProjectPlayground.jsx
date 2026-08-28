import { useEffect, useState } from "react";

function Panel({ title, children }) {
  return (
    <div className="play">
      <p className="play-kicker">Interactive demo</p>
      <h5>{title}</h5>
      {children}
    </div>
  );
}

function NexusPlay() {
  const states = [
    { id: "NEW", to: "KYC", rule: "on submit + product schema loaded", yaml: "NEW:\n  on: SUBMIT\n  to: KYC\n  guard: schema.exists" },
    { id: "KYC", to: "RISK", rule: "KYC mixin complete (hard fail → TERMINAL)", yaml: "KYC:\n  on: KYC_OK\n  to: RISK\n  side: persist_docs" },
    { id: "RISK", to: "OFFER", rule: "Bureau/BRE callback via Kafka", yaml: "RISK:\n  on: BRE_DONE\n  to: OFFER\n  async: kafka" },
    { id: "OFFER", to: "LIVE", rule: "Customer accept → disburse mapping to FE", yaml: "OFFER:\n  on: ACCEPT\n  to: LIVE\n  map: fe.success" },
  ];
  const [cur, setCur] = useState("NEW");
  const active = states.find((s) => s.id === cur) || states[0];
  return (
    <Panel title="Interactive FSM — click a state">
      <div className="fsm-row">
        {states.map((s, i) => (
          <button key={s.id} type="button" className={`fsm-node ${cur === s.id ? "on" : ""}`} onClick={() => setCur(s.id)}>
            {s.id}
            {i < states.length - 1 && <span className="fsm-arrow">→</span>}
          </button>
        ))}
      </div>
      <p className="play-note">
        <strong>{active.id} → {active.to}</strong> · {active.rule}
      </p>
      <pre className="play-code">{active.yaml}</pre>
      <p className="muted">Config lives in a document store. Public view is a pattern — product codes withheld.</p>
    </Panel>
  );
}

function BffPlay() {
  const signals = [
    { id: "VKYC_PENDING", handler: "handleVkyc", downs: ["KYC", "Workflows"], schema: "page: video-kyc · next: wait" },
    { id: "SURPLUS", handler: "handleSurplus", downs: ["Orchestration", "Lender APIs"], schema: "page: surplus · cta: continue" },
    { id: "FAQ", handler: "handleFaq", downs: ["MySQL · Redis · Kafka"], schema: "page: faq-list · cache: 5m" },
  ];
  const apis = {
    KYC: "POST /kyc/resume · GET /kyc/session  (adapter, not vendor names)",
    Workflows: "POST /nexus/apply · GET /nexus/state/:id",
    Orchestration: "GET /journey/:lead · POST /journey/submit",
    "Lender APIs": "POST /lis/quote · GET /lis/status  (contracts unpublished)",
    "Risk / BRE": "POST /bre/evaluate · Kafka callback",
    "MySQL · Redis · Kafka": "state row · cache key · domain event",
  };
  const [sig, setSig] = useState(signals[0].id);
  const [api, setApi] = useState("KYC");
  const s = signals.find((x) => x.id === sig);
  return (
    <Panel title="@Signal routing + integration surface">
      <div className="chip-row">
        {signals.map((x) => (
          <button key={x.id} type="button" className={`chip ${sig === x.id ? "on" : ""}`} onClick={() => setSig(x.id)}>
            {x.id}
          </button>
        ))}
      </div>
      <p className="play-note">
        <code>@{s.handler}</code> → {s.downs.join(" + ")} · schema <em>{s.schema}</em>
      </p>
      <div className="chip-row">
        {Object.keys(apis).map((k) => (
          <button key={k} type="button" className={`chip ${api === k ? "on" : ""}`} onClick={() => setApi(k)}>
            {k}
          </button>
        ))}
      </div>
      <pre className="play-code">{apis[api]}</pre>
    </Panel>
  );
}

function LeadPlay() {
  const [gate, setGate] = useState(true);
  const [events, setEvents] = useState([]);
  const [conns, setConns] = useState(2400);

  useEffect(() => {
    const t = setInterval(() => {
      setConns((n) => Math.min(10000, n + Math.floor(Math.random() * 180)));
      setEvents((list) => {
        if (!gate) {
          return [{ t: "miss", m: "Redis gate missing — publish skipped" }, ...list].slice(0, 6);
        }
        const stages = ["SCHEMA", "KYC", "OFFER", "SUBMIT"];
        const st = stages[Math.floor(Math.random() * stages.length)];
        return [{ t: "ok", m: `SSE ${st} → agent UI` }, ...list].slice(0, 6);
      });
    }, 1400);
    return () => clearInterval(t);
  }, [gate]);

  return (
    <Panel title="Live SSE simulation">
      <div className="play-actions">
        <button type="button" className={`chip ${gate ? "on" : ""}`} onClick={() => setGate((v) => !v)}>
          Redis gate: {gate ? "agent watching" : "nobody watching"}
        </button>
      </div>
      <div className="scale-meter">
        <span>Fan-out load</span>
        <strong>{conns.toLocaleString()} / 10,000</strong>
        <i style={{ width: `${(conns / 10000) * 100}%` }} />
      </div>
      <ul className="sse-log">
        {events.map((e, i) => (
          <li key={`${e.m}-${i}`} className={e.t}>
            {e.m}
          </li>
        ))}
      </ul>
      <p className="muted">Publish only when the session key exists. PII is stripped before the bus — toggle it in the demo above.</p>
    </Panel>
  );
}

function GatePlay() {
  const steps = [
    { t: "PR opened", d: "Webhook records the run." },
    { t: "Slack HITL", d: "Human must approve before any gate." },
    { t: "Gate A — services", d: "Coverage delta, DB snapshot diff, unit tests." },
    { t: "Gate B — staging", d: "Mocks, Playwright journey, log classify." },
    { t: "Merge decision", d: "MERGEABLE only if both gates pass." },
  ];
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(71);
  const [next, setNext] = useState(79);
  const delta = next - base;
  const pass = delta >= 0;
  const [log, setLog] = useState("connection reset by peer on staging-2");
  const kind = /timeout|reset|5\d\d|OOM|unavail/i.test(log) ? "INFRA" : "BUG";
  const [hitl, setHitl] = useState(false);

  return (
    <Panel title="Walk the dual gates">
      <ol className="gate-steps">
        {steps.map((s, i) => (
          <li key={s.t}>
            <button type="button" className={i === step ? "on" : ""} onClick={() => setStep(i)}>
              {i + 1}. {s.t}
            </button>
            {i === step && <p>{s.d}</p>}
          </li>
        ))}
      </ol>
      <div className={`slack-card ${hitl ? "ok" : ""}`}>
        <strong>Slack · HITL (demo)</strong>
        <p>Approve Gatekeeper run <code>gk-1842</code>?</p>
        <button type="button" className="btn btn-primary btn-small" onClick={() => setHitl(true)}>
          {hitl ? "Approved" : "Approve"}
        </button>
      </div>
      <div className="cov">
        <label>
          Base coverage
          <input type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} />
        </label>
        <label>
          New coverage
          <input type="number" value={next} onChange={(e) => setNext(Number(e.target.value))} />
        </label>
        <p className={pass ? "ok" : "bad"}>
          Δ {delta >= 0 ? "+" : ""}
          {delta} pts · Gate A {pass ? "PASS" : "BLOCK"}
        </p>
      </div>
      <label className="full-lab">
        Classify a log line
        <input value={log} onChange={(e) => setLog(e.target.value)} />
      </label>
      <p className="play-note">
        Heuristic: <strong>{kind}</strong> {kind === "INFRA" ? "(timeouts, resets, 5xx)" : "(assertion / product failure)"}
      </p>
    </Panel>
  );
}

function ReconPlay() {
  const scenes = [
    {
      id: "S1",
      n: 580,
      q: "SELECT lan_id FROM paytm_closed p\nJOIN lender_active l USING (lan_id)\nWHERE p.as_of = DATE 'today'",
    },
    {
      id: "S2",
      n: 3,
      q: "SELECT lan_id FROM paytm_active p\nJOIN lender_closed l USING (lan_id)\nWHERE p.as_of = DATE 'today'",
    },
    {
      id: "S3",
      n: 4509,
      q: "SELECT lan_id FROM lender_book l\nLEFT JOIN paytm_book p USING (lan_id)\nWHERE p.lan_id IS NULL",
    },
  ];
  const [id, setId] = useState("S1");
  const [lit, setLit] = useState(["S1"]);
  const s = scenes.find((x) => x.id === id);
  const max = 4509;

  useEffect(() => {
    const order = ["S1", "S2", "S3", "AGG", "HITL"];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % order.length;
      setLit(order.slice(0, i + 1));
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <Panel title="Parallel graph + warehouse queries">
      <div className="recon-nodes">
        {["S1", "S2", "S3", "AGG", "HITL"].map((n) => (
          <span key={n} className={`recon-n ${lit.includes(n) ? "lit" : ""}`}>
            {n}
          </span>
        ))}
      </div>
      <div className="vol-bars">
        {scenes.map((sc) => (
          <button key={sc.id} type="button" className={id === sc.id ? "on" : ""} onClick={() => setId(sc.id)}>
            <em>{sc.id}</em>
            <i style={{ height: `${Math.max(8, (sc.n / max) * 100)}%` }} />
            <span>{sc.n}/d</span>
          </button>
        ))}
      </div>
      <pre className="play-code">{s.q}</pre>
      <p className="muted">Illustrative SQL only — catalogs and table names on the public site are fictionalized.</p>
    </Panel>
  );
}

function FunnelPlay() {
  const series = [0.62, 0.64, 0.63, 0.61, 0.66, 0.65, 0.64, 0.58, 0.57, 0.63, 0.64, 0.62, 0.61, 0.6];
  const median = 0.63;
  const zCut = 0.04;
  const last = series[series.length - 1];
  const breach = Math.abs(last - median) >= zCut;
  const w = 520;
  const h = 120;
  const pts = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * (w - 16) + 8;
      const y = h - 16 - ((v - 0.5) / 0.25) * (h - 32);
      return `${x},${y}`;
    })
    .join(" ");
  const breaches = series
    .map((v, i) => ({ v, i }))
    .filter((x) => Math.abs(x.v - median) >= zCut);

  return (
    <Panel title="Funnel health (illustrative 14d)">
      <div className={`health ${breach ? "bad" : "ok"}`}>{breach ? "BREACH" : "HEALTHY"} · last SR {(last * 100).toFixed(0)}%</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="funnel-svg" role="img" aria-label="Success rate">
        <line x1="8" y1={h - 16 - ((median - 0.5) / 0.25) * (h - 32)} x2={w - 8} y2={h - 16 - ((median - 0.5) / 0.25) * (h - 32)} className="funnel-med" />
        <polyline fill="none" points={pts} className="funnel-line" />
      </svg>
      <p className="play-note">7d median {(median * 100).toFixed(0)}% · z-band ±{(zCut * 100).toFixed(0)} pts</p>
      <p className="muted">
        Historical flags: {breaches.map((b) => `d${b.i + 1}`).join(", ") || "none"} · agent enriches the Python RCA, it does not invent the drop.
      </p>
    </Panel>
  );
}

function BuyPlay() {
  const [traffic, setTraffic] = useState(1);
  const saved = Math.round(2.47 * traffic * 10) / 10;
  const p99 = Math.round(2000 - 1200 * Math.min(1, traffic));
  return (
    <Panel title="Savings & pool sketch">
      <label className="full-lab">
        Relative marketplace load ×{traffic.toFixed(1)}
        <input type="range" min="0.5" max="2" step="0.1" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} />
      </label>
      <div className="buy-kpis">
        <span>
          <strong>₹{saved}M</strong> annual save at this load
        </span>
        <span>
          <strong>{p99}ms</strong> modeled P99
        </span>
      </div>
      <div className="pool">
        <div>App</div>
        <span>→</span>
        <div className="pool-box">
          pgx pool
          <small>min 8 · max 32 · idle 5m</small>
        </div>
        <span>→</span>
        <div>PostgreSQL</div>
      </div>
    </Panel>
  );
}

function EventsPlay() {
  const [fanout, setFanout] = useState(40);
  const latency = Math.max(40, Math.round(220 - fanout * 2.8));
  const scored = 8200;
  const highRisk = Math.round(scored * 0.2);
  return (
    <Panel title="Fan-out latency + lead scoring">
      <label className="full-lab">
        Concurrent notification fan-out · {fanout}k
        <input type="range" min="5" max="60" value={fanout} onChange={(e) => setFanout(Number(e.target.value))} />
      </label>
      <div className="buy-kpis">
        <span>
          <strong>{latency}ms</strong> modeled p95 notify
        </span>
        <span>
          <strong>+51.7%</strong> tx lift (shipped)
        </span>
      </div>
      <div className="scale-meter">
        <span>LangGraph high-risk</span>
        <strong>
          {highRisk.toLocaleString()} / {scored.toLocaleString()} weekly
        </strong>
        <i style={{ width: "20%" }} />
      </div>
      <p className="muted">Kafka for durable fan-out, Redis for the hot path. Scoring is a workflow, not a prompt dump.</p>
    </Panel>
  );
}

function ArtolioPlay() {
  const [km, setKm] = useState(8);
  const nearby = Math.max(3, Math.round(4 + km * 1.6));
  return (
    <Panel title="Nearby search radius">
      <label className="full-lab">
        PostGIS radius · {km} km
        <input type="range" min="2" max="25" value={km} onChange={(e) => setKm(Number(e.target.value))} />
      </label>
      <div className="buy-kpis">
        <span>
          <strong>{nearby}</strong> artists in range (demo)
        </span>
        <span>
          <strong>book → review</strong> dashboard loop
        </span>
      </div>
      <div className="pool">
        <div>Next.js</div>
        <span>→</span>
        <div>Node BFF</div>
        <span>→</span>
        <div className="pool-box">
          Go + PostGIS
          <small>geo query, not a client filter</small>
        </div>
      </div>
    </Panel>
  );
}

const NL_EXAMPLES = [
  {
    q: "Top 10 lenders by disbursal this month",
    sql: "SELECT lender_id, SUM(amount) AS disbursed\nFROM fact_disbursal\nWHERE month = DATE_TRUNC('month', CURRENT_DATE)\nGROUP BY 1\nORDER BY 2 DESC\nLIMIT 10",
    ok: true,
  },
  {
    q: "Delete inactive leads",
    sql: "DELETE FROM leads WHERE last_seen < CURRENT_DATE - INTERVAL '90' DAY",
    ok: false,
    reason: "DELETE blocked by AST gate",
  },
  {
    q: "Join payroll onto the public catalog",
    sql: "SELECT * FROM payroll p JOIN catalog c ON c.emp_id = p.emp_id",
    ok: false,
    reason: "unauthorized table: payroll",
  },
];

function Nl2sqlPlay() {
  const [idx, setIdx] = useState(0);
  const ex = NL_EXAMPLES[idx];
  return (
    <Panel title="NL → SQL with an AST gate">
      <div className="chip-row">
        {NL_EXAMPLES.map((x, i) => (
          <button key={x.q} type="button" className={`chip ${idx === i ? "on" : ""}`} onClick={() => setIdx(i)}>
            {i === 0 ? "Safe ask" : i === 1 ? "Destructive" : "Unauthorized"}
          </button>
        ))}
      </div>
      <p className="play-note">
        “{ex.q}”
      </p>
      <pre className="play-code">{ex.sql}</pre>
      <p className={ex.ok ? "play-note ok" : "play-note bad"}>
        {ex.ok ? "AST gate PASS · SELECT only, allowed tables" : `AST gate BLOCK · ${ex.reason}`}
      </p>
    </Panel>
  );
}

export function ProjectPlayground({ project }) {
  switch (project.id) {
    case "nexus":
      return <NexusPlay />;
    case "bff":
      return <BffPlay />;
    case "lead-assist":
      return <LeadPlay />;
    case "gatekeeper":
      return <GatePlay />;
    case "recon":
      return <ReconPlay />;
    case "pp-recon":
      return <FunnelPlay />;
    case "indiamart-buyleads":
      return <BuyPlay />;
    case "indiamart-events-ai":
      return <EventsPlay />;
    case "artolio":
      return <ArtolioPlay />;
    case "nl2sql":
      return <Nl2sqlPlay />;
    default:
      return null;
  }
}
