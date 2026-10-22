import type { Meta, StoryObj } from "@storybook/react-vite";
import { placeholder } from "../support/placeholder";
import { Picture } from "./Picture";

const meta = {
  title: "Atomi/Picture",
  component: Picture,
  args: { src: placeholder("foto"), alt: "Colline con filari di vite", ratio: "3 / 2" },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof Picture>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Naturale: Story = {};
export const Bicromia: Story = { args: { duotone: true } };
