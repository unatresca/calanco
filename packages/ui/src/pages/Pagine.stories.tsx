import type { Meta, StoryObj } from "@storybook/react-vite";
import { Picture } from "../atoms/Picture";
import { Text } from "../atoms/Text";
import { ContactBlock } from "../molecules/ContactBlock";
import { LanguageLink } from "../molecules/LanguageLink";
import { Logotype } from "../molecules/Logotype";
import { ServiceList } from "../molecules/ServiceList";
import { ContentSection } from "../organisms/ContentSection";
import { Hero } from "../organisms/Hero";
import { SplitBlock } from "../organisms/SplitBlock";
import { campeggia, cosaFa, doveTrovarla, legalLines, menuItems } from "../support/content";
import { placeholder } from "../support/placeholder";
import { PageLayout } from "../templates/PageLayout";

const meta = {
  title: "Pagine/Siti attuali",
  component: PageLayout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PageLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const HomeTresca: Story = {
  args: {
    menuItems,
    children: (
      <Hero image={{ src: placeholder("foto a tutto schermo", 1600, 1000), alt: "Mani che sgranano piselli" }}>
        <Logotype set={12} /> è un’impresa sociale che progetta e produce eventi culturali. <Logotype set={14} /> è un ballo contadino.{" "}
        <Logotype set={11} /> è un amore clandestino.
      </Hero>
    ),
  },
};

export const CosaFa: Story = {
  args: {
    header: { title: "Cosa fa?", titleFeatures: ["calt"], href: "#" },
    menuItems,
    cta: { label: "Voglia di una Tresca?", href: "mailto:ciao@unatresca.it", features: ["calt"], backToTop: true },
    children: (
      <>
        <ContentSection>
          {cosaFa.intro.map((p) => (
            <Text key={p} size="lead">
              {p}
            </Text>
          ))}
        </ContentSection>
        {cosaFa.sections.map((s, i) => (
          <ContentSection
            key={s.title}
            title={s.title}
            titleFeatures={["calt"]}
            images={
              i === 0
                ? [
                    { src: placeholder("yurta", 600, 800), alt: "Concerto in una yurta", ratio: "3 / 4" },
                    { src: placeholder("allestimento", 1200, 800), alt: "Struttura in legno per un evento", ratio: "3 / 2" },
                  ]
                : undefined
            }
          >
            <Text size="lead">{s.text}</Text>
          </ContentSection>
        ))}
      </>
    ),
  },
};

export const DoveTrovarla: Story = {
  args: {
    header: { title: "Dove trovarla?", titleFeatures: ["calt"], href: "#" },
    menuItems,
    cta: { label: "ciao@unatresca.it", href: "mailto:ciao@unatresca.it", features: ["calt"] },
    legalLines,
    children: (
      <>
        <SplitBlock
          start={<Text size="lead">{doveTrovarla.luogo}</Text>}
          end={<Picture src={placeholder("colline")} alt="Filari di vite sui colli Tortonesi" ratio="16 / 10" duotone />}
        />
        <SplitBlock
          endFirstOnMobile={false}
          start={<Picture src={placeholder("fondatori")} alt="Rishi, Filippo e Federica davanti a casa" ratio="3 / 2" />}
          end={doveTrovarla.storia.map((p) => (
            <Text key={p} size="lead">
              {p}
            </Text>
          ))}
        />
      </>
    ),
  },
};

export const LaCampeggia: Story = {
  args: {
    theme: "campeggia",
    header: { title: "La Campeggia", titleFeatures: ["calt"], href: "#" },
    menuItems,
    cta: { label: "Seguici su IG", href: campeggia.instagram, features: ["calt"] },
    children: (
      <>
        <div style={{ padding: "0.5rem var(--gutter)" }}>
          <LanguageLink href="#" label="Read in English" hrefLang="en" />
          <Picture src={placeholder("piscina e colline", 1600, 900)} alt="La piscina della Campeggia con vista sui colli" ratio="16 / 9" />
        </div>
        <SplitBlock
          start={<Text size="lead">{campeggia.intro}</Text>}
          end={
            <>
              <ServiceList intro={campeggia.servicesIntro} items={campeggia.services} />
              <ContactBlock address={campeggia.address} mapUrl={campeggia.mapUrl} phone={campeggia.phone} email={campeggia.email} />
            </>
          }
        />
      </>
    ),
  },
};
