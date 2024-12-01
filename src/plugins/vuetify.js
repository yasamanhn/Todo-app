import { createVuetify } from "vuetify";
import "vuetify/styles";

import { theme } from "../config/theme";

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
          danger: theme.colors.danger,
          gray: theme.colors.gray,
          customColor100: theme.colors.customColor["100"],
          customColor900: theme.colors.customColor["200"],
        },
      },
    },
  },
});

export default vuetify;
