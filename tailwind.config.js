import { theme } from "../config/theme";

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        danger: theme.colors.danger,
        background: theme.colors.background,
        customGray: theme.colors.customGray,
      },
    },
  },
  plugins: [],
};
