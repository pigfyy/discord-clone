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
      "neutral-450": "hsl(216, 3%, 38%)",
      "neutral-475": "hsl(210, 2%, 35%)",
      "neutral-490": "hsl(218, 7%, 30%)",
      "neutral-500": "hsl(218, 8%, 27%)",
      "neutral-600": "hsl(220, 7%, 25%)",
      "neutral-700": "hsl(220, 8%, 23%)",
      "neutral-800": "hsl(223, 7%, 20%)",
      "neutral-900": "hsl(216, 7%, 14%)",
      "neutral-950": "hsl(225, 8%, 10%)",
      "primary-300": "hsl(197, 100%, 48%)",
      "primary-400": "hsl(235, 86%, 65%)",
      "green-200": "hsl(139, 52%, 52%)",
      "green-400": "hsl(139, 47%, 33%)",
      "red-500": "hsl(359, 83%, 59%)",
      "red-600": "hsl(359, 67%, 54%)",
    },
    extend: {
      boxShadow: {
        inset: "inset 0px -16px 1px -14px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
