/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',
    './providers/**/*.{jsx,tsx}',
    './services/**/*.{jsx,tsx}',
    './api/**/*.{jsx,tsx}',
    './auth/**/*.{jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
