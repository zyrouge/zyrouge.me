import { createApp } from "vue";
import { head } from "./core/head";
import { router } from "./core/router";
import App from "./App.vue";
import "./assets/styles.scss";

const app = createApp(App);

app.use(head).use(router).mount("#app");
