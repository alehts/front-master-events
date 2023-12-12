/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this to include the path to your components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#43777A', // Add your primary color here
      },
    }, // You can add customizations to the default theme here
  },
  plugins: [], // You can add additional plugins here if necessary
};

