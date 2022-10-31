/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}', 
    "./public/**/*.html",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    screens: {
      sm: '450px',
      md: '700px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      spacing: {
        '100': '50vw',
      },
      fontFamily: {
        'serif': ['Cinzel', 'serif'],

      },
      clipPath: {
        mypolygon: 'polygon(0 0, 100% 0, 0% 100%, 0 calc(100% - 6vw))',
        myoppositepolygon: 'polygon(100% 0, 100% 0, 100% 100%, 0 calc(100% - 0vw))',
        mycorners: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)',
    },
      height: {
        '1000': '1000px',
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  variants: {
    animation: ["motion-safe"]
},
  plugins: [require('tailwindcss-elevation')(['responsive']), require('tw-elements/dist/plugin'), require("flowbite/plugin"), require('tailwind-clip-path'),],
}

