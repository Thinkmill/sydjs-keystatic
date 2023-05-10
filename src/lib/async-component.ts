import { ReactElement, ReactNode } from 'react'

// this should be removed when ts 5.1 and the updated react types are out that make this unnecessary
export function asyncComponent<Props extends {}>(
  component: (props: Props) => Promise<ReactNode> | ReactNode
): (props: Props) => ReactElement {
  return component as any
}
