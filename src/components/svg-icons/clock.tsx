export function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M2 12C2 6.479 6.479 2 12 2s10 4.479 10 10-4.479 10-10 10S2 17.521 2 12Zm10-8c-4.416 0-8 3.584-8 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8Z"
        clipRule="evenodd"
      />
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M12 5a1 1 0 0 1 1 1v5.75h3.5a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
