const prNumber = process.env.NEXT_PUBLIC_PR_NUMBER
const prUrl = process.env.NEXT_PUBLIC_PR_URL

export function PreviewBanner() {
  if (!prNumber) {
    return null
  }

  return (
    <div className="bg-highlight px-4 py-2 text-center text-sm font-semibold text-black">
      Preview of{' '}
      {prUrl ? (
        <a className="underline underline-offset-2" href={prUrl}>
          pull request #{prNumber}
        </a>
      ) : (
        `pull request #${prNumber}`
      )}
      . Not the live SydJS site.
    </div>
  )
}
