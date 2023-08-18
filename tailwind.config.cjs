const Colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                primary: Colors.fuchsia,
                secondary: Colors.neutral,
            },
            fontFamily: {
                sans: "'Inter', sans-serif",
                mono: "'Roboto Mono', monospace",
            },
        },
    },
    plugins: [],
};
