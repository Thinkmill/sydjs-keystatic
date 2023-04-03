import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.variable} font-sans`}>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
