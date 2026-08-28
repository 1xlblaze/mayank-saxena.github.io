import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awards, jobs } from "../../data/experience.js";
import { fadeUp } from "../../animations/variants.js";

export function ExperienceSection() {
  const [open, setOpen] = useState(jobs[0].id);

  return (
    <section id="experience" className="section wrap">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="section-kicker">Experience</div>
        <h2 className="section-title">Where the systems shipped.</h2>
      </motion.div>

      <div className="tl">
        {jobs.map((job, i) => {
          const expanded = open === job.id;
          return (
            <article className={`tl-card ${expanded ? "open" : ""}`} key={job.id}>
              <button type="button" className="tl-toggle" onClick={() => setOpen(expanded ? null : job.id)}>
                <span className="tl-dot" data-i={i} />
                <div className="job-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="org">{job.org}</p>
                  </div>
                  <time>{job.time}</time>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    className="tl-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="muted">{job.scope}</p>
                    <ul>
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="metric-pills">
                      {job.metrics.map((m) => (
                        <span key={m.l}>
                          <strong>{m.n}</strong> {m.l}
                        </span>
                      ))}
                    </div>
                    <div className="tags">
                      {job.stack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>

      <h3 className="subhead" style={{ marginTop: "2.5rem" }}>
        Awards
      </h3>
      <div className="award-row">
        {awards.map((a) => (
          <div key={`${a.date}-${a.title}`} className={`award ${a.tone} ${a.highlight ? "hero-award" : ""}`}>
            <em>{a.date}</em>
            <strong>{a.title}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
