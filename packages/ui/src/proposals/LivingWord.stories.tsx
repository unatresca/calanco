import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, ScrollStage } from "./Bar";
import { LivingWord } from "./LivingWord";

const meta = {
  title: "Proposte/3. Parola viva",
  component: LivingWord,
  argTypes: {
    seed: { control: { type: "range", min: 1, max: 100 } },
    pattern: { control: "inline-radio", options: ["trattini", "puntini", "macchie", "coralli", "labirinto"] },
    motion: { control: "inline-radio", options: ["ciclo", "una-volta"] },
    cellsPerEm: { control: { type: "range", min: 60, max: 200, step: 10 } },
    fontSize: { control: { type: "range", min: 60, max: 320, step: 10 } },
    fontWeight: { control: { type: "range", min: 300, max: 1000, step: 50 } },
  },
  args: {
    text: "TRESCA",
    fontFamily: "Recursive",
    fontWeight: 800,
    pattern: "trattini",
    motion: "ciclo",
    seed: 1,
    fontSize: 200,
    cellsPerEm: 180,
    growMs: 6000,
    holdMs: 2500,
    fadeMs: 1500,
    interactive: true,
    reactToScroll: true,
  },
  parameters: {
    docs: { description: { component: "Mouse, tocco e trascinamento seminano nuova crescita dove passano; lo scorrimento della pagina semina crescita sparsa." } },
  },
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
} satisfies Meta<typeof LivingWord>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Trattini: Story = {};
export const Puntini: Story = { args: { pattern: "puntini" } };
export const Macchie: Story = { args: { pattern: "macchie" } };
export const Coralli: Story = { args: { pattern: "coralli" } };
export const Labirinto: Story = { args: { pattern: "labirinto" } };
export const SuApfelGrotezk: Story = {
  name: "Su Apfel Grotezk (tratti sottili)",
  args: { fontFamily: '"Apfel Grotezk"', fontWeight: 400, cellsPerEm: 110 },
  parameters: { docs: { description: { story: "Nei tratti sottili entra un solo puntino, spesso tagliato dal bordo: si legge meno." } } },
};
export const UnaVolta: Story = { name: "Una volta", args: { motion: "una-volta" } };
export const LaCampeggia: Story = {
  args: { text: "La Campeggia", fontSize: 170 },
  globals: { theme: "campeggia" },
};
export const Scorrimento: Story = {
  name: "Scorri la pagina",
  args: { motion: "una-volta", growMs: 2000 },
  parameters: { scrollStage: true, docs: { description: { story: "Cresce una volta e si ferma; ogni scorrimento la risveglia." } } },
};
