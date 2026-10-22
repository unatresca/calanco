import type { Meta, StoryObj } from "@storybook/react-vite";
import { Picture } from "../atoms/Picture";
import { Text } from "../atoms/Text";
import { doveTrovarla } from "../support/content";
import { placeholder } from "../support/placeholder";
import { SplitBlock } from "./SplitBlock";

const meta = {
  title: "Organismi/SplitBlock",
  component: SplitBlock,
  parameters: { layout: "fullscreen" },
  args: {
    start: <Text size="lead">{doveTrovarla.luogo}</Text>,
    end: <Picture src={placeholder("colline")} alt="Filari di vite sui colli Tortonesi" ratio="16 / 10" duotone />,
  },
} satisfies Meta<typeof SplitBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TestoEImmagine: Story = {};
export const ImmagineETesto: Story = {
  args: {
    start: <Picture src={placeholder("fondatori")} alt="Rishi, Filippo e Federica davanti a casa" ratio="3 / 2" />,
    end: doveTrovarla.storia.map((p) => (
      <Text key={p} size="lead">
        {p}
      </Text>
    )),
  },
};
