import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d0e",
        paper: "#f1eee7",
        acid: "#d6ff3f",
        coral: "#ff735c",
        mist: "#a9afa9"
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        mono: ["var(--font-ibm-plex-mono)"]
      }
    }
  },
  plugins: []
};

export default config;
