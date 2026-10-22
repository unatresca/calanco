import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar } from "./Bar";
import { ShuffledWord } from "./ShuffledWord";

const ODD_SETS = Array.from({ length: 20 }, (_, i) => [`ss${String(i + 1).padStart(2, "0")}`]);

const meta = {
  title: "Proposte/1. Variazione per lettera",
  component: ShuffledWord,
  argTypes: { seed: { control: { type: "range", min: 1, max: 100 } } },
  args: { text: "TRESCA", fontFamily: "Bitcount", seed: 7 },
  decorators: [(Story) => <Bar><Story /></Bar>],
} satisfies Meta<typeof ShuffledWord>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Bitcount: Story = {
  args: {
    features: [[], ["ss02"], ["ss05"], ["ss02", "ss05"]],
    axes: { ELSH: [0, 100], ELXP: [0, 100], wght: [300, 800] },
  },
  parameters: { docs: { description: { story: "Ogni lettera ha forma dei punti (ELSH), espansione (ELXP), peso e varianti diverse." } } },
};

export const Fungal: Story = {
  args: { fontFamily: "Fungal", features: [[], ["salt"]], axes: { grow: [0, 1000], THCK: [200, 800] } },
  parameters: { docs: { description: { story: "Ogni lettera germoglia di una quantità diversa (asse grow)." } } },
};

export const MFOddMono: Story = {
  name: "MF Odd Mono (solo in locale)",
  args: { fontFamily: '"MF Odd Mono", "Major Mono Display"', features: ODD_SETS },
  parameters: { docs: { description: { story: "Lo stesso meccanismo applicato alle 20 varianti di Odd Mono: il comportamento del sito attuale, ma deciso dal codice." } } },
};

export const SemiDiversi: Story = {
  args: { features: [[], ["ss02"], ["ss05"]], axes: { ELSH: [0, 100], ELXP: [0, 100], wght: [300, 800] } },
  render: (args) => (
    <>
      {[3, 11, 42, 77].map((seed) => (
        <div key={seed}>
          <ShuffledWord {...args} seed={seed} />
        </div>
      ))}
    </>
  ),
};
