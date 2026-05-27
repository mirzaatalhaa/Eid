/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fff8f3",
        "on-background": "#221a0f",
        primary: "#735c00",
        "primary-container": "#d4af37",
        "on-primary-container": "#554300",
        "on-primary": "#ffffff",
        secondary: "#006c52",
        "secondary-container": "#8ff6d0",
        "on-secondary-container": "#007257",
        "on-secondary": "#ffffff",
        tertiary: "#7b5644",
        "tertiary-container": "#d8a893",
        "on-tertiary-container": "#5f3d2d",
        "on-tertiary": "#ffffff",
        surface: "#fff8f3",
        "surface-dim": "#e6d8c5",
        "surface-container": "#fbecd9",
        "surface-container-high": "#f5e6d3",
        "surface-container-highest": "#efe0cd",
        "surface-container-low": "#fff2e2",
        "surface-container-lowest": "#ffffff",
        outline: "#7f7663",
        "outline-variant": "#d0c5af",
      },
      fontFamily: {
        headline: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'Nunito Sans'", "sans-serif"],
      },
      boxShadow: {
        sticker: "4px 4px 0px 0px #221a0f",
        "sticker-secondary": "4px 4px 0px 0px #006c52",
        "sticker-lg": "6px 6px 0px 0px #221a0f",
        "sticker-inner": "inset 2px 2px 0px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}
