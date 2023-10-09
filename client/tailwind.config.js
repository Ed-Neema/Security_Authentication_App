/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d00d2d",
        secondary: "#9288E0",
        textDark: "#3B5162",
        textGrey: "#889898",
        textLight: "#ABBBC2",
        textLighter: "#E0E6E9",
        bgLight: "#FAFAFA",
        darkLine: "#393C49",
        darkBG1: "#252836",
        darkBG2: "#1F1D2B",
        formBG: "#2D303E",
        greenAccent: "#00b500",
        redAccent: "#FF7CA3",
        orangeAccent: "#FFB572",
        blueAccent: "#65B0F6",
        purpleAccent: "#9290FE",
      },
    },
  },
  plugins: [],
};

