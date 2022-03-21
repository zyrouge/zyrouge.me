import { createApp } from "vue";
import { router } from "./core/router";
import App from "./App.vue";
import "./assets/styles.scss";

const app = createApp(App);

app.use(router).mount("#app");
