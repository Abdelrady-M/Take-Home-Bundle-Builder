import { cn } from "design-system/utils";
import { resolveImage } from "../../data/products";
import type { ProductVariant } from "../../data/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {variants.map(variant => {
        const isActive = variant.id === activeVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            aria-pressed={isActive}
            className={cn(
              "flex h-6.5 items-center gap-1.5 rounded-sm border px-1.5 text-[10px] font-medium tracking-wide text-foreground",
              isActive
                ? "border-primary bg-primary/5"
                : "border-border bg-white",
            )}>
            {variant.swatchImage && (
              <img
                src={resolveImage(variant.swatchImage)}
                alt=""
                className="size-5.5 shrink-0 rounded-sm object-cover"
              />
            )}
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
