import { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import plugin from 'tailwindcss/plugin'

const safariVariant = plugin(function ({ addVariant }) {
  addVariant(
    'safari',
    '@media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) { & }}'
  )
})

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        highlight: '#FFE221',
        accent: '#B5C2FF',
      },
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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    containerQueriesPlugin,
    require('@tailwindcss/typography'),
    safariVariant,
  ],
} satisfies Config

export default config
