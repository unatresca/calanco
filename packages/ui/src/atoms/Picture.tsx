import "./Picture.css";

export interface PictureProps {
  src: string;
  alt: string;
  /** Bicromia nero e colore d'accento, come le foto di "Dove trovarla?". */
  duotone?: boolean;
  /** Proporzioni, per esempio "3 / 2". Senza, l'immagine tiene le sue. */
  ratio?: string;
  className?: string;
}

/** Fotografia a tutta larghezza del contenitore. */
export function Picture({ src, alt, duotone = false, ratio, className }: PictureProps) {
  return (
    <figure
      className={["tr-picture", duotone && "tr-picture--duotone", className].filter(Boolean).join(" ")}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  );
}
