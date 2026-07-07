import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

type Props = LinkProps &
    AnchorHTMLAttributes<HTMLAnchorElement>

export default function NoPrefetchLink({ children, ...props }: Props) {
    return (
        <Link {...props} prefetch={false}>
            {children}
        </Link>
    )
}