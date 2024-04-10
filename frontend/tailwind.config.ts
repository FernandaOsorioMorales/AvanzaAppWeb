import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./src/**/*.{ts,js,jsx,tsx}",
    "./**/*.html"
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins'],
    },
  },
  plugins:[require("daisyui")],
};

export default config;