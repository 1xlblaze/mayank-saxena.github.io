import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, ArrowRight } from "lucide-react";
import { GMAIL_COMPOSE, RESUME_PDF, SITE, TICKER } from "../../data/site.js";
import { useMediaQuery, usePrefersReducedMotion } from "../../hooks/useMediaQuery.js";
import { TypedTitle } from "./TypedTitle.jsx";
import { LiveTerminal } from "./LiveTerminal.jsx";

const ParticleBackground = lazy(() => import("./ParticleBackground.jsx"));

export function HeroSection() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const mouse = useRef({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile || reduced) return undefined;
    const onMove = (e) => {
      mouse.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile, reduced]);

  return (
    <header id="home" className="hero" ref={heroRef}>
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>
      {!reduced && !isMobile && heroInView && (
        <Suspense fallback={null}>
          <ParticleBackground mouse={mouse} />
        </Suspense>
      )}

      <div className="hero-inner">
        <div className="hero-copy">
          <motion.div
            className="avail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="avail-dot" />
            Open to opportunities
          </motion.div>
          <p className="eyebrow">Senior Software Engineer · {SITE.company}</p>
          <h1>
            {SITE.first}
            <br />
            {SITE.last}
          </h1>
          <TypedTitle roles={SITE.roles} reduced={reduced} />
          <p className="hero-line">{SITE.pitch}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#work">
              See my work <ArrowRight size={16} />
            </a>
            <a className="btn btn-ghost" href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer">
              <Mail size={16} /> Let’s talk
            </a>
            <a className="btn btn-ghost" href={RESUME_PDF} download="Mayank-August-2026-2.pdf">
              <Download size={16} /> Resume
            </a>
          </div>
        </div>
        <LiveTerminal reduced={reduced} />
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={`${item.label}-${i}`}>
              <strong>{item.value}</strong> {item.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
