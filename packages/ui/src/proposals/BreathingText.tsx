import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import "./BreathingText.css";

/**
 * - tempo: gli assi si muovono da soli, in solo CSS;
 * - scorrimento: gli assi seguono la posizione della parola mentre la pagina scorre, in solo CSS;
 * - puntatore: le lettere vicine al mouse o al dito vanno verso il valore finale (serve JavaScript).
 */
export type BreathingDriver = "tempo" | "scorrimento" | "puntatore";

export interface BreathingTextProps {
  text: string;
  fontFamily: string;
  /** Fino a tre assi variabili, ciascuno con valore iniziale e finale. */
  axes: Record<string, [number, number]>;
  driver?: BreathingDriver;
  /** Solo "tempo": durata di un respiro, in secondi. */
  duration?: number;
  /** "tempo" e "scorrimento": sfasamento tra una lettera e la successiva, in secondi o in frazione di percorso. */
  stagger?: number;
  /** Solo "puntatore": distanza, in pixel, entro cui una lettera reagisce. */
  radius?: number;
  className?: string;
  style?: CSSProperties;
}

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Proposta 2 — font variabile animato.
 * Le lettere sono testo vero; si muovono gli assi del font. Con "riduci movimento" restano ferme.
 */
export function BreathingText({
  text,
  fontFamily,
  axes,
  driver = "tempo",
  duration = 3,
  stagger = 0.15,
  radius = 220,
  className,
  style,
}: BreathingTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const entries = Object.entries(axes).slice(0, 3);
  const vars: Vars = { fontFamily, "--tr-breathe-duration": `${duration}s`, "--tr-breathe-stagger": stagger, ...style };
  entries.forEach(([, [from, to]], i) => {
    vars[`--tr-axis-${i + 1}-from`] = from;
    vars[`--tr-axis-${i + 1}-to`] = to;
  });
  const fvs = entries.map(([tag], i) => `"${tag}" var(--tr-axis-${i + 1})`).join(", ");
  const axesKey = JSON.stringify(entries);

  useEffect(() => {
    const root = rootRef.current;
    if (driver !== "puntatore" || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(root.querySelectorAll<HTMLElement>(".tr-breathe__letter"));
    const ranges: [number, number][] = JSON.parse(axesKey).map(([, r]: [string, [number, number]]) => r);
    let pending = 0;
    let px = -1e6;
    let py = -1e6;
    const update = () => {
      pending = 0;
      for (const letter of letters) {
        const r = letter.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / radius);
        ranges.forEach(([from, to], i) => letter.style.setProperty(`--tr-axis-${i + 1}`, String(from + (to - from) * t)));
      }
    };
    // Il puntatore è seguito su tutta la finestra: anche il dito che scorre la pagina conta.
    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      if (!pending) pending = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(pending);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, [driver, radius, axesKey]);

  return (
    <span ref={rootRef} className={["tr-breathe", `tr-breathe--${driver}`, className].filter(Boolean).join(" ")} style={vars}>
      {Array.from(text).map((char, i) => (
        <span key={i} className="tr-breathe__letter" style={{ "--i": i, fontVariationSettings: fvs } as Vars}>
          {char}
        </span>
      ))}
    </span>
  );
}
