import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utilts";

interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const CustomButton = ({
  text,
  className,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      aria-label={text}
      className={cn(
        `
        group
        flex items-center gap-3
        px-5 py-2
        rounded-2xl
        
        bg-[#ededed]
        text-[#222]
        text-lg
        shadow-sm
        transition-colors duration-200
        hover:bg-[#e0e0e0]
        disabled:opacity-50 disabled:cursor-not-allowed
      `,
        className
      )}
      {...rest}
    >
      {/* Dot */}
      <span
        className="
          relative
          flex items-center justify-center
          w-4 h-4
          rounded-full
          bg-blue-500
          transition-all duration-300 ease-out
          group-hover:w-8 group-hover:h-8
        "
      >
        {/* Arrow */}
        <span
          className="
            absolute
            text-white
            text-base
            opacity-0 scale-75
            transition-all duration-200
            group-hover:opacity-100 group-hover:scale-100
          "
        >
          →
        </span>
      </span>

      <span>{text}</span>
    </button>
  );
};

export default CustomButton;