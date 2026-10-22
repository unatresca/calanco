import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logotype } from "./Logotype";

const meta = {
  title: "Molecole/Logotype",
  component: Logotype,
  args: { set: 12, tone: "accent" },
  argTypes: { set: { control: { type: "range", min: 1, max: 20 } } },
  decorators: [(Story) => <div style={{ background: "var(--color-bar)", padding: "1rem" }}><Story /></div>],
} satisfies Meta<typeof Logotype>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Singolo: Story = {};
export const LeVentiVarianti: Story = {
  parameters: {
    docs: {
      description: {
        story: "Con MF Odd Mono ogni riga ha glifi diversi. Con i font alternativi le righe sono identiche: è il limite principale della sostituzione.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))", gap: "0.5rem 2rem" }}>
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12, color: "#888", fontSize: 12 }}>
          ss{String(i + 1).padStart(2, "0")}
          <Logotype set={i + 1} />
        </div>
      ))}
    </div>
  ),
};
