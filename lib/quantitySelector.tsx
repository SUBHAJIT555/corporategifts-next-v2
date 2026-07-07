import { HiMinus, HiPlus } from "@/components/icons";
import { cn } from "./utilts";

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    min?: number;
    max?: number;
}

export const QuantitySelector = ({ quantity, onQuantityChange, min = 1, max = 999 }: QuantitySelectorProps) => {
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
        <div className="flex items-center rounded-xl bg-neutral-100 overflow-hidden border border-gray-300 select-none">
            <button
                onClick={handleDecrease}
                disabled={quantity <= min}
                className={cn(
                    "w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors",
                    quantity <= min && "opacity-50 cursor-not-allowed"
                )}
            >
                <HiMinus className="w-4 h-4 text-textcolor" />
            </button>

            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
                className=" flex-1 text-center font-switzer text-textcolor border-x border-gray-300 no-spinner outline-none focus:outline-none focus:ring-0"
            />

            <button
                onClick={handleIncrease}
                disabled={quantity >= max}
                className={cn(
                    "w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors",
                    quantity >= max && "opacity-50 cursor-not-allowed"
                )}
            >
                <HiPlus className="w-4 h-4 text-textcolor" />
            </button>
        </div>
    );
};