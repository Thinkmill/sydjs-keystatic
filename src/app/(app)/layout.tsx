import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { createReader } from '@keystatic/core/reader'

import '@/styles/globals.css'
import keystaticConfig from '@/app/keystatic/keystatic.config'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

// https://beta.nextjs.org/docs/api-reference/metadata#metadata-object
export async function generateMetadata(): Promise<Metadata> {
  const reader = createReader('', keystaticConfig)
  const admin = await reader.singletons.admin.read()
  return {
    title: {
      template: `%s | ${admin?.siteTitle}`,
      default: admin?.siteTitle || '',
    },
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
      <body
        className={`${poppins.variable} grid min-h-screen grid-rows-[auto,1fr,auto] font-sans antialiased`}
      >
        <Navigation />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
