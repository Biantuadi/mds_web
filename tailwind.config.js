module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#4A5D4A",
          coral: "#FF8D6E",
        },
        background: "#fffbf1",
        accent: "#ef7d4f",
      },
      borderRadius: {
        "4xl": "32px",
      },
      fontFamily: {
        sans: [
          "Quicksand",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        reef: ["Reef", "sans-serif"],
      },
      boxShadow: {
        'card': '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
        'header': '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};