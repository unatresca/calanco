import type { ElementType, ReactNode } from "react";
import "./DisplayText.css";

export type DisplaySize = "display" | "title";
export type DisplayTone = "ink" | "accent";

export interface DisplayTextProps {
  children: ReactNode;
  as?: ElementType;
  size?: DisplaySize;
  tone?: DisplayTone;
  /** Varianti OpenType del font display, per esempio ["ss12"] o ["calt"]. */
  features?: string[];
  className?: string;
}

/** Testo nel font display: titoli di pagina e di sezione, voci di menu. */
export function DisplayText({ children, as: Tag = "span", size = "display", tone = "ink", features, className }: DisplayTextProps) {
  const style = features?.length ? { fontFeatureSettings: features.map((f) => `"${f}"`).join(", ") } : undefined;
  return (
    <Tag className={["tr-display", `tr-display--${size}`, `tr-display--${tone}`, className].filter(Boolean).join(" ")} style={style}>
      {children}
    </Tag>
  );
}
