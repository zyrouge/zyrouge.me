import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
    site: "https://zyrouge.me",
    integrations: [mdx(), sitemap(), icon()],
    output: "static",
    vite: {
        plugins: [tailwind()],
        resolve: {
            alias: {
                "~": path.resolve("src"),
            },
        },
    },
});
