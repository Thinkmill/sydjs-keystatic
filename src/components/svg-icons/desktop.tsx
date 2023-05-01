export function DesktopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M23 5.5a2.507 2.507 0 0 0-2.507-2.507L3.506 3A2.506 2.506 0 0 0 1 5.507V15.5a2.507 2.507 0 0 0 2.507 2.507L20.494 18A2.507 2.507 0 0 0 23 15.493V5.5ZM3.507 5l16.986-.007c.28 0 .507.227.507.507v9.993c0 .28-.227.507-.507.507l-16.987.007A.507.507 0 0 1 3 15.5V5.507c0-.28.227-.507.507-.507Z"
        clipRule="evenodd"
      />
      <path fill="currentcolor" d="M8 19a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" />
    </svg>
  )
}
