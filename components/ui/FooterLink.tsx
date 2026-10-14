import { memo, type ReactNode } from "react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";

type FooterLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

const itemClassName =
  "text-sm leading-6 text-muted transition-colors duration-200 hover:text-ink";

const FooterLink = memo(function FooterLink({
  href,
  children,
  external,
}: FooterLinkProps) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <NoPrefetchLink href={href} className={itemClassName}>
        {children}
      </NoPrefetchLink>
    </li>
  );
});

export default FooterLink;
