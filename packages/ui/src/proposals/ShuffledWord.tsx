import type { CSSProperties } from "react";
import { seededRandom } from "../support/random";
import "./ShuffledWord.css";

export interface ShuffledWordProps {
  text: string;
  /** Famiglia del font; deve avere varianti stilistiche o assi variabili. */
  fontFamily: string;
  /** Gruppi di varianti OpenType: ogni lettera ne sceglie uno a caso (un gruppo vuoto = forma base). */
  features?: string[][];
  /** Assi variabili con il loro intervallo: ogni lettera riceve un valore a caso. */
  axes?: Record<string, [number, number]>;
  /** Stesso seme, stessa parola. Nei siti statici si può fissare a ogni build o a ogni pagina. */
  seed?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Proposta 1 — variazione per lettera.
 * Ogni lettera riceve una variante stilistica e/o valori d'asse scelti con un seme.
 * Il calcolo avviene al momento del rendering: in Astro diventa HTML statico, senza JavaScript.
 */
export function ShuffledWord({ text, fontFamily, features = [[]], axes = {}, seed = 1, className, style }: ShuffledWordProps) {
  const random = seededRandom(seed);
  const axisEntries = Object.entries(axes);
  return (
    <span className={["tr-shuffled", className].filter(Boolean).join(" ")} style={{ fontFamily, ...style }}>
      {Array.from(text).map((char, i) => {
        if (char.trim() === "") return <span key={i}>{char}</span>;
        const group = features[Math.floor(random() * features.length)] ?? [];
        const letterStyle: CSSProperties = {};
        if (group.length) letterStyle.fontFeatureSettings = group.map((f) => `"${f}"`).join(", ");
        if (axisEntries.length) {
          letterStyle.fontVariationSettings = axisEntries
            .map(([tag, [min, max]]) => `"${tag}" ${Math.round(min + random() * (max - min))}`)
            .join(", ");
        }
        return (
          <span key={i} style={letterStyle}>
            {char}
          </span>
        );
      })}
    </span>
  );
}
