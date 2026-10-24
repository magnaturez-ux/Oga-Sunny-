/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#00FF88",
        sun: "#FFD400",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        graffiti: ["var(--font-marker)", "Impact", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 0 2px #00FF88, 0 0 24px rgba(0, 255, 136, 0.35)",
      },
    },
  },
  plugins: [],
};
