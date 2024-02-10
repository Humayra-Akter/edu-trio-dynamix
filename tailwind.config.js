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
          primary: "#3F88C5",
          secondary: "#FFE666",
          accent: "#B83280",
          neutral: "#00ACDF",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
