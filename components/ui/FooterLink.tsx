import { memo, type ReactNode } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";

type FooterLinkProps = {
    href: string;
    children: ReactNode;
    external?: boolean;
};

const FooterLink = memo(function FooterLink({
    href,
    children,
    external,
}: FooterLinkProps) {
    const itemClassName = `
        group relative flex items-center cursor-pointer
        transition-transform duration-200 ease-out
        hover:translate-x-2 active:scale-95
        mb-2 last:mb-0
      `;

    const content = (
        <>
            <span className="relative inline-block">
                {children}
            </span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0F5C85"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12h.5m3 0h1.5m3 0h6" />
                    <path d="M15 16l4 -4" />
                    <path d="M15 8l4 4" />
                </svg>
            </span>
        </>
    );

    if (external) {
        return (
            <li className={itemClassName}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {content}
                </a>
            </li>
        );
    }

    return (
        <li className={itemClassName}>
            <NoPrefetchLink href={href} className="flex items-center">
                {content}
            </NoPrefetchLink>
        </li>
    );
});

export default FooterLink;
