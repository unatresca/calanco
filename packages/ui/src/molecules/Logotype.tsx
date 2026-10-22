import { DisplayText } from "../atoms/DisplayText";
import type { DisplayTone } from "../atoms/DisplayText";

export interface LogotypeProps {
  /** Variante stilistica di MF Odd Mono, da 1 a 20 (ss01–ss20). */
  set?: number;
  tone?: DisplayTone;
  text?: string;
}

/**
 * La parola TRESCA, ogni volta con glifi diversi.
 * L'effetto esiste solo con MF Odd Mono: i font alternativi ignorano le varianti.
 */
export function Logotype({ set = 12, tone = "accent", text = "TRESCA" }: LogotypeProps) {
  const feature = `ss${String(set).padStart(2, "0")}`;
  return (
    <DisplayText tone={tone} features={[feature]} className="tr-logotype">
      {text}
    </DisplayText>
  );
}
