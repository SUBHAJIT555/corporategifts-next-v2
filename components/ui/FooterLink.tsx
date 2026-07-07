import { memo, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import NoPrefetchLink from "@/components/ui/NoPrefetchLink";
import { cn } from "@/lib/utilts";

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
  const itemClassName = cn(
    "group flex items-center gap-1.5 text-body-md text-muted transition-colors duration-200",
    "hover:text-ink"
  );

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 text-brand-accent opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </>
  );

  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li>
      <NoPrefetchLink href={href} className={itemClassName}>
        {content}
      </NoPrefetchLink>
    </li>
  );
});

export default FooterLink;
