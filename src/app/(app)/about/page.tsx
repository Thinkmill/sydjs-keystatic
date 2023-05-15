import { InferRenderersForComponentBlocks } from '@keystatic/core'
import { DocumentRenderer } from '@keystatic/core/renderer'

import { reader } from '@/app/keystatic/reader'
import { componentBlocks } from '@/app/keystatic/blocks'
import { Organiser } from '@/components/organiser'
import {
  sharedOpenGraphMetadata,
  sharedTwitterMetadata,
} from '@/lib/shared-metadata'

const metaTitleAndDescription = {
  title: 'About',
  description:
    'We are a community of JavaScript enthusiasts based in Sydney, Australia. Our mission is to bring together developers of all skill levels to share knowledge, discuss interesting topics, and foster a vibrant community.',
}

export const metadata = {
  ...metaTitleAndDescription,
  openGraph: {
    ...metaTitleAndDescription,
    ...sharedOpenGraphMetadata,
  },
  twitter: {
    ...metaTitleAndDescription,
    ...sharedTwitterMetadata,
  },
}

const componentBlocksRenderer: InferRenderersForComponentBlocks<
  typeof componentBlocks
> = {
  organiserList: (props) => (
    <div className="justfiy-between flex w-full flex-wrap gap-x-8 gap-y-8 sm:gap-y-12">
      {props.content.map((el) => (
        <>
          <Organiser key={el.organiser} slug={el.organiser} />
        </>
      ))}
    </div>
  ),
}

export default async function Page() {
  const aboutPage = await (
    await reader.singletons.admin.readOrThrow()
  ).aboutPage()
  return (
    <div className="prose mx-auto mt-20 max-w-4xl px-6 lg:prose-lg">
      <h1 className="text-5xl font-bold sm:text-6xl">About SydJS</h1>
      <DocumentRenderer
        document={aboutPage}
        componentBlocks={componentBlocksRenderer}
      />
    </div>
  )
}
