import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeaderBar } from "./HeaderBar";

const meta = {
  title: "Organismi/HeaderBar",
  component: HeaderBar,
  args: { title: "Dove trovarla?", titleFeatures: ["calt"], menuId: "menu-storia" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HeaderBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tresca: Story = {};
export const Campeggia: Story = { args: { title: "La Campeggia" }, globals: { theme: "campeggia" } };
