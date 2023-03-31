import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1>Welcome to the home of SydJS</h1>
      <p>A meetup style event all about JavaScript. Hosted in Sydney, streamed internationally.</p>
    </main>
  )
}
