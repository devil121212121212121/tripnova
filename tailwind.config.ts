import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcd9ff",
          300: "#8ec0ff",
          400: "#599cff",
          500: "#0066ff",
          600: "#0052cc",
          700: "#0041a8",
          800: "#0a2a66",
          900: "#0a1d40",
          950: "#061026",
        },
        coral: {
          50: "#fff5f0",
          100: "#ffe8dc",
          200: "#ffd2bd",
          300: "#ffb191",
          400: "#ff8254",
          500: "#ff5722",
          600: "#f03e0a",
          700: "#c72c04",
          800: "#9e2509",
          900: "#7f220d",
        },
        slate: {
          850: "#151f32",
          950: "#090d16",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(10, 34, 64, 0.08)",
        dropdown: "0 10px 40px -10px rgba(10, 34, 64, 0.16)",
        hero: "0 20px 50px -12px rgba(0, 34, 80, 0.22)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      }
    },
  },
  plugins: [],
};
export default config;
