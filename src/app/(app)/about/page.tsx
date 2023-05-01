import { createReader } from '@keystatic/core/reader'
import { DocumentRenderer } from '@keystatic/core/renderer'

import keystaticConfig from '../../../../keystatic.config'

export const metadata = {
  title: 'About',
}

async function getData() {
  const reader = createReader('', keystaticConfig)
  const admin = await reader.singletons.admin.read()

  return {
    admin,
    aboutPage: await admin?.aboutPage(),
  }
}

export default async function Page(context: any) {
  const data = await getData()
  return (
    <div className="prose prose mx-auto mt-20 max-w-5xl px-6">
      <DocumentRenderer document={data.aboutPage || []} />
    </div>
  )
}

export const dynamicParams = true
