/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blob: "blob 10s infinite",
      },
      boxShadow: {
        custom: "6px 6px 0px rgba(2, 6, 23,.7)",
        "green-sm": "3px 3px 0px rgba(16, 185, 129, .9)",
        "green-md": "6px 6px 0px rgba(16, 185, 129, .9)",
        "red-md": "6px 6px 0px rgba(239, 68, 68, .9)",
      },
      dropShadow: {
        custom: "6px 6px 0px rgba(2, 6, 23,.7)",
        "green-sm": "1px 1px 0px rgba(16, 185, 129, .9)",
        "green-md": "3px 3px 0px rgba(16, 185, 129, .9)",
        "red-md": "3px 3px 0px rgba(239, 68, 68, .9)",
        "yellow-md": "3px 4px 0px rgba(234 ,179 ,8, .9)",
      },
    },
  },
  plugins: [],
};
