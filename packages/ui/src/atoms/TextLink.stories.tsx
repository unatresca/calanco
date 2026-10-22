import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
import { TextLink } from "./TextLink";

const meta = {
  title: "Atomi/TextLink",
  component: TextLink,
  args: { href: "#", children: "Apri in mappe" },
  render: (args) => (
    <Text size="lead">
      La Campeggia si trova in via Sarizzola a Costa Vescovato (AL). <TextLink {...args} />.
    </Text>
  ),
} satisfies Meta<typeof TextLink>;
export default meta;

export const NelTesto: StoryObj<typeof meta> = {};
