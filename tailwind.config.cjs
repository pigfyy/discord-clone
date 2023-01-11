/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "neutral-100": "#FFFFFF",
      "neutral-150": "hsl(210, 3%, 87%)",
      "neutral-175": "hsl(216, 4%, 74%)",
      "neutral-200": "hsl(214, 4%, 65%)",
      "neutral-300": "hsl(223, 3%, 60%)",
      "neutral-400": "hsl(213, 4%, 57%)",
      "neutral-500": "hsl(218, 8%, 27%)",
      "neutral-600": "hsl(220, 7%, 25%)",
      "neutral-700": "hsl(220, 8%, 23%)",
      "neutral-800": "hsl(223, 7%, 20%)",
      "neutral-900": "hsl(216, 7%, 14%)",
      "neutral-950": "hsl(225, 8%, 10%)",
      "primary-400": "hsl(235, 86%, 65%)",
    },
    extend: {},
  },
  plugins: [],
};