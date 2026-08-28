import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CAREER_METRICS, IMPACT_STRIP, SCALE_NOTES } from "../../data/metrics.js";
import { AnimatedCounter } from "../ui/AnimatedCounter.jsx";
import { fadeUp } from "../../animations/variants.js";
import { fetchGlobalViews, getLocalPulse } from "../../utils/analytics.js";

export function ImpactStrip() {
  return (
    <section className="impact" id="impact-strip">
      <div className="wrap impact-grid">
        {IMPACT_STRIP.map((item) => (
          <div className="impact-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MetricsSection() {
  const [pulse, setPulse] = useState(null);

  useEffect(() => {
    const local = getLocalPulse();
    setPulse({ visits: local.visits, global: null });
    fetchGlobalViews().then((global) => setPulse((p) => ({ visits: p?.visits ?? local.visits, global })));
  }, []);

  return (
    <section id="impact" className="section wrap">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="section-kicker">Career impact</div>
        <h2 className="section-title">Proof you can take into a conversation.</h2>
      </motion.div>

      <div className="dash-grid">
        {CAREER_METRICS.map((m) => (
          <div className="dash-cell" key={m.label}>
            <strong>
              <AnimatedCounter {...m} />
            </strong>
            <span>{m.label}</span>
            <i className="dash-bar" />
          </div>
        ))}
      </div>

      <div className="scale-grid">
        {SCALE_NOTES.map((n) => (
          <article key={n.title}>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
          </article>
        ))}
      </div>

      {pulse ? (
        <div className="pulse-card">
          <div className="pulse-k">This visit</div>
          <p className="pulse-v">
            {pulse.visits} local session{pulse.visits === 1 ? "" : "s"}
          </p>
          <p className="pulse-note">
              {pulse.global == null
                ? "Privacy-first pulse: counted in this browser only. Optional Google Analytics stays off until a measurement ID is set."
                : `Public counter ≈ ${Number(pulse.global).toLocaleString()} · no cookies unless you add a GA id.`}
          </p>
        </div>
      ) : null}
    </section>
  );
}
