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
        ObsidianMoss: "#1E201E",
        IronWood: "#3C3D37",
        SageSmoke: "#697565",
        ParchmentGlow: "#ECDFCC"
      },
    },
  },
  plugins: [],
} satisfies Config;
