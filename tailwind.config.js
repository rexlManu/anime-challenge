module.exports = {
  mode: "jit",
  purge: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ["Nunito Sans", "sans-serif"],
        sans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#f2fbff",
          100: "#e6f6ff",
          200: "#c0eaff",
          300: "#9addff",
          400: "#4ec3ff",
          500: "#02a9ff",
          600: "#0298e6",
          700: "#027fbf",
          800: "#016599",
          900: "#01537d",
        },
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ["rounded"],
  },
  plugins: [require("tailwind-scrollbar")],
};
