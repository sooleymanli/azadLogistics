module.exports = {
    theme: {
        extend: {
            animation: {
                'fade-in-out': 'fadeInOut 1s ease-in-out',
            },
            keyframes: {
                fadeInOut: {
                    '0%': { opacity: 0, transform: 'scale(0.95)' },
                    '50%': { opacity: 1, transform: 'scale(1)' },
                    '100%': { opacity: 0, transform: 'scale(0.95)' },
                },
            },
        },
    },
    plugins: [],
};
