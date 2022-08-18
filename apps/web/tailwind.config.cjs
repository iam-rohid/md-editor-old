const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: "class",
  theme: {
    colors: {
      white: "#ffffff",
      black: "#0E1012",
      transparent: colors.transparent,
      gray: {
        50: "#F9FAFA",
        100: "#F1F1F2",
        200: "#E7E7E8",
        300: "#D3D4D5",
        400: "#ABADAF",
        500: "#7D7F83",
        600: "#52555A",
        700: "#33373D",
        800: "#1D2025",
        900: "#171A1D",
      },
      primary: colors.blue,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [],
};
