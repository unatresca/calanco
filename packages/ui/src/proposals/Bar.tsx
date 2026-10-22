import type { ReactNode } from "react";

/** Sfondo nero con il colore d'accento, come le barre dei siti: solo per le storie. */
export function Bar({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div style={{ background: "var(--color-bar)", color: "var(--color-on-bar)", padding: "1.5rem 1.25rem", marginBottom: 12, overflow: "clip" }}>
      {label && <div style={{ fontFamily: "system-ui", fontSize: 12, color: "#aaa", marginBottom: 6 }}>{label}</div>}
      <div style={{ fontSize: "var(--font-size-display)", lineHeight: 1 }}>{children}</div>
    </div>
  );
}

/** Pagina lunga per le storie che reagiscono allo scorrimento. */
export function ScrollStage({ children }: { children: ReactNode }) {
  const hint = { fontFamily: "system-ui", fontSize: 14, color: "#555", padding: "1rem 0" };
  return (
    <>
      <div style={{ ...hint, height: "90vh" }}>↓ Scorri la pagina</div>
      {children}
      <div style={{ ...hint, height: "120vh" }}>↑ Torna su</div>
    </>
  );
}
