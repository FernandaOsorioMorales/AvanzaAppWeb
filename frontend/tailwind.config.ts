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
    extend: {
      colors: {
        'azulote': '#2F688A',
        'red': '#DC5663',
        'aqua': '#36BFBF',
        'vainilla': '#F8F0C6',
        'blue-light': '#e9f9ff'
      },
    },
  },
  plugins: [],
};

export default config;