/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6C1FDE",
        "primary-50": "#f0e8ff",
        "primary-100": "#dccbff",
        "primary-900": "#3a0a8c",
        /** Onboarding / feature accent colours — eşleşme: appTheme.ts ACCENT_PALETTE */
        metronome: "#FEC802",
        chords: "#10CAB9",
        repertoire: "#FE6ABF",
        "background-light": "#F8F9FA",
        "background-dark": "#1A1B1E",
        "surface-light": "#ffffff",
        "surface-dark": "#252529",
        "neutral-50": "#fafafa",
        "neutral-100": "#f4f4f5",
        "neutral-200": "#e4e4e7",
        "neutral-300": "#d4d4d8",
        "neutral-400": "#a1a1aa",
        "neutral-500": "#71717a",
        "neutral-600": "#52525b",
        "neutral-700": "#3f3f46",
        "neutral-800": "#27272a",
        "neutral-900": "#18181b",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(108, 31, 222, 0.08)",
        "soft-hover": "0 20px 50px -12px rgba(108, 31, 222, 0.15)",
        "soft-xl": "0 20px 40px -10px rgba(108, 31, 222, 0.15)",
        float: "0 30px 60px -12px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
