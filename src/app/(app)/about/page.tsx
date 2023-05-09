import { InferRenderersForComponentBlocks } from '@keystatic/core'
import { DocumentRenderer } from '@keystatic/core/renderer'

import { reader } from '@/app/keystatic/reader'
import { componentBlocks } from '@/app/keystatic/blocks'
import { Organiser } from '@/components/organiser'

export const metadata = {
  title: 'About',
}

async function getData() {
  const admin = await reader.singletons.admin.readOrThrow()

  return {
    admin,
    aboutPage: await admin?.aboutPage(),
  }
}

const componentBlocksRenderer: InferRenderersForComponentBlocks<
  typeof componentBlocks
> = {
  organiserList: (props) => (
    <div className="justfiy-between flex w-full flex-wrap gap-x-8 gap-y-8 sm:gap-y-12">
      {props.content.map((el) => (
        <>
          {/* @ts-expect-error Server Component */}
          <Organiser key={el.organiser} slug={el.organiser} />
        </>
      ))}
    </div>
  ),
}

export default async function Page() {
  const data = await getData()
  return (
    <div className="prose mx-auto mt-20 max-w-4xl px-6 lg:prose-lg">
      <DocumentRenderer
        document={data.aboutPage || []}
        componentBlocks={componentBlocksRenderer}
      />
    </div>
  )
}

export const dynamicParams = true
