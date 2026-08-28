export const CAREER_METRICS = [
  { value: 2.47, prefix: "₹", suffix: "M+", label: "Annual infra savings", decimals: 2 },
  { value: 60, suffix: "%", label: "P99 latency reduction" },
  { value: 40, suffix: "%", label: "Throughput increase" },
  { value: 55, suffix: "%", label: "Irrelevant lead reduction" },
  { value: 35, suffix: "%", label: "Manual review effort saved" },
  { value: 20, suffix: "+", label: "Microservices deployed" },
  { value: 10, suffix: "K+", label: "Concurrent SSE connections" },
  { value: 120, suffix: "+", label: "Loan journey states" },
  { value: 4500, suffix: "+", label: "Daily LAN recon (S3)" },
  { value: 15, suffix: "+", label: "BFF backend integrations" },
  { value: 0, suffix: "%", label: "Service delay rate" },
  { value: 2, suffix: "", label: "IEEE publications" },
];

export const IMPACT_STRIP = [
  { value: "60%", label: "Latency reduction" },
  { value: "10K+", label: "SSE sessions" },
  { value: "22%", label: "Conversion boost" },
  { value: "₹2.47M", label: "Infra saved / year" },
];

export const SCALE_NOTES = [
  {
    title: "Nexus",
    body: "Multi-product FSM orchestrator for lending journeys — config over code so new lenders ship without deploys.",
  },
  {
    title: "BFF",
    body: "Single orchestration layer in front of 15+ backend services with signal-based routing.",
  },
  {
    title: "Lead Assist",
    body: "10K+ concurrent SSE, privacy-safe across 120+ stages, Redis-gated so Kafka stays quiet.",
  },
  {
    title: "Gatekeeper",
    body: "Dual-gate quality system — service isolation then staging E2E — with Slack HITL.",
  },
  {
    title: "ReconOps",
    body: "~5K+ LANs/day automated reconciliation. Triage is Python; LLMs interpret, they do not decide.",
  },
  {
    title: "Buyleads",
    body: "High-traffic B2B marketplace rewrite: +40% throughput, ~60% P99 cut, ₹2.47M/year saved.",
  },
];
