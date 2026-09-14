/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eeedfe',
          100: '#cecbf6',
          200: '#afa9ec',
          400: '#7f77dd',
          500: '#534ab7',
          600: '#3c3489',
          700: '#26215c',
          900: '#191447',
        },
        gold: {
          50: '#faeeda',
          100: '#fac775',
          400: '#ef9f27',
          500: '#ba7517',
          600: '#854f0b',
        },
      },
    },
  },
  plugins: [],
}
