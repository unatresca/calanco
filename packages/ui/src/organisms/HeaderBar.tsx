import type { ReactNode } from "react";
import { DisplayText } from "../atoms/DisplayText";
import { Icon } from "../atoms/Icon";
import "./HeaderBar.css";

export interface HeaderBarProps {
  /** Titolo della pagina, nel font display. */
  title: ReactNode;
  titleFeatures?: string[];
  /** Link del titolo; di solito la home della sezione. */
  href?: string;
  /** id del FullscreenMenu che il pulsante apre. */
  menuId: string;
  menuLabel?: string;
}

/** Barra nera in alto con il titolo della pagina e il pulsante del menu. */
export function HeaderBar({ title, titleFeatures, href, menuId, menuLabel = "Apri il menu" }: HeaderBarProps) {
  const heading = (
    <DisplayText as="span" tone="accent" features={titleFeatures}>
      {title}
    </DisplayText>
  );
  return (
    <header className="tr-header-bar">
      <h1 className="tr-header-bar__title">{href ? <a href={href}>{heading}</a> : heading}</h1>
      <button type="button" className="tr-header-bar__menu" popoverTarget={menuId} aria-label={menuLabel}>
        <Icon name="menu" />
      </button>
    </header>
  );
}
