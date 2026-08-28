export const SITE = {
  name: "Mayank Saxena",
  first: "Mayank",
  last: "Saxena",
  title: "Senior Software Engineer",
  company: "Paytm Lending",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "mayankidmsaxena@gmail.com",
  phone: "+91-93543-87004",
  github: "https://github.com/1xlblaze",
  githubUser: "1xlblaze",
  linkedin: "https://linkedin.com/in/themayanksaxena",
  headline: "Where Distributed Systems Meet Agentic AI",
  summary:
    "Senior Software Engineer specializing in high-throughput backend architecture, real-time event-driven systems, and production agentic AI pipelines.",
  roles: [
    "Senior Software Engineer",
    "Backend Architect",
    "Agentic AI Engineer",
  ],
};

export const RESUME_PDF = `${import.meta.env.BASE_URL}Mayank-August-2026-2.pdf`;

export const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}`;

export const NAV_LINKS = [
  ["work", "Work"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["impact", "Impact"],
  ["writing", "Writing"],
  ["contact", "Contact"],
];

export const TICKER = [
  { value: "40%", label: "↑ Throughput" },
  { value: "₹2.47M", label: "Infra saved / yr" },
  { value: "60%", label: "↓ P99 latency" },
  { value: "10K+", label: "Concurrent SSE" },
  { value: "22%", label: "Fewer drop-offs" },
  { value: "35%", label: "Less PR review" },
  { value: "20+", label: "Microservices" },
  { value: "0%", label: "Delay rate" },
];
