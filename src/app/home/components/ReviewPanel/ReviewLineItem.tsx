import { resolveImage } from "../../data/products";
import type { CartLineItem } from "../../hooks/use-cart";
import { PriceBlock } from "../PriceBlock/PriceBlock";
import { QuantityStepper } from "../QuantityStepper/QuantityStepper";

interface ReviewLineItemProps {
  item: CartLineItem;
  onChangeQty: (qty: number) => void;
}

export function ReviewLineItem({ item, onChangeQty }: ReviewLineItemProps) {
  const { product, variantId, variantLabel, qty } = item;

  return (
    <div className="flex items-center gap-3">
      <img
        src={resolveImage(
          variantId
            ? (product.variants?.find(v => v.id === variantId)?.swatchImage ??
                product.image)
            : product.image,
        )}
        alt=""
        className="size-10.25 shrink-0 rounded-[5px] object-cover"
      />
      <span className="flex-1 text-sm font-medium text-foreground">
        {product.name}
        {variantLabel && (
          <span className="text-muted-foreground"> · {variantLabel}</span>
        )}
      </span>
      {product.required ? (
        <QuantityStepper qty={qty} min={1} onChange={onChangeQty} size="sm" />
      ) : product.isPlan ? null : (
        <QuantityStepper qty={qty} onChange={onChangeQty} size="sm" />
      )}
      <PriceBlock
        price={item.lineTotal}
        compareAtPrice={
          product.compareAtPrice != null ? item.lineCompareAtTotal : undefined
        }
        priceUnit={product.priceUnit}
      />
    </div>
  );
}
