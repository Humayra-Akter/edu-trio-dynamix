/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0072B5",
          secondary: "#70A4B8",
          accent: "#FFA500",
          neutral: "#F3F4F6",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
