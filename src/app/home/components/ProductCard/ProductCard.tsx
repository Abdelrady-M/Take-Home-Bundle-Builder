import { cn } from "design-system/utils";
import { useState } from "react";
import { resolveImage } from "../../data/products";
import type { ProductRecord } from "../../data/types";
import { PriceBlock } from "../PriceBlock/PriceBlock";
import { QuantityStepper } from "../QuantityStepper/QuantityStepper";
import { VariantSelector } from "../VariantSelector/VariantSelector";

interface ProductCardProps {
  product: ProductRecord;
  getQty: (productId: string, variantId?: string) => number;
  setQty: (productId: string, qty: number, variantId?: string) => void;
}

export function ProductCard({ product, getQty, setQty }: ProductCardProps) {
  const [activeVariantId, setActiveVariantId] = useState(
    product.activeVariantId ?? product.variants?.[0]?.id,
  );

  const qty = getQty(product.id, activeVariantId);
  const isSelected = product.variants
    ? product.variants.some(variant => getQty(product.id, variant.id) > 0)
    : qty > 0;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-[10px] border-2 bg-white p-3",
        isSelected ? "border-primary/70" : "border-transparent",
      )}>
      <div className="relative h-27.5 w-20 shrink-0 overflow-hidden rounded-[5px] bg-muted/40">
        <img
          src={resolveImage(product.image)}
          alt={product.name}
          className="size-full object-cover"
        />
        {product.badge && (
          <span className="absolute left-0 top-0 rounded-br-[10px] rounded-tl-[5px] bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 text-xs text-muted-foreground">
              {product.description}{" "}
              {product.learnMoreUrl && (
                <a
                  href={product.learnMoreUrl}
                  className="text-blue-700 underline">
                  Learn More
                </a>
              )}
            </p>
          )}
        </div>

        {product.variants && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId ?? product.variants[0].id}
            onSelect={setActiveVariantId}
          />
        )}

        <div className="mt-auto flex items-end justify-between gap-2">
          {product.isPlan ? (
            <button
              type="button"
              onClick={() => setQty(product.id, qty > 0 ? 0 : 1)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm font-semibold",
                qty > 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-foreground",
              )}>
              {qty > 0 ? "Selected" : "Select plan"}
            </button>
          ) : (
            <QuantityStepper
              qty={qty}
              min={product.required ? 1 : 0}
              onChange={next => setQty(product.id, next, activeVariantId)}
            />
          )}

          <PriceBlock
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            priceUnit={product.priceUnit}
          />
        </div>
      </div>
    </div>
  );
}
