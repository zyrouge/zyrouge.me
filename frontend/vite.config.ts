import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    define: {
        __META_LAST_COMPILED__: Date.now(),
    },
});
