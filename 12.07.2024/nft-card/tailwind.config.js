/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          softBlue: "hsl(215, 51%, 70%)",
          cyan: "hsl(178, 100%, 50%)",
        },
        neutral: {
          veryDarkBlueMain: "hsl(217, 54%, 11%)",
          veryDarkBlueCard: "hsl(216, 50%, 16%)",
          veryDarkBlueLine: "hsl(215, 32%, 27%)",
          white: "hsl(0, 0%, 100%)",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        paragraph: "18px",
      },
      boxShadow: {
        "dark-blue": "0 8px 32px -4px rgba(17, 24, 30, 0.75)",
      },
    },
  },
  plugins: [],
};
