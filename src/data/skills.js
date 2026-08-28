export const skillGroups = [
  {
    title: "Languages & Frameworks",
    items: ["Go", "Python", "TypeScript", "NestJS", "SQL", "JavaScript", "React", "FastAPI", "Fiber"],
  },
  {
    title: "Agentic AI",
    items: ["LangGraph", "MCP", "Cursor Cloud Agents", "Ark", "RAG", "HITL workflows", "PII masking", "LLMOps"],
  },
  {
    title: "Distributed Systems",
    items: ["Event-Driven Architecture", "Kafka / MSK", "AWS SQS", "Redis", "MongoDB", "PostgreSQL", "SSE", "gRPC"],
  },
  {
    title: "Data & Analytics",
    items: ["ClickHouse", "Trino", "Pandas", "pgx pooling", "TypeORM", "MySQL", "SQLglot"],
  },
  {
    title: "Cloud & Platform",
    items: ["Kubernetes", "Helm", "Argo", "Docker", "Jenkins", "AWS", "GCP", "CI/CD"],
  },
  {
    title: "Quality & Observability",
    items: ["Playwright", "OpenTelemetry", "Kibana / ES", "JaCoCo / Istanbul", "Prometheus", "Sentry", "Slack HITL"],
  },
];

export const radarSkills = {
  labels: [
    "Go / Backend",
    "Distributed systems",
    "Agentic AI",
    "TypeScript / NestJS",
    "Python",
    "Cloud / K8s",
    "Data / SQL",
    "Quality / Observability",
  ],
  values: [94, 92, 88, 86, 88, 84, 82, 85],
};

export const techTimeline = [
  { year: "2022", title: "Marketplace foundations", items: ["Go rewrite of Buyleads paths", "PostgreSQL + Redis", "GCP / Kubernetes"] },
  { year: "2023", title: "Scale & cost", items: ["pgx pooling", "P99 and infra optimization", "Employee of the Year"] },
  { year: "2024", title: "Events & AI", items: ["Kafka fan-out", "LangGraph scoring", "GCP LLM pipelines", "Tech session: microservices"] },
  { year: "2025", title: "Lending platform", items: ["NestJS BFF", "Lead Assist SSE", "Privacy-safe streaming"] },
  { year: "2026", title: "Agentic production", items: ["Nexus FSM", "LangGraph recon", "QA Gatekeeper", "Funnel RCA agents"] },
];

export const skillFilters = {
  Go: ["nexus", "lead-assist", "indiamart-buyleads", "artolio"],
  Python: ["gatekeeper", "recon", "pp-recon", "nl2sql", "indiamart-events-ai"],
  TypeScript: ["bff", "lead-assist", "artolio"],
  Kafka: ["nexus", "bff", "lead-assist", "recon", "indiamart-events-ai"],
  LangGraph: ["recon", "indiamart-events-ai"],
  Kubernetes: ["nexus", "gatekeeper", "recon", "indiamart-buyleads"],
};
