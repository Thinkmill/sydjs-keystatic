import '@/styles/globals.css'
import { Poppins } from 'next/font/google'
import { Metadata } from 'next'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../keystatic.config'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

// https://beta.nextjs.org/docs/api-reference/metadata#metadata-object
export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader('', keystaticConfig)
  const admin = await reader.singletons.admin.read()
  return {
    title: admin?.siteTitle,
    description: admin?.siteDescription,
  }
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
