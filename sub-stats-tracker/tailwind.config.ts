import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        White: "#ffffff",
        Purple: "#4D47C8",
        AshGray: "#36454F",
        Obsidian: "#121412",
        ObsidianMoss: "#1E201E",
        IronWood: "#3C3D37",
        SageSmoke: "#697565",
        ParchmentGlow: "#ECDFCC"
      },
    },
  },
  plugins: [],
} satisfies Config;
