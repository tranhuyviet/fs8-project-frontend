module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                titillium: ['Titillium Web', 'sans-serif'],
                rochester: ['Rochester', 'cursive'],
                satisfy: ['Satisfy', 'cursive'],
            },
            backgroundImage: {
                'hero-home': "url('/images/merry.webp')",
            },
            fontSize: {
                heroTitle: '120px',
                heroSubtitle: '70px',
            },
            margin: {
                '-140': '-140px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
