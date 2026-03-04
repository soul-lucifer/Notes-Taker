import type { Config } from 'tailwindcss'

export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: '#0D0D0D',
                    secondary: '#141414',
                    card: '#1A1A1A',
                    hover: '#222222',
                },
                accent: {
                    DEFAULT: '#E8192C',
                    dim: '#3D0A0F',
                },
                border: {
                    DEFAULT: '#2A2A2A',
                    light: '#333333',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                DEFAULT: '8px',
                lg: '12px',
            }
        }
    },
    plugins: []
} satisfies Config
