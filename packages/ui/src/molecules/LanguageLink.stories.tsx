import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageLink } from "./LanguageLink";

const meta = {
  title: "Molecole/LanguageLink",
  component: LanguageLink,
  args: { href: "#", label: "Read in English", hrefLang: "en" },
} satisfies Meta<typeof LanguageLink>;
export default meta;

export const Inglese: StoryObj<typeof meta> = {};
