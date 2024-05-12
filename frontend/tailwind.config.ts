import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./src/**/*.{ts,js,jsx,tsx}",
    "./**/*.html",
  ],
  theme: {
    extend: {
      maxHeight: {
        '90vh': '90vh',
        '80vh' : '80vh',
        '83vh' : '83vh',
      },
      height: {
        '90vh': '90vh',
        '80vh' : '80vh',
        '83vh' : '83vh',
      },
      colors: {
        'azulF':'#2F688A',
        'rojito':'#DC5663',
        'azulote':'#36BFBF',
        'vainilla':'#F8F0C6',
        'verde':'#9CDB94',
        'azulClarito':'#E9F9FF'
      },
      fontFamily:{
        poppins : ['Poppins']
      }
    }
  },
  plugins:[require("daisyui")],
};

export default config;
