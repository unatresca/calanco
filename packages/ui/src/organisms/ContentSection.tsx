import type { ReactNode } from "react";
import { DisplayText } from "../atoms/DisplayText";
import { Picture } from "../atoms/Picture";
import "./ContentSection.css";

export interface ContentSectionProps {
  title?: string;
  titleFeatures?: string[];
  children: ReactNode;
  images?: { src: string; alt: string; ratio?: string }[];
}

/** Sezione con titolo nel font display, testo e una fila di immagini ("Progettazione", "Produzione"…). */
export function ContentSection({ title, titleFeatures, children, images }: ContentSectionProps) {
  return (
    <section className="tr-section">
      {title && (
        <DisplayText as="h2" size="title" features={titleFeatures}>
          {title}
        </DisplayText>
      )}
      <div className="tr-section__body">{children}</div>
      {images && images.length > 0 && (
        <div className="tr-section__images">
          {images.map((image) => (
            <Picture key={image.src} src={image.src} alt={image.alt} ratio={image.ratio} />
          ))}
        </div>
      )}
    </section>
  );
}
