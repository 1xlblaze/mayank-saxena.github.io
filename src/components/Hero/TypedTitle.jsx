import { useEffect, useState } from "react";

export function TypedTitle({ roles, reduced }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const [phase, setPhase] = useState("hold");

  useEffect(() => {
    if (reduced) {
      setText(roles.join("  →  "));
      return undefined;
    }
    const full = roles[index];
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("out"), 1600);
      return () => clearTimeout(t);
    }
    if (phase === "out") {
      if (text.length === 0) {
        setIndex((i) => (i + 1) % roles.length);
        setPhase("in");
        return undefined;
      }
      const t = setTimeout(() => setText(full.slice(0, text.length - 1)), 28);
      return () => clearTimeout(t);
    }
    if (text === full) {
      setPhase("hold");
      return undefined;
    }
    const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 42);
    return () => clearTimeout(t);
  }, [phase, text, index, roles, reduced]);

  return (
    <p className="typed-title">
      {text}
      {!reduced && <span className="caret" aria-hidden="true" />}
    </p>
  );
}
