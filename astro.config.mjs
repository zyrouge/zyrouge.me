import path from "node:path";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://zyrouge.is-a.dev",
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
        mdx(),
        sitemap(),
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
