import { cartAtom } from "../atoms/cart-atom";
import {
  cartKey,
  products,
  productsByStep,
  reviewCategoryOrder,
} from "../data/products";
import type { ProductRecord, ReviewCategory, StepId } from "../data/types";

export interface CartLineItem {
  product: ProductRecord;
  variantId?: string;
  variantLabel?: string;
  qty: number;
  unitPrice: number;
  compareAtPrice?: number;
  lineTotal: number;
  lineCompareAtTotal: number;
}

export interface CartTotals {
  subtotal: number;
  compareAtSubtotal: number;
  savings: number;
}

function buildLineItem(
  product: ProductRecord,
  qty: number,
  variantId?: string,
  variantLabel?: string,
): CartLineItem {
  return {
    product,
    variantId,
    variantLabel,
    qty,
    unitPrice: product.price,
    compareAtPrice: product.compareAtPrice,
    lineTotal: qty * product.price,
    lineCompareAtTotal: qty * (product.compareAtPrice ?? product.price),
  };
}

export function useCart() {
  const quantities = cartAtom.useValue();

  const lineItems: CartLineItem[] = [];

  for (const product of products) {
    if (product.variants) {
      for (const variant of product.variants) {
        const qty = quantities[cartKey(product.id, variant.id)] ?? 0;
        if (qty <= 0) continue;
        lineItems.push(buildLineItem(product, qty, variant.id, variant.label));
      }
    } else {
      const qty = quantities[cartKey(product.id)] ?? 0;
      if (qty <= 0) continue;
      lineItems.push(buildLineItem(product, qty));
    }
  }

  const lineItemsByCategory = new Map<ReviewCategory, CartLineItem[]>();
  for (const category of reviewCategoryOrder) {
    lineItemsByCategory.set(
      category,
      lineItems.filter(item => item.product.reviewCategory === category),
    );
  }

  const totals: CartTotals = { subtotal: 0, compareAtSubtotal: 0, savings: 0 };
  for (const item of lineItems) {
    totals.subtotal += item.lineTotal;
    totals.compareAtSubtotal += item.lineCompareAtTotal;
  }
  totals.savings = Math.max(0, totals.compareAtSubtotal - totals.subtotal);

  function stepSelectedCount(stepId: StepId): number {
    return productsByStep(stepId).filter(product => {
      if (product.variants) {
        return product.variants.some(
          variant => (quantities[cartKey(product.id, variant.id)] ?? 0) > 0,
        );
      }
      return (quantities[cartKey(product.id)] ?? 0) > 0;
    }).length;
  }

  function getQty(productId: string, variantId?: string): number {
    return quantities[cartKey(productId, variantId)] ?? 0;
  }

  function setQty(productId: string, qty: number, variantId?: string): void {
    cartAtom.setQty(cartKey(productId, variantId), qty);
  }

  return {
    quantities,
    lineItems,
    lineItemsByCategory,
    totals,
    stepSelectedCount,
    getQty,
    setQty,
  };
}
