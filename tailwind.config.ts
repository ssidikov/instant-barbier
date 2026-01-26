import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0b1622',
        gold: '#9c8358',
        cream: '#f4f1ec',
        dark: '#0f0f0f',
      },
      fontFamily: {
        title: ['var(--font-playfair)'],
        body: ['var(--font-muli)'],
      },
    },
  },
  plugins: [],
}

export default config
