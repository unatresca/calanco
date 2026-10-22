import { Text } from "../atoms/Text";
import { TextLink } from "../atoms/TextLink";

export interface ContactBlockProps {
  address: string;
  mapUrl?: string;
  heading?: string;
  phone?: string;
  email?: string;
}

/** Dove si trova e come contattare. */
export function ContactBlock({ address, mapUrl, heading = "Per info e prenotazioni:", phone, email }: ContactBlockProps) {
  return (
    <address className="tr-contact-block" style={{ fontStyle: "normal" }}>
      <Text size="lead">
        {address}
        {mapUrl && (
          <>
            <br />
            <TextLink href={mapUrl}>Apri in mappe</TextLink>.
          </>
        )}
      </Text>
      {(phone || email) && (
        <Text size="lead">
          {heading}
          {phone && (
            <>
              <br />
              <TextLink href={`tel:${phone.replace(/\s/g, "")}`} style={{ textDecoration: "none" }}>
                {phone}
              </TextLink>
            </>
          )}
          {email && (
            <>
              <br />
              <TextLink href={`mailto:${email}`} style={{ textDecoration: "none" }}>
                {email}
              </TextLink>
            </>
          )}
        </Text>
      )}
    </address>
  );
}
