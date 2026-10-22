import type { AnchorHTMLAttributes } from "react";
import "./TextLink.css";

/** Link dentro il testo: eredita font e colore, sottolineato. */
export function TextLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={["tr-link", className].filter(Boolean).join(" ")} {...props} />;
}
