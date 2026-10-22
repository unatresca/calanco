import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

const meta = {
  title: "Atomi/Icon",
  component: Icon,
  args: { name: "menu" },
  decorators: [(Story) => <div style={{ fontSize: 48 }}><Story /></div>],
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {};
export const Tutte: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32 }}>
      {(["menu", "close", "arrow-up", "arrow-right"] as IconName[]).map((name) => (
        <figure key={name} style={{ margin: 0, textAlign: "center" }}>
          <Icon name={name} />
          <figcaption style={{ fontSize: 12 }}>{name}</figcaption>
        </figure>
      ))}
    </div>
  ),
};
