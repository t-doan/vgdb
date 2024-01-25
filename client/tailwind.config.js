/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1240px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui'), require('flowbite/plugin')],
};
