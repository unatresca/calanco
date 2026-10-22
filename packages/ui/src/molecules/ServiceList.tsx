import { Text } from "../atoms/Text";
import "./ServiceList.css";

export interface ServiceListProps {
  intro?: string;
  items: string[];
}

/** Elenco di servizi con trattino, come "Alla Campeggia si trovano:". */
export function ServiceList({ intro, items }: ServiceListProps) {
  return (
    <div className="tr-service-list">
      {intro && <Text size="lead">{intro}</Text>}
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Text as="span" size="lead">
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
