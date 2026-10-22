import type { ReactNode } from "react";
import { FullscreenMenu } from "../organisms/FullscreenMenu";
import type { MenuItem } from "../organisms/FullscreenMenu";
import { HeaderBar } from "../organisms/HeaderBar";
import type { HeaderBarProps } from "../organisms/HeaderBar";
import { CtaBand } from "../organisms/CtaBand";
import type { CtaBandProps } from "../organisms/CtaBand";
import { LegalFooter } from "../organisms/LegalFooter";
import "./PageLayout.css";

export type Theme = "tresca" | "campeggia";

export interface PageLayoutProps {
  theme?: Theme;
  /** Barra in alto; senza, la pagina parte dal contenuto (per esempio una Hero). */
  header?: Omit<HeaderBarProps, "menuId">;
  menuItems: MenuItem[];
  children: ReactNode;
  cta?: CtaBandProps;
  legalLines?: string[];
}

const MENU_ID = "menu-principale";

/** Struttura comune delle pagine: barra, menu, contenuto, fascia finale e dati legali. */
export function PageLayout({ theme = "tresca", header, menuItems, children, cta, legalLines }: PageLayoutProps) {
  return (
    <div className="tr-page" data-theme={theme} id="top">
      {header && <HeaderBar {...header} menuId={MENU_ID} />}
      <FullscreenMenu id={MENU_ID} items={menuItems} />
      <main className="tr-page__main">{children}</main>
      {cta && <CtaBand {...cta} />}
      {legalLines && <LegalFooter lines={legalLines} />}
    </div>
  );
}
