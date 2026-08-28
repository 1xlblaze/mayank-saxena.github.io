import { useState } from "react";
import { ArchDiagram, DIAGRAM_HINTS } from "./ArchDiagram.jsx";
import { ProjectPlayground } from "./ProjectPlayground.jsx";

export function CodeSnippet({ title, language, code }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`code-snip ${open ? "open" : ""}`}>
      <button type="button" className="code-snip-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>
          <strong>{title}</strong>
          <em>{language}</em>
        </span>
        <span className="code-snip-chevron">{open ? "Hide" : "Show code"}</span>
      </button>
      {open && <pre className="code-snip-body">{code}</pre>}
    </div>
  );
}

export function BeforeAfter({ data }) {
  const [pos, setPos] = useState(55);
  if (!data) return null;
  return (
    <div className="ba">
      <div className="ba-cols">
        <div className="ba-col">
          <h5>Before</h5>
          {data.before.map((r) => (
            <div key={r.k} className="ba-row">
              <span>{r.k}</span>
              <strong>{r.v}</strong>
            </div>
          ))}
        </div>
        <div className="ba-col after">
          <h5>After</h5>
          {data.after.map((r) => (
            <div key={r.k} className="ba-row">
              <span>{r.k}</span>
              <strong>{r.v}</strong>
            </div>
          ))}
        </div>
      </div>
      <label className="ba-slider">
        Impact mix
        <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(Number(e.target.value))} />
      </label>
      <div className="ba-bar">
        <span style={{ width: `${pos}%` }} />
      </div>
    </div>
  );
}

export function PiiDemo() {
  const [masked, setMasked] = useState(true);
  const rows = [
    ["PAN", "ABCDE1234F", "XXXXX1234X"],
    ["Aadhaar", "2345 6789 0123", "XXXX XXXX 0123"],
    ["Mobile", "+91 93543 87000", "+91 XXXXX 87000"],
    ["DOB", "1998-03-12", "XXXX-XX-12"],
  ];
  return (
    <div className="pii">
      <div className="pii-head">
        <h5>PII strategy</h5>
        <button type="button" className="btn btn-ghost btn-small" onClick={() => setMasked((v) => !v)}>
          {masked ? "Show raw (demo)" : "Mask again"}
        </button>
      </div>
      <table>
        <tbody>
          {rows.map(([k, raw, mask]) => (
            <tr key={k}>
              <th>{k}</th>
              <td className={masked ? "masked" : "raw"}>{masked ? mask : raw}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Demo values only — masking happens at publish, log, and storage layers.</p>
    </div>
  );
}

export function StackBadges({ groups }) {
  return (
    <div className="stack-groups">
      {Object.entries(groups).map(([role, tags]) => (
        <div className="stack-group" key={role}>
          <span className="stack-role">{role}</span>
          <div className="tags">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectCard({ project, onOpen, flipped, onFlip }) {
  return (
    <article className={`pcard accent-${project.accent} ${flipped ? "flipped" : ""}`}>
      <div className="pcard-inner">
        <div className="pcard-face pcard-front">
          <div className="pcard-meta">
            <span className="project-num">{project.num}</span>
            <span className="project-label">{project.label}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="kicker-line">{project.kicker}</p>
          <p>{project.summary}</p>
          <div className="tags">
            {Object.values(project.stackGroups)
              .flat()
              .slice(0, 5)
              .map((t) => (
                <span key={t}>{t}</span>
              ))}
          </div>
          <div className="pcard-actions">
            <button type="button" className="btn btn-ghost btn-small" onClick={onFlip}>
              Flip for impact
            </button>
            <button type="button" className="btn btn-primary btn-small" onClick={onOpen}>
              Case study
            </button>
          </div>
        </div>
        <div className="pcard-face pcard-back">
          <h4>Impact</h4>
          <ul>
            {project.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.diagram && (
            <div className="pcard-mini-arch">
              <ArchDiagram type={project.diagram} />
            </div>
          )}
          <div className="pcard-actions">
            <button type="button" className="btn btn-ghost btn-small" onClick={onFlip}>
              Back
            </button>
            <button type="button" className="btn btn-primary btn-small" onClick={onOpen}>
              Full architecture
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectModal({ project, onClose }) {
  const [node, setNode] = useState(null);
  const hint = project.diagram && DIAGRAM_HINTS[project.diagram]?.[node];

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="section-kicker">{project.label}</p>
            <h3 id="modal-title">{project.title}</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <p className="project-summary">{project.summary}</p>

        <div className="project-detail">
          <div>
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>
          <div>
            <h4>Approach</h4>
            <p>{project.approach}</p>
          </div>
        </div>

        <div className="project-impact">
          <h4>Impact</h4>
          <ul>
            {project.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="tradeoffs">
          <h4>Engineering trade-offs</h4>
          {project.tradeoffs.map((t) => (
            <div className="tradeoff" key={t.q}>
              <strong>{t.q}</strong>
              <p>{t.a}</p>
            </div>
          ))}
        </div>

        <StackBadges groups={project.stackGroups} />
        {project.snippet && <CodeSnippet {...project.snippet} />}
        {project.beforeAfter && <BeforeAfter data={project.beforeAfter} />}
        {project.id === "lead-assist" && <PiiDemo />}
        <ProjectPlayground project={project} />
        {project.volumes && (
          <div className="volume-grid">
            {project.volumes.map((v) => (
              <button
                type="button"
                key={v.id}
                className={`volume-chip ${node === v.id ? "on" : ""}`}
                onClick={() => setNode(v.id)}
              >
                <strong>{v.id}</strong>
                <span>{v.volume}</span>
                <em>{v.title}</em>
              </button>
            ))}
          </div>
        )}

        {project.diagram && (
          <div className="design-panel">
            <div className="design-panel-head">
              <div>
                <h4>System design</h4>
                <p>Public architecture pattern — implementation details, ports, and internal names withheld.</p>
              </div>
            </div>
            <div className="design-diagram">
              <ArchDiagram type={project.diagram} selected={node} onSelect={setNode} />
            </div>
            {hint && <p className="arch-hint">{hint}</p>}
            {project.sequence && (
              <div className="design-cols">
                <div>
                  <h5>Sequence / pipeline</h5>
                  <ol>
                    {project.sequence.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h5>Constraints &amp; decisions</h5>
                  <ul>
                    {(project.constraints || []).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                    {(project.decisions || []).map((d) => (
                      <li key={`d-${d}`}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
