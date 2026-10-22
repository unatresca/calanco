import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../docs/**/*.mdx", "../../../packages/ui/src/**/*.stories.tsx"],
  addons: [
    {
      // remark-gfm abilita le tabelle Markdown nelle pagine MDX.
      name: "@storybook/addon-docs",
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
  ],
  core: { disableTelemetry: true },
};

export default config;
