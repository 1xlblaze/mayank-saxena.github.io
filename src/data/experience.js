export const jobs = [
  {
    id: "paytm",
    role: "Senior Software Engineer, Lending Platform",
    org: "Paytm · Noida",
    time: "Sep 2025 – Present",
    scope: "Lending orchestration, privacy-safe streaming, agentic quality and recon",
    team: "Cross-functional lending platform",
    stack: ["Go", "NestJS", "Kafka", "Redis", "MongoDB", "LangGraph", "FastAPI", "Kubernetes"],
    bullets: [
      "Lead Assist + Go SSE — 10K+ sessions, 60% latency cut, 22% fewer drop-offs with Redis gate + PII masking.",
      "Workflow Nexus — config-driven FSM so new lenders and products ship without code deploys.",
      "lending-bff-fe — journey orchestration and schema-driven UI across 15+ backend services.",
      "AI PR Gatekeeper and ReconOps — safer merges, trustworthy daily recon with HITL before side effects.",
    ],
    metrics: [
      { n: "10K+", l: "SSE sessions" },
      { n: "15+", l: "BFF integrations" },
      { n: "35%", l: "Less review effort" },
    ],
  },
  {
    id: "indiamart",
    role: "Software Engineer",
    org: "IndiaMART Intermesh Limited · Noida",
    time: "Mar 2022 – Sep 2025",
    scope: "Buyleads platform, event fan-out, LLM pipelines, lead scoring",
    team: "Marketplace platform",
    stack: ["Go", "PostgreSQL", "pgx", "Redis", "Kafka", "GCP", "LangGraph", "Python"],
    bullets: [
      "Legacy → Go + pgx + Redis — +40% throughput, 60% lower P99, ₹2.47M annual infra savings.",
      "Kafka/Redis fan-out (+51.7% transactions); LangGraph scoring for 8K+ leads/week.",
      "GCP LLM pipelines (50K+ files/month) and NL→SQL with AST safety gates.",
    ],
    metrics: [
      { n: "+40%", l: "Throughput" },
      { n: "₹2.47M", l: "Saved / year" },
      { n: "20+", l: "Services, 0% delay" },
    ],
  },
];

export const awards = [
  { date: "Aug 2026", title: "Employee of the Month", tone: "gold" },
  { date: "Jan 2025", title: "Employee of the Month", tone: "gold" },
  { date: "2024", title: "Best Performer · 6×", tone: "teal" },
  { date: "Dec 2023", title: "Employee of the Year", tone: "gold", highlight: true },
  { date: "Aug 2023", title: "Employee of the Month", tone: "gold" },
  { date: "2023", title: "Best Performer · 5×", tone: "teal" },
  { date: "Dec 2022", title: "Continuous Excellence", tone: "purple" },
  { date: "Nov 2022", title: "Best Performer", tone: "teal" },
  { date: "Jul 2022", title: "Emerging Star of the Month", tone: "purple" },
];

export const publications = [
  {
    kind: "IEEE",
    year: "2022",
    title: "Accident Detection Approaches",
    venue: "IEEE DELCON 2022",
    tags: ["Computer vision", "Safety systems"],
    blurb: "Survey and evaluation of accident-detection approaches for intelligent transportation systems.",
  },
  {
    kind: "IEEE",
    year: "2022",
    title: "Face Mask Detection using CNN",
    venue: "IEEE DASA 2022",
    tags: ["CNN", "Deep learning"],
    blurb: "Convolutional network pipeline for real-time face-mask detection.",
  },
  {
    kind: "Talk",
    year: "2024",
    title: "Micro-Service Optimization",
    venue: "Internal tech session · June 2024",
    tags: ["Go", "Latency", "Cost"],
    blurb: "How pooling, caching, and service boundaries cut P99 and infrastructure spend on a high-traffic marketplace.",
  },
];
