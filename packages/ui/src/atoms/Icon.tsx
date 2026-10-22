import "./Icon.css";

export type IconName = "menu" | "close" | "arrow-up" | "arrow-right";

export interface IconProps {
  name: IconName;
  /** Testo per lettori di schermo; senza, l'icona è decorativa. */
  label?: string;
  className?: string;
}

const PATHS: Record<IconName, string> = {
  // Le righe orizzontali fitte del pulsante menu dei siti attuali.
  menu: Array.from({ length: 9 }, (_, i) => `M3 ${3 + i * 2.25}h18`).join(""),
  close: "M5 3l14 18M19 3L5 21",
  "arrow-up": "M12 21V3M5 10l7-7 7 7",
  "arrow-right": "M3 12h18M14 5l7 7-7 7",
};

/** Icone a tratto, nel colore del testo. */
export function Icon({ name, label, className }: IconProps) {
  return (
    <svg
      className={["tr-icon", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
