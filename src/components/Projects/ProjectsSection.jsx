import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PROJECT_FILTERS, projects } from "../../data/projects.js";
import { ProjectCard, ProjectModal } from "./ProjectCard.jsx";
import { fadeUp } from "../../animations/variants.js";

export function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [flipped, setFlipped] = useState(null);
  const [open, setOpen] = useState(null);

  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.filter.includes(filter))),
    [filter]
  );
  const active = projects.find((p) => p.id === open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="work" className="section projects-section">
      <div className="wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <div className="section-kicker">Selected work</div>
          <h2 className="section-title">Seven production systems. Architecture, trade-offs, impact.</h2>
          <p className="lead">
            Flip a card for the numbers. Open the case study for diagrams, code, and the decisions behind them.
          </p>
        </motion.div>

        <div className="filter-row" role="tablist" aria-label="Filter projects">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? "on" : ""}`}
              onClick={() => {
                setFilter(f);
                setFlipped(null);
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="wrap pcard-rail">
        {list.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            flipped={flipped === p.id}
            onFlip={() => setFlipped((id) => (id === p.id ? null : p.id))}
            onOpen={() => setOpen(p.id)}
          />
        ))}
      </div>

      {active && <ProjectModal project={active} onClose={() => setOpen(null)} />}
    </section>
  );
}
