import { HiMinus, HiPlus } from "@/components/icons";
import { cn } from "./utilts";

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    min?: number;
    max?: number;
    className?: string;
    variant?: "default" | "cal";
}

export const QuantitySelector = ({
    quantity,
    onQuantityChange,
    min = 1,
    max = 999,
    className,
    variant = "default",
}: QuantitySelectorProps) => {
    const isCal = variant === "cal";
    const handleDecrease = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity > min) onQuantityChange(quantity - 1);
    };

    const handleIncrease = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity < max) onQuantityChange(quantity + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const val = Number(e.target.value);
        if (!val) return onQuantityChange(min);
        onQuantityChange(Math.min(max, Math.max(min, val)));
    };

    return (
        <div
            className={cn(
                "flex select-none items-center overflow-hidden border",
                isCal
                    ? "rounded-lg border-hairline bg-canvas"
                    : "rounded-xl border-gray-300 bg-neutral-100",
                className
            )}
        >
            <button
                onClick={handleDecrease}
                disabled={quantity <= min}
                className={cn(
                    "flex h-9 w-9 items-center justify-center transition-colors sm:h-10 sm:w-10",
                    isCal ? "text-ink hover:bg-surface-soft" : "hover:bg-gray-100",
                    quantity <= min && "cursor-not-allowed opacity-50"
                )}
            >
                <HiMinus className={cn("h-4 w-4", isCal ? "text-ink" : "text-textcolor")} />
            </button>

            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
                className={cn(
                    "no-spinner flex-1 border-x text-center outline-none focus:outline-none focus:ring-0",
                    isCal
                        ? "border-hairline font-medium text-ink"
                        : "border-gray-300 font-switzer text-textcolor"
                )}
            />

            <button
                onClick={handleIncrease}
                disabled={quantity >= max}
                className={cn(
                    "flex h-9 w-9 items-center justify-center transition-colors sm:h-10 sm:w-10",
                    isCal ? "text-ink hover:bg-surface-soft" : "hover:bg-gray-100",
                    quantity >= max && "cursor-not-allowed opacity-50"
                )}
            >
                <HiPlus className={cn("h-4 w-4", isCal ? "text-ink" : "text-textcolor")} />
            </button>
        </div>
    );
};