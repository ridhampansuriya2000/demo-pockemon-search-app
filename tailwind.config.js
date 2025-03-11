module.exports = {
    theme: {
        extend: {
            borderColor: {
                border: 'hsl(var(--border))',
            },
        },
    },
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    plugins: [],
};
