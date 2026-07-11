import { formatPrice } from "../../utils/format";

interface PriceBlockProps {
  price: number;
  compareAtPrice?: number;
  priceUnit?: "once" | "/mo";
}

export function PriceBlock({
  price,
  compareAtPrice,
  priceUnit,
}: PriceBlockProps) {
  return (
    <div className="flex flex-col items-end text-right text-sm">
      {compareAtPrice != null && (
        <span className="text-muted-foreground line-through">
          {formatPrice(compareAtPrice, priceUnit)}
        </span>
      )}
      <span className="font-semibold text-foreground">
        {price === 0 ? "FREE" : formatPrice(price, priceUnit)}
      </span>
    </div>
  );
}
