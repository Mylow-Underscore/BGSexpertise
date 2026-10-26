import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
          muted: "var(--brand-muted)",
          destructive: "var(--brand-destructive)",
          success: "var(--brand-success)",
          warning: "var(--brand-warning)",
          info: "var(--brand-info)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
