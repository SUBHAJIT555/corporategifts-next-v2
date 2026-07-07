import { cn } from "@/lib/utilts";

type MonochromeBrandLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function MonochromeBrandLogo({
  src,
  alt,
  className,
}: MonochromeBrandLogoProps) {
  return (
    <span
      role="img"
      aria-label={alt}
      className={cn(
        "inline-block aspect-2/1 w-full max-h-16 bg-ink mix-blend-color-burn md:max-h-20 dark:bg-white",
        "mask-center mask-no-repeat mask-contain",
        className,
      )}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    />
  );
}
