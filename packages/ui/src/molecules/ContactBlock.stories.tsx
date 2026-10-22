import type { Meta, StoryObj } from "@storybook/react-vite";
import { campeggia } from "../support/content";
import { ContactBlock } from "./ContactBlock";

const meta = {
  title: "Molecole/ContactBlock",
  component: ContactBlock,
  args: { address: campeggia.address, mapUrl: campeggia.mapUrl, phone: campeggia.phone, email: campeggia.email },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof ContactBlock>;
export default meta;

export const Campeggia: StoryObj<typeof meta> = {};
