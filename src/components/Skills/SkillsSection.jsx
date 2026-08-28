import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { radarSkills, skillGroups, techTimeline } from "../../data/skills.js";
import { projects } from "../../data/projects.js";
import { SITE } from "../../data/site.js";
import { fetchGithubStats } from "../../utils/github.js";
import { fadeUp } from "../../animations/variants.js";

const Radar = lazy(() => import("./RadarChart.jsx"));

function GitHubStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetchGithubStats(SITE.githubUser).then(setStats);
  }, []);
  if (!stats) return <p className="muted">Loading GitHub…</p>;
  if (stats.publicRepos == null) {
    return (
      <a className="btn btn-ghost" href={SITE.github} target="_blank" rel="noreferrer">
        GitHub — {SITE.githubUser}
      </a>
    );
  }
  return (
    <div className="gh-grid">
      {[
        [stats.publicRepos, "Public repos"],
        [stats.stars, "Stars"],
        [stats.followers, "Followers"],
        [stats.forks, "Forks"],
      ].map(([n, l]) => (
        <div className="gh-cell" key={l}>
          <strong>{n}</strong>
          <span>{l}</span>
        </div>
      ))}
      {stats.top?.length > 0 && (
        <div className="gh-top">
          {stats.top.map((r) => (
            <a key={r.name} href={r.url} target="_blank" rel="noreferrer">
              {r.name} · {r.stars}★
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function SkillsSection() {
  const [tag, setTag] = useState(null);
  const related = tag
    ? projects.filter((p) =>
        Object.values(p.stackGroups)
          .flat()
          .some((t) => t.toLowerCase().includes(tag.toLowerCase()))
      )
    : [];

  return (
    <section id="skills" className="section wrap">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="section-kicker">Capabilities</div>
        <h2 className="section-title">Tools I actually ship with.</h2>
      </motion.div>

      <div className="skills-layout">
        <div className="radar-wrap">
          <Suspense fallback={<div className="radar-fallback">Loading radar…</div>}>
            <Radar labels={radarSkills.labels} values={radarSkills.values} />
          </Suspense>
        </div>
        <div>
          <h3 className="subhead">GitHub</h3>
          <GitHubStats />
          <h3 className="subhead" style={{ marginTop: "1.5rem" }}>
            Journey
          </h3>
          <ol className="tech-tl">
            {techTimeline.map((row) => (
              <li key={row.year}>
                <strong>{row.year}</strong>
                <div>
                  <em>{row.title}</em>
                  <p>{row.items.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="skills">
        {skillGroups.map((group) => (
          <div className="skill" key={group.title}>
            <h4>{group.title}</h4>
            <div className="tags">
              {group.items.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`tag-btn ${tag === item ? "on" : ""}`}
                  onClick={() => setTag((t) => (t === item ? null : item))}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {tag && (
        <p className="lead" style={{ marginTop: "1rem" }}>
          {tag} shows up in: {related.length ? related.map((p) => p.title).join(" · ") : "adjacent systems and platform work."}
        </p>
      )}
    </section>
  );
}
