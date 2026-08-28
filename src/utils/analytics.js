const LOCAL = "ms-site-pulse";
const SESSION = "ms-site-pulse-session";
const SECTIONS = ["home", "work", "skills", "experience", "impact", "writing", "contact"];

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL) || "null") || { visits: 0, first: Date.now() };
  } catch {
    return { visits: 0, first: Date.now() };
  }
}

let handle = null;

export function startPulse() {
  if (handle) return handle;

  const local = loadLocal();
  if (typeof sessionStorage !== "undefined" && !sessionStorage.getItem(SESSION)) {
    sessionStorage.setItem(SESSION, "1");
    local.visits += 1;
    local.last = Date.now();
    localStorage.setItem(LOCAL, JSON.stringify(local));
  }

  const seen = new Set(["home"]);
  const started = Date.now();
  const ios = [];

  if (typeof IntersectionObserver !== "undefined") {
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) seen.add(id);
        },
        { threshold: 0.25 }
      );
      io.observe(el);
      ios.push(io);
    });
  }

  handle = {
    stop() {
      ios.forEach((io) => io.disconnect());
      handle = null;
    },
    snapshot() {
      return {
        visits: loadLocal().visits,
        seconds: Math.max(1, Math.round((Date.now() - started) / 1000)),
        sections: [...seen],
        sectionCount: SECTIONS.length,
      };
    },
  };
  return handle;
}

export function getLocalPulse() {
  startPulse();
  return loadLocal();
}

export async function fetchGlobalViews() {
  const url = import.meta.env.VITE_COUNTER_URL;
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.count === "number" ? data.count : data.value ?? null;
  } catch {
    return null;
  }
}

export function bootOptionalGa() {
  const id = import.meta.env.VITE_GA_ID;
  if (!id || typeof document === "undefined") return;
  if (document.getElementById("ga4")) return;
  const s = document.createElement("script");
  s.id = "ga4";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
}
