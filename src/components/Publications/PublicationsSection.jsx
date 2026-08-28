import { publications } from "../../data/experience.js";

export function PublicationsSection() {
  return (
    <section id="writing" className="section wrap">
      <div className="section-kicker">Writing & talks</div>
      <h2 className="section-title">Papers, and a session on making services cheaper and faster.</h2>
      <div className="pub-grid">
        {publications.map((p) => (
          <article className="pub-card" key={p.title}>
            <span className="pub-kind">
              {p.kind} · {p.year}
            </span>
            <h3>{p.title}</h3>
            <p className="org">{p.venue}</p>
            <p>{p.blurb}</p>
            <div className="tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
