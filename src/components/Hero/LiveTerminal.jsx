import { useEffect, useState } from "react";

const SNIPS = [
  {
    file: "nexus.go",
    lang: "go",
    body: `func (n *Nexus) Apply(ctx context.Context, lead Lead, ev Event) error {
    schema, err := n.schemas.Load(lead.Product)
    if err != nil { return err }
    next, err := schema.Transition(lead.State, ev)
    return n.store.Commit(ctx, lead.ID, next)
}`,
  },
  {
    file: "recon_graph.py",
    lang: "python",
    body: `graph = StateGraph(ReconState)
graph.add_node("ingest", ingest)
graph.add_node("stage_s1", s1)
graph.add_node("hitl", hitl_pause)
graph.add_conditional_edges("aggregate", needs_human,
    {"yes": "hitl", "no": "actions"})`,
  },
  {
    file: "sse_hub.go",
    lang: "go",
    body: `func (h *Hub) Broadcast(evt Event) {
    h.mu.RLock(); defer h.mu.RUnlock()
    for id, ch := range h.subs {
        select {
        case ch <- evt:
        default:
            go h.drop(id)
        }
    }
}`,
  },
];

export function LiveTerminal({ reduced }) {
  const [i, setI] = useState(0);
  const snip = SNIPS[i];

  useEffect(() => {
    if (reduced) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % SNIPS.length), 5200);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="term" aria-hidden="true">
      <div className="term-bar">
        <span />
        <span />
        <span />
        <em>{snip.file}</em>
      </div>
      <pre className="term-body">
        <span className="term-prompt">~/systems {">"} </span>
        cat {snip.file}
        {"\n"}
        {snip.body}
      </pre>
    </div>
  );
}
