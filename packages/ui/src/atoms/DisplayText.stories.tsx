import type { Meta, StoryObj } from "@storybook/react-vite";
import { DisplayText } from "./DisplayText";

const meta = {
  title: "Atomi/DisplayText",
  component: DisplayText,
  args: { children: "Dove trovarla?", size: "display", tone: "ink" },
} satisfies Meta<typeof DisplayText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {};
export const Titolo: Story = { args: { children: "Progettazione", size: "title" } };
export const SuBarraNera: Story = {
  args: { tone: "accent" },
  decorators: [(Story) => <div style={{ background: "var(--color-bar)", padding: "1rem" }}><Story /></div>],
};
export const ConVarianteStilistica: Story = {
  args: { children: "Cosa fa?", features: ["calt"] },
  parameters: { docs: { description: { story: "Le varianti cambiano i glifi solo con MF Odd Mono." } } },
};
