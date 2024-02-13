/** @type {import('tailwindcss').Config} */
export const content = ['./frontend/**/*.{js,ts,jsx,tsx}']
export const theme = {
 extend: {
  fontFamily: {
   sans: ['Avenir Next', 'sans-serif'],
  },
  colors: {
   'bg-primary': '#0D0E0F',
   'bg-secondary': '#1A1A1A',
   accent: '#D2AC53',
   'accent-bright': '#FCC000',
   'btn-bg': '#000',
   'btn-border': '#D9D9D9',
   'txt-primary': '#fff',
   'txt-secondary': '#A6A6A6',
   border: '#D2D2D2',
   divider: '#EAEAEA',
   'img-bg': '#EEEEEE',
   icon: '#898989',
   backdrop: '#1a1a1a75',
   'input-bg': 'rgba(37, 37, 37, 0.986)',
  },
 },
}
export const plugins = []
export const prefix = ''
