import type { Meta, StoryObj } from "@storybook/react-vite";
import { CtaBand } from "./CtaBand";

const meta = {
  title: "Organismi/CtaBand",
  component: CtaBand,
  parameters: { layout: "fullscreen" },
  args: { label: "Voglia di una Tresca?", href: "mailto:ciao@unatresca.it", features: ["calt"], backToTop: true },
} satisfies Meta<typeof CtaBand>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tresca: Story = {};
export const Email: Story = { args: { label: "ciao@unatresca.it", backToTop: false } };
export const Campeggia: Story = {
  args: { label: "Seguici su IG", href: "https://www.instagram.com/lacampeggia/", backToTop: false },
  globals: { theme: "campeggia" },
};
