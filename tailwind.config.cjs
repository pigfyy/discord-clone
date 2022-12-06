/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "neutral-100": "#FFFFFF",
      "neutral-150": "hsl(210, 3%, 87%)",
      "neutral-700": "hsl(220, 8%, 23%)",
      "neutral-900": "hsl(216, 7%, 14%)",
      "neutral-950": "hsl(225, 8%, 10%)",
      "primary-400": "hsl(235, 86%, 65%)",
    },
    extend: {},
  },
  plugins: [],
};
