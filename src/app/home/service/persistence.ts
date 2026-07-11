import cache from "@mongez/cache";
import type { CartQuantities } from "../atoms/cart-atom";
import { cartAtom } from "../atoms/cart-atom";

const STORAGE_KEY = "bundle-builder.v1";

export function saveSystemForLater(): void {
  cache.set(STORAGE_KEY, cartAtom.value);
}

export function restoreSavedSystem(): boolean {
  const saved = cache.get(STORAGE_KEY) as CartQuantities | undefined;
  if (!saved) return false;

  cartAtom.replaceAll(saved);
  return true;
}

export function hasSavedSystem(): boolean {
  return cache.has(STORAGE_KEY);
}
