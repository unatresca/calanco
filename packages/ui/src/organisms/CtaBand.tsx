import { DisplayText } from "../atoms/DisplayText";
import { Icon } from "../atoms/Icon";
import "./CtaBand.css";

export interface CtaBandProps {
  label: string;
  href: string;
  features?: string[];
  /** Mostra la freccia per tornare in cima alla pagina. */
  backToTop?: boolean;
}

/** Fascia nera in fondo alla pagina con un invito ("Voglia di una Tresca?", "Seguici su IG"). */
export function CtaBand({ label, href, features, backToTop = false }: CtaBandProps) {
  return (
    <div className="tr-cta-band">
      <a className="tr-cta-band__link" href={href}>
        <DisplayText tone="accent" features={features}>
          {label}
        </DisplayText>
      </a>
      {backToTop && (
        <a className="tr-cta-band__top" href="#top" aria-label="Torna su">
          <Icon name="arrow-up" />
        </a>
      )}
    </div>
  );
}
