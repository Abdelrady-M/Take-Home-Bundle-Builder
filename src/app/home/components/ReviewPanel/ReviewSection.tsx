import type { ReviewCategory } from "../../data/types";
import type { CartLineItem } from "../../hooks/use-cart";
import { ReviewLineItem } from "./ReviewLineItem";

interface ReviewSectionProps {
  category: ReviewCategory;
  items: CartLineItem[];
  setQty: (productId: string, qty: number, variantId?: string) => void;
}

export function ReviewSection({ category, items, setQty }: ReviewSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {category}
      </p>
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <ReviewLineItem
            key={`${item.product.id}::${item.variantId ?? ""}`}
            item={item}
            onChangeQty={qty => setQty(item.product.id, qty, item.variantId)}
          />
        ))}
      </div>
    </div>
  );
}
