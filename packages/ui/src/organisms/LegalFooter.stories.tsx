import type { Meta, StoryObj } from "@storybook/react-vite";
import { legalLines } from "../support/content";
import { LegalFooter } from "./LegalFooter";

const meta = {
  title: "Organismi/LegalFooter",
  component: LegalFooter,
  parameters: { layout: "fullscreen" },
  args: { lines: legalLines },
} satisfies Meta<typeof LegalFooter>;
export default meta;

export const Tresca: StoryObj<typeof meta> = {};
