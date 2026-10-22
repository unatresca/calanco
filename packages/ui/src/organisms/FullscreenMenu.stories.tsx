import type { Meta, StoryObj } from "@storybook/react-vite";
import { menuItems } from "../support/content";
import { FullscreenMenu } from "./FullscreenMenu";

const meta = {
  title: "Organismi/FullscreenMenu",
  component: FullscreenMenu,
  args: { id: "menu-storia", items: menuItems, inline: true },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FullscreenMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Aperto: Story = {};
export const ConPulsante: Story = {
  args: { inline: false },
  render: (args) => (
    <div style={{ padding: "1rem" }}>
      <button type="button" popoverTarget={args.id}>Apri il menu</button>
      <FullscreenMenu {...args} />
    </div>
  ),
};
