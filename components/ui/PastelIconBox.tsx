import { cn } from "@/lib/utilts";

const ICON_STYLE_MAP: Record<string, { bgClass: string; iconClass: string }> = {
  "#B6E9C8": {
    bgClass: "bg-[#B6E9C8] dark:bg-[#B6E9C8]/15",
    iconClass: "text-ink dark:text-[#B6E9C8]",
  },
  "#FFF7BD": {
    bgClass: "bg-[#FFF7BD] dark:bg-[#FFF7BD]/15",
    iconClass: "text-ink dark:text-[#FFF7BD]",
  },
  "#C1D8FD": {
    bgClass: "bg-[#C1D8FD] dark:bg-[#C1D8FD]/15",
    iconClass: "text-ink dark:text-[#C1D8FD]",
  },
  "#FFD6F8": {
    bgClass: "bg-[#FFD6F8] dark:bg-[#FFD6F8]/15",
    iconClass: "text-ink dark:text-[#FFD6F8]",
  },
  "#FFECB3": {
    bgClass: "bg-[#FFECB3] dark:bg-[#FFECB3]/15",
    iconClass: "text-ink dark:text-[#FFECB3]",
  },
  "#FFE5EC": {
    bgClass: "bg-[#FFE5EC] dark:bg-[#FFE5EC]/15",
    iconClass: "text-ink dark:text-[#FFE5EC]",
  },
  "#E0F7FA": {
    bgClass: "bg-[#E0F7FA] dark:bg-[#E0F7FA]/15",
    iconClass: "text-ink dark:text-[#E0F7FA]",
  },
  "#EDE7F6": {
    bgClass: "bg-[#EDE7F6] dark:bg-[#EDE7F6]/15",
    iconClass: "text-ink dark:text-[#EDE7F6]",
  },
  "#FFF8E1": {
    bgClass: "bg-[#FFF8E1] dark:bg-[#FFF8E1]/15",
    iconClass: "text-ink dark:text-[#FFF8E1]",
  },
  "#F1F8E9": {
    bgClass: "bg-[#F1F8E9] dark:bg-[#F1F8E9]/15",
    iconClass: "text-ink dark:text-[#94EBC5]",
  },
};

export function getPastelIconStyles(iconColor: string) {
  const key = iconColor.trim().toUpperCase();

  return (
    ICON_STYLE_MAP[key] ?? {
      bgClass: "bg-surface-soft dark:bg-white/10",
      iconClass: "text-ink dark:text-brand-accent",
    }
  );
}

type PastelIconBoxProps = {
  color: string;
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
};

export default function PastelIconBox({
  color,
  children,
  size = "sm",
  className,
}: PastelIconBoxProps) {
  const styles = getPastelIconStyles(color);

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border border-hairline",
        size === "sm" ? "h-10 w-10" : "h-11 w-11",
        styles.bgClass,
        className,
      )}
    >
      <span className={cn("flex items-center justify-center", styles.iconClass)}>
        {children}
      </span>
    </span>
  );
}
