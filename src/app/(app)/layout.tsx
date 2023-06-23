import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { reader } from '@/app/keystatic/reader'

import '@/styles/globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

import {
  sharedOpenGraphMetadata,
  sharedTwitterMetadata,
} from '@/lib/shared-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const admin = await reader.singletons.admin.read()

  const title = admin?.siteTitle || ''
  const description = admin?.siteDescription || ''

  return {
    // TODO: Replace with the URL below before switching DNS servers
    metadataBase: new URL('https://sydjs-keystatic.vercel.app/'),
    // metadataBase: new URL('https://sydjs.com'),
    title: {
      template: `%s | ${admin?.siteTitle}`,
      default: title,
    },
    description: description,
    openGraph: {
      title,
      description,
      ...sharedOpenGraphMetadata,
    },
    twitter: {
      title,
      description,
      ...sharedTwitterMetadata,
    },
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
        suppressHydrationWarning={true}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
