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
        primary: "#5e35b1",
        "background-light": "#f7f6f8",
        "background-dark": "#17141e",
        "neutral-50": "#faf9fc",
        "neutral-100": "#f3f1f6",
        "neutral-200": "#e5e1eb",
        "neutral-300": "#cec6db",
        "neutral-400": "#a89bc4",
        "neutral-500": "#8573ad",
        "neutral-600": "#6a5796",
        "neutral-700": "#56457a",
        "neutral-800": "#453861",
        "neutral-900": "#39304d",
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
        "soft-xl": "0 20px 40px -10px rgba(94, 53, 177, 0.15)",
        float: "0 30px 60px -12px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
