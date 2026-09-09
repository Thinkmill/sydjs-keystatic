import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { reader } from '@/app/keystatic/reader'

import '@/styles/globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { PreviewBanner } from '@/components/preview-banner'

import {
  sharedOpenGraphMetadata,
  sharedTwitterMetadata,
} from '@/lib/shared-metadata'

export async function generateMetadata(): Promise<Metadata> {
  const admin = await reader.singletons.admin.read()

  const title = admin?.siteTitle || ''
  const description = admin?.siteDescription || ''
  const previewSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const isPreview = Boolean(process.env.NEXT_PUBLIC_PR_NUMBER)

  return {
    metadataBase: new URL(previewSiteUrl || 'https://sydjs.com'),
    title: {
      template: `%s | ${admin?.siteTitle}`,
      default: title,
    },
    description: description,
    ...(isPreview && {
      robots: { index: false, follow: false },
    }),
    openGraph: {
      title,
      description,
      ...sharedOpenGraphMetadata,
      ...(previewSiteUrl && { url: previewSiteUrl }),
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${poppins.variable} grid min-h-screen grid-rows-[auto,1fr,auto] font-sans antialiased`}
      suppressHydrationWarning={true}
    >
      <div>
        <PreviewBanner />
        <Navigation />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
