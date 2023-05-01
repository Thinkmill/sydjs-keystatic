import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

import { Metadata } from 'next'

// https://beta.nextjs.org/docs/api-reference/metadata#metadata-object
export const metadata: Metadata = {
  title: {
    default: 'SydJS',
    template: '%s | SydJS',
  },
  description:
    'Join the vibrant and inclusive community of web developers discussing the latest in Javascript from Sydney, Australia.',
}

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
