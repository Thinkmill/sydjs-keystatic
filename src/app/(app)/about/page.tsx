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
    <div className="-mx-12 flex flex-wrap">
      {props.content.map((el) => (
        <div className="w-full max-w-xs px-12" key={el.organiser}>
          {/* @ts-expect-error Server Component */}
          <Organiser slug={el.organiser} />
        </div>
      ))}
    </div>
  ),
}

export default async function Page(context: any) {
  const data = await getData()
  return (
    <div className="prose mx-auto mt-20 max-w-5xl px-6">
      <DocumentRenderer
        document={data.aboutPage || []}
        componentBlocks={componentBlocksRenderer}
      />
    </div>
  )
}

export const dynamicParams = true
