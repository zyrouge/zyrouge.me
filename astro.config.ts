import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
    site: "https://zyrouge.me",
    integrations: [mdx(), sitemap(), icon()],
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Roboto Mono",
            cssVariable: "--font-roboto-mono",
            weights: ["400", "700"],
        },
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-inter",
            weights: ["400", "700", "900"],
        },
    ],
    output: "static",
    compressHTML: true,
    vite: {
        plugins: [tailwind()],
        resolve: {
            alias: {
                "~": path.resolve("src"),
            },
        },
    },
});
