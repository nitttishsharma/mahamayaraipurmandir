/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5D2A2A',
                secondary: '#D97706',
                accent: '#FCE043',
                cream: '#FFFBC9',
                darkText: '#2C2C2C',
                maroon: '#99221C',
            },
            fontFamily: {
                serif: ['Marcellus', 'serif'],
                sans: ['Poppins', 'sans-serif'],
            },
            backgroundImage: {
                'temple-pattern': "url('/images/common/background-pattern.png')",
            }
        },
    },
    plugins: [],
}
