import { cn } from "design-system/utils";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  qty: number;
  onChange: (qty: number) => void;
  min?: number;
  size?: "sm" | "md";
}

export function QuantityStepper({
  qty,
  onChange,
  min = 0,
  size = "md",
}: QuantityStepperProps) {
  const canDecrement = qty > min;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-2 rounded border border-border bg-white",
        size === "sm" ? "h-5 w-18 px-1" : "h-7 w-20 px-1.5",
      )}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={!canDecrement}
        onClick={() => onChange(Math.max(min, qty - 1))}
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded",
          canDecrement ? "hover:bg-muted" : "cursor-not-allowed opacity-40",
        )}>
        <Minus className="size-2" strokeWidth={3} />
      </button>
      <span className="min-w-[1ch] text-center text-sm font-semibold text-foreground">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="flex size-5 shrink-0 items-center justify-center rounded hover:bg-muted">
        <Plus className="size-2" strokeWidth={3} />
      </button>
    </div>
  );
}
