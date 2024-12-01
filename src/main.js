import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/tailwind.css";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(vuetify);
app.use(createPinia());
app.mount("#app");
