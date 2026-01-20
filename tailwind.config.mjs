/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{ts,tsx,js,jsx,md,mdx}',
        './lib/**/*.{ts,tsx,js,jsx,md,mdx}',
        './components/**/*.{ts,tsx,js,jsx,md,mdx}',
        './content/**/*.{ts,tsx,js,jsx,md,mdx}',
        './mdx-components.tsx',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0EA5E9',
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
                heading: ['var(--font-heading)'],
            },
        },
    },
    plugins: [],
};
