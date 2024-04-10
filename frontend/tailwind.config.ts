import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./src/**/*.{ts,js,jsx,tsx}",
    "./**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'azulF':'#2F688A',
        'rojito':'#DC5663',
        'azulote':'#36BFBF',
        'vainilla':'F8F0C6',
        'azulClarito':'E9F9FF'
      },
      fontFamily:{
        poppins : ['Poppins']
      }
    }
  },
  plugins:[require("daisyui")],
};

export default config;
