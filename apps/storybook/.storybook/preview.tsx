import type { Preview } from "@storybook/react-vite";
import "@calanco/ui/base.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Tema dei colori",
      toolbar: {
        title: "Tema",
        icon: "paintbrush",
        items: [
          { value: "tresca", title: "Tresca (giallo)" },
          { value: "campeggia", title: "Campeggia (lime)" },
        ],
        dynamicTitle: true,
      },
    },
    displayFont: {
      description: "Font dei titoli",
      toolbar: {
        title: "Font titoli",
        icon: "admin",
        items: [
          { value: "odd-mono", title: "MF Odd Mono (solo in locale)" },
          { value: "major-mono", title: "Major Mono Display (OFL)" },
          { value: "syne-mono", title: "Syne Mono (OFL)" },
          { value: "necto-mono", title: "Necto Mono (OFL)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "tresca", displayFont: "odd-mono" },
  decorators: [
    (Story, context) => {
      // Su <html>, così valgono anche per il menu in popover e per le pagine Docs.
      document.documentElement.dataset.displayFont = context.globals.displayFont;
      document.documentElement.dataset.theme = context.globals.theme;
      return <Story />;
    },
  ],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    options: {
      storySort: { order: ["Fondamenta", ["Introduzione", "Colori", "Tipografia"], "Proposte", ["Introduzione", "1. Variazione per lettera", "2. Font variabile animato", "3. Parola viva"], "Atomi", "Molecole", "Organismi", "Pagine"] },
    },
  },
};

export default preview;
