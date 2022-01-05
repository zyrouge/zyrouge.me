const Colors = require("tailwindcss/colors");

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: Colors.cyan,
                secondary: Colors.pink,
            },
        },
    },
    plugins: [],
};
