import { DisplayText } from "../atoms/DisplayText";
import { Icon } from "../atoms/Icon";
import "./FullscreenMenu.css";

export interface MenuItem {
  label: string;
  href: string;
  features?: string[];
  current?: boolean;
}

export interface FullscreenMenuProps {
  id: string;
  items: MenuItem[];
  closeLabel?: string;
  /** Mostra il menu già aperto, per esempio nelle storie. */
  inline?: boolean;
}

/**
 * Menu a tutto schermo. Usa l'attributo HTML popover: si apre e si chiude
 * senza JavaScript, quindi funziona anche nelle pagine statiche.
 */
export function FullscreenMenu({ id, items, closeLabel = "Chiudi il menu", inline = false }: FullscreenMenuProps) {
  return (
    <nav id={id} className={["tr-menu", inline && "tr-menu--inline"].filter(Boolean).join(" ")} popover={inline ? undefined : "auto"} aria-label="Menu principale">
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={item.current ? "page" : undefined}>
              <DisplayText tone="accent" features={item.features}>
                {item.label}
              </DisplayText>
            </a>
          </li>
        ))}
      </ul>
      {!inline && (
        <button type="button" className="tr-menu__close" popoverTarget={id} popoverTargetAction="hide" aria-label={closeLabel}>
          <Icon name="close" />
        </button>
      )}
    </nav>
  );
}
