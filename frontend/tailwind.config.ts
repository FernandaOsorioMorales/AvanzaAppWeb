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
      colors: {
        'azulote': '#2F688A',
        'redd': '#DC5663',
        'aqua': '#36BFBF',
        'vainilla': '#F8F0C6',
        'azulito': '#e9f9ff'
      },
  },
  plugins: [],
};

export default config;