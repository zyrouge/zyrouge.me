import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
    site: "https://zyrouge.me",
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
        mdx(),
        sitemap(),
        icon(),
    ],
    output: "static",
    vite: {
        resolve: {
            alias: {
                "~": path.resolve("src"),
            },
        },
    },
});
