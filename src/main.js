import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/tailwind.css";

import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  rtl: true,
  toastClassName: "custom-toast",
});

app.use(vuetify);
app.use(createPinia());
app.mount("#app");
