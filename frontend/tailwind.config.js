import { defineConfig } from 'tailwindcss/plugin-api'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#005F99",
        brandGold: "#FFD700",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
});
