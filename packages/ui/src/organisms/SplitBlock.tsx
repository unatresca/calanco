import type { ReactNode } from "react";
import "./SplitBlock.css";

export interface SplitBlockProps {
  start: ReactNode;
  end: ReactNode;
  /** Su schermi stretti mostra prima la colonna di destra. */
  endFirstOnMobile?: boolean;
}

/** Due colonne affiancate: testo e immagine, oppure due testi. Su mobile si impilano. */
export function SplitBlock({ start, end, endFirstOnMobile = false }: SplitBlockProps) {
  return (
    <div className={["tr-split", endFirstOnMobile && "tr-split--end-first"].filter(Boolean).join(" ")}>
      <div className="tr-split__col">{start}</div>
      <div className="tr-split__col">{end}</div>
    </div>
  );
}
