import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta = {
  title: "Atomi/Text",
  component: Text,
  args: {
    children: "Tresca crea spazi di socialità in cui arte, musica e cultura diventano strumenti volti a stimolare lo sviluppo della collettività.",
    size: "text",
  },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Testo: Story = {};
export const Lead: Story = { args: { size: "lead" } };
export const Piccolo: Story = { args: { size: "small", children: "Grafica, web e fotografia: Roberta Donatini" } };
