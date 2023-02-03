import path from "node:path";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
    integrations: [tailwind({ config: { applyBaseStyles: false } }), mdx()],
    output: "static",
    vite: {
        resolve: {
            alias: {
                "~": path.resolve("src"),
            },
        },
    },
});
