const Colors = require("tailwindcss/colors");

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: Colors.fuchsia,
                secondary: Colors.neutral,
            },
        },
    },
    plugins: [],
};
