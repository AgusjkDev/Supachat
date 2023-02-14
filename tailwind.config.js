/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["**/*.jsx"],
    theme: {
        extend: {
            colors: {
                primary: "#3fcf8e",
                background: {
                    500: "#343434",
                    600: "#2e2e2e",
                    700: "#282828",
                    800: "#232323",
                    900: "#1c1c1c",
                },
                secondary: {
                    darker: "#505050",
                    dark: "#a0a0a0",
                    DEFAULT: "#ededed",
                },
            },
        },
    },
    plugins: [],
};
