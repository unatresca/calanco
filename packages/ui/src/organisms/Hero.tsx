import type { ReactNode } from "react";
import "./Hero.css";

export interface HeroProps {
  image: { src: string; alt: string };
  /** Frase di apertura; può contenere Logotype. */
  children: ReactNode;
}

/** Foto a tutto schermo con una frase grande sovrapposta, come la home di Tresca. */
export function Hero({ image, children }: HeroProps) {
  return (
    <section className="tr-hero">
      <img className="tr-hero__image" src={image.src} alt={image.alt} />
      <h1 className="tr-hero__text">{children}</h1>
    </section>
  );
}
