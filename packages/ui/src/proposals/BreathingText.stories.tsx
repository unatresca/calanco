import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, ScrollStage } from "./Bar";
import { BreathingText } from "./BreathingText";

const meta = {
  title: "Proposte/2. Font variabile animato",
  component: BreathingText,
  argTypes: {
    duration: { control: { type: "range", min: 0.5, max: 10, step: 0.5 } },
    stagger: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    driver: { control: "inline-radio", options: ["tempo", "scorrimento", "puntatore"] },
  },
  args: { text: "TRESCA", fontFamily: "Fungal", axes: { grow: [0, 1000], THCK: [300, 700] }, duration: 3, stagger: 0.2 },
  decorators: [
    (Story, { parameters }) =>
      parameters.scrollStage ? (
        <ScrollStage>
          <Bar><Story /></Bar>
        </ScrollStage>
      ) : (
        <Bar><Story /></Bar>
      ),
  ],
} satisfies Meta<typeof BreathingText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FungalGermoglia: Story = {
  name: "Fungal · germoglia",
};

export const BitcountPixel: Story = {
  name: "Bitcount · pixel che cambiano forma",
  args: { fontFamily: "Bitcount", axes: { ELSH: [0, 100], ELXP: [0, 100] }, duration: 2.5, stagger: 0.12 },
};

export const RecursiveCasual: Story = {
  name: "Recursive · da rigido a disinvolto",
  args: { fontFamily: "Recursive", axes: { CASL: [0, 1], MONO: [1, 0], wght: [400, 900] }, duration: 2, stagger: 0.1 },
};

export const LaCampeggia: Story = {
  // Le spore di Fungal si vedono solo con THCK sopra lo zero: va animato anche quello.
  args: { text: "La Campeggia", fontFamily: "Fungal", axes: { grow: [0, 800], THCK: [300, 600] }, duration: 4, stagger: 0.25 },
  globals: { theme: "campeggia" },
};

export const Scorrimento: Story = {
  name: "Guidato dallo scorrimento",
  args: { driver: "scorrimento", axes: { grow: [0, 1000], THCK: [300, 800] }, stagger: 0.15 },
  parameters: { scrollStage: true, docs: { description: { story: "Solo CSS (scroll-driven animations): gli assi seguono la posizione della parola mentre la pagina scorre." } } },
};

export const Puntatore: Story = {
  name: "Guidato dal puntatore",
  args: { driver: "puntatore", fontFamily: "Bitcount", axes: { ELSH: [0, 100], ELXP: [0, 100], wght: [300, 900] }, radius: 200 },
  parameters: { docs: { description: { story: "Le lettere vicine al mouse o al dito cambiano forma." } } },
};

export const FungalPuntatore: Story = {
  name: "Fungal · germoglia dove passa il puntatore",
  args: { driver: "puntatore", fontFamily: "Fungal", axes: { grow: [0, 900], THCK: [250, 650] }, radius: 180 },
  parameters: { docs: { description: { story: "Le lettere vicine al mouse o al dito germogliano; lontano tornano pulite." } } },
};
