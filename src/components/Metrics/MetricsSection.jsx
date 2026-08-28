import { motion } from "framer-motion";
import { CAREER_METRICS, IMPACT_STRIP, SCALE_NOTES } from "../../data/metrics.js";
import { AnimatedCounter } from "../ui/AnimatedCounter.jsx";
import { fadeUp } from "../../animations/variants.js";

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
  return (
    <section id="impact" className="section wrap">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="section-kicker">Career impact</div>
        <h2 className="section-title">Numbers a recruiter can verify in a conversation.</h2>
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
    </section>
  );
}
