/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueAccent: "#00c7ff",
        textColor: "#FFFFFF",
        textColorSoft: "#8d9bb0",
        bgcolor: "#000a1f",
        bgcolorSoft: "#192742",
      },
    },
  },
  plugins: [],
};
