import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import "./LanguageLink.css";

export interface LanguageLinkProps {
  href: string;
  label: string;
  /** Codice della lingua di destinazione, per esempio "en". */
  hrefLang: string;
}

/** Rimando alla stessa pagina in un'altra lingua ("→ READ IN ENGLISH"). */
export function LanguageLink({ href, label, hrefLang }: LanguageLinkProps) {
  return (
    <Text as="p" size="lead" className="tr-language-link">
      <a href={href} hrefLang={hrefLang} lang={hrefLang}>
        <Icon name="arrow-right" /> {label}
      </a>
    </Text>
  );
}
