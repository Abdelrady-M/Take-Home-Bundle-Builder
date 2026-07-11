import { Button } from "@ui/button";
import satisfactionBadge from "assets/images/bundle-builder/satisfaction-badge.png";
import { useState } from "react";
import type { CartTotals } from "../../hooks/use-cart";
import { formatPrice } from "../../utils/format";

interface SavingsSummaryProps {
  totals: CartTotals;
}

export function SavingsSummary({ totals }: SavingsSummaryProps) {
  const [checkedOut, setCheckedOut] = useState(false);
  const monthlyEstimate = totals.subtotal / 12;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-4">
      <div className="flex items-center justify-between gap-4">
        <img src={satisfactionBadge} alt="" className="size-19.5 shrink-0" />
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-[3px] bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            as low as {formatPrice(monthlyEstimate)}/mo
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(totals.compareAtSubtotal)}
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(totals.subtotal)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {totals.savings > 0 && (
          <p className="text-xs font-semibold text-emerald-600">
            Congrats! You’re saving {formatPrice(totals.savings)} on your
            security bundle!
          </p>
        )}
        <Button
          className="w-full rounded bg-primary py-6 text-base font-bold text-primary-foreground hover:bg-primary/90"
          onClick={() => setCheckedOut(true)}>
          {checkedOut ? "Thanks — your order is on the way!" : "Checkout"}
        </Button>
      </div>
    </div>
  );
}
