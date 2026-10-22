import { Text } from "../atoms/Text";
import "./LegalFooter.css";

export interface LegalFooterProps {
  lines: string[];
}

/** Dati legali e crediti in piccolo, in fondo a ogni pagina. */
export function LegalFooter({ lines }: LegalFooterProps) {
  return (
    <footer className="tr-legal-footer">
      {lines.map((line) => (
        <Text key={line} size="small">
          {line}
        </Text>
      ))}
    </footer>
  );
}
