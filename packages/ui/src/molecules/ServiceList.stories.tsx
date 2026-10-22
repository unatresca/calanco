import type { Meta, StoryObj } from "@storybook/react-vite";
import { campeggia } from "../support/content";
import { ServiceList } from "./ServiceList";

const meta = {
  title: "Molecole/ServiceList",
  component: ServiceList,
  args: { intro: campeggia.servicesIntro, items: campeggia.services },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof ServiceList>;
export default meta;

export const Campeggia: StoryObj<typeof meta> = {};
