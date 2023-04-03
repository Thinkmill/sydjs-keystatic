import Link from 'next/link'

export default function FeaturedEvent() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="grid gap-28 rounded-[40px] bg-yellow-300 p-16 md:grid-cols-3">
        <div className="md:col-span-2">
          <span className="rounded-full border-2 border-black px-4 py-1.5 text-sm font-bold leading-none">
            upcoming event
          </span>
          <h2 className="mt-8 text-4xl/none font-bold">Thinkmill takes over SydJS</h2>
          <p className="mt-4 text-lg">
            We know that Open Source Software is a great way to ensure that the best minds get to
            work on the best solutions to make the best outcomes for all Developers. But what does
            it take to make a successful Open Source solution?
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="#"
              className="rounded-2xl border-2 border-black px-6 py-5 text-lg/none font-semibold"
            >
              View event details
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2.5 px-6 py-5 text-lg/none font-semibold"
            >
              <span>RSVP on Lu.ma</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="h-5 w-5 fill-black"
              >
                <path
                  fill="inherit"
                  fillRule="evenodd"
                  d="M12.75 1a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1v5.25a1 1 0 1 1-2 0V3.414l-8.793 8.793a1 1 0 0 1-1.414-1.414L16.586 2H13.75a1 1 0 0 1-1-1ZM2.875 5A.875.875 0 0 0 2 5.875v11.25a.875.875 0 0 0 .875.875h11.25a.874.874 0 0 0 .875-.875V8.5a1 1 0 1 1 2 0v8.625A2.876 2.876 0 0 1 14.125 20H2.875A2.875 2.875 0 0 1 0 17.125V5.875A2.875 2.875 0 0 1 2.875 3h7.85a1 1 0 1 1 0 2h-7.85Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
        <ul>
          <li>some info</li>
          <li>some info</li>
          <li>some info</li>
          <li>some info</li>
          <li>some info</li>
        </ul>
      </div>
    </div>
  )
}
