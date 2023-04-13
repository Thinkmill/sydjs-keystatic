import { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import containerQueriesPlugin from '@tailwindcss/container-queries'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      highlight: '#FFE221',
      accent: '#B5C2FF',
    },
    extend: {
      textColor: {
        default: '#000000',
        subtle: '#313131',
        placeholder: '#616161',
      },
      spacing: {
        18: '4.5rem',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [containerQueriesPlugin],
} satisfies Config

export default config
