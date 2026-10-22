import type { ElementType, ReactNode } from "react";
import "./Text.css";

export type TextSize = "lead" | "text" | "small";

export interface TextProps {
  children: ReactNode;
  as?: ElementType;
  size?: TextSize;
  className?: string;
}

/** Testo corrente in Apfel Grotezk. */
export function Text({ children, as: Tag = "p", size = "text", className }: TextProps) {
  return <Tag className={["tr-text", `tr-text--${size}`, className].filter(Boolean).join(" ")}>{children}</Tag>;
}
