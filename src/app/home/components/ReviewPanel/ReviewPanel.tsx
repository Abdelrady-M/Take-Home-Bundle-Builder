import { fastShipping, reviewCategoryOrder } from "../../data/products";
import { useCart } from "../../hooks/use-cart";
import { PriceBlock } from "../PriceBlock/PriceBlock";
import { SaveForLater } from "../SaveForLater/SaveForLater";
import { ReviewSection } from "./ReviewSection";
import { SavingsSummary } from "./SavingsSummary";

export function ReviewPanel() {
  const { lineItemsByCategory, totals, setQty } = useCart();
  const hasAnyItems = [...lineItemsByCategory.values()].some(
    items => items.length > 0,
  );

  return (
    <aside className="flex flex-col gap-5 rounded-[10px] bg-[#edf4ff] p-5 lg:sticky lg:top-6">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Review
        </p>
        <h2 className="mt-2 text-xl font-semibold text-foreground">
          Your security system
        </h2>
        <p className="mt-1 text-sm text-foreground/75">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      {hasAnyItems ? (
        <div className="flex flex-col gap-4">
          {reviewCategoryOrder.map(category => (
            <ReviewSection
              key={category}
              category={category}
              items={lineItemsByCategory.get(category) ?? []}
              setQty={setQty}
            />
          ))}

          <div className="flex items-center gap-3 border-t border-border pt-4">
            <img
              src={fastShipping.icon}
              alt=""
              className="size-10.25 shrink-0"
            />
            <span className="flex-1 text-sm font-medium text-foreground">
              {fastShipping.label}
            </span>
            <PriceBlock
              price={0}
              compareAtPrice={fastShipping.compareAtPrice}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Add a product to start building your system.
        </p>
      )}

      <SavingsSummary totals={totals} />
      <SaveForLater />
    </aside>
  );
}
