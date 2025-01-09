/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                Jakarta: ["Jakarta", "sans-serif"],
                JakartaBold: ["Jakarta-Bold", "sans-serif"],
                JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
                JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
                JakartaLight: ["Jakarta-Light", "sans-serif"],
                JakartaMedium: ["Jakarta-Medium", "sans-serif"],
                JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
            },
            colors: {
                primary: {
                    100: "#F5F8FF",
                    200: "#EBF4FF",
                    300: "#C3D9FF",
                    400: "#9BBFFF",
                    500: "#1F3A93", // Navy Blue
                    600: "#1B2D73",
                    700: "#162351",
                    800: "#0F1835",
                    900: "#080C18",
                },
                secondary: {
                    100: "#F0F4F8",
                    200: "#E4EBF3",
                    300: "#C9D6E1",
                    400: "#A6BDD2",
                    500: "#0E6655", // Dark Teal
                    600: "#0C5546",
                    700: "#093F34",
                    800: "#062B25",
                    900: "#041A17",
                },
                accent: {
                    100: "#FFF8E5",
                    200: "#FFEAB5",
                    300: "#FFD67F",
                    400: "#FFBE47",
                    500: "#F39C12", // Golden Yellow
                    600: "#C47D0E",
                    700: "#9A600A",
                    800: "#714708",
                    900: "#492F05",
                },
                success: {
                    100: "#E6F8EF",
                    200: "#BDEED3",
                    300: "#86E0B3",
                    400: "#4FCF8F",
                    500: "#27AE60", // Emerald Green
                    600: "#208C4D",
                    700: "#186A3A",
                    800: "#104A29",
                    900: "#092819",
                },
                danger: {
                    100: "#FDEDEC",
                    200: "#FACAC7",
                    300: "#F59A94",
                    400: "#ED6E61",
                    500: "#C0392B", // Crimson Red
                    600: "#9A2D22",
                    700: "#732119",
                    800: "#4D1611",
                    900: "#2A0B08",
                },
                warning: {
                    100: "#FFF8E5",
                    200: "#FFEAB5",
                    300: "#FFD67F",
                    400: "#FFBE47",
                    500: "#EAB308", // Golden Accent
                    600: "#CA8A04",
                    700: "#A16207",
                    800: "#854D0E",
                    900: "#713F12",
                },
                neutral: {
                    100: "#F8F9FA",
                    200: "#E9ECEF",
                    300: "#DEE2E6",
                    400: "#CED4DA",
                    500: "#6C757D", // Charcoal Gray
                    600: "#495057",
                    700: "#343A40",
                    800: "#212529",
                    900: "#121416",
                },
            },
        },
    },
    plugins: [],
};
