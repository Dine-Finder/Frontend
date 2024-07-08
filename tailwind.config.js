/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderImage: {
        'gradient-to-r': 'linear-gradient(to right, #000 50%, transparent 50%) 100% 1',
      },

    },
    colors:{
      main:'rgb(128,0,128)',
      light:'rgb(221,160,221)',
      mainfade: 'rgb(128,0,128,0.48)',

      transparent: 'rgb(0,0,0,0.0)',

      white:'rgb(255,255,255)',
      grey: 'rgb(192,192,192)',
      black:'rgb(0,0,0)',

      red:'rgb(255,0,0)',
      redlight:"rgb(255,170,170)",

      orange:'rgb(255,140,0)',



      yellow:'rgb(255,255,0)',
      yellowlight:'rgb(255,255,153)',
      yellowfade:'rgb(255,255,0,0.40)',

      green:'rgb(0,168,0)',
      greenlight:'rgb(153,255,153)'
      
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.border-t-gradient': {
          borderImage: 'linear-gradient(to left, var(--border-color, #000) 96%, transparent 4%) 100% 1',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

