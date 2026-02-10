/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0788ff',
      },
      keyframes: {
        spinner: {
          '0%, 40%, 100%': {
            transform: 'scaleY(1)',
          },
          '20%': {
            transform: 'scaleY(1.5)',
          },
        },
      },
      animation: {
        spinner: 'spinner 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
