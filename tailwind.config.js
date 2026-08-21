/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          yellow: '#E5FF00',
          red: '#FF003C',
          blue: '#0026FF',
          black: '#050505',
          white: '#FDFBF7'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(5,5,5,1)',
        'brutal-hover': '4px 4px 0px 0px rgba(5,5,5,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(5,5,5,1)',
      }
    },
  },
  plugins: [],
}