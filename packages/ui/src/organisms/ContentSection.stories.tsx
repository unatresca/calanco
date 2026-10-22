import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../atoms/Text";
import { cosaFa } from "../support/content";
import { placeholder } from "../support/placeholder";
import { ContentSection } from "./ContentSection";

const [progettazione] = cosaFa.sections;

const meta = {
  title: "Organismi/ContentSection",
  component: ContentSection,
  parameters: { layout: "fullscreen" },
  args: {
    title: progettazione.title,
    titleFeatures: ["calt"],
    children: <Text size="lead">{progettazione.text}</Text>,
  },
} satisfies Meta<typeof ContentSection>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SoloTesto: Story = {};
export const ConImmagini: Story = {
  args: {
    images: [
      { src: placeholder("yurta", 600, 800), alt: "Concerto in una yurta", ratio: "3 / 4" },
      { src: placeholder("allestimento", 1200, 800), alt: "Struttura in legno per un evento", ratio: "3 / 2" },
    ],
  },
};
