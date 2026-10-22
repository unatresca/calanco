import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logotype } from "../molecules/Logotype";
import { placeholder } from "../support/placeholder";
import { Hero } from "./Hero";

const meta = {
  title: "Organismi/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  args: {
    image: { src: placeholder("foto a tutto schermo", 1600, 1000), alt: "Mani che sgranano piselli" },
    children: (
      <>
        <Logotype set={12} /> è un’impresa sociale che progetta e produce eventi culturali. <Logotype set={14} /> è un ballo contadino.{" "}
        <Logotype set={11} /> è un amore clandestino.
      </>
    ),
  },
} satisfies Meta<typeof Hero>;
export default meta;

export const HomeTresca: StoryObj<typeof meta> = {};
