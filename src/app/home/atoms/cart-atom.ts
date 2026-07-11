import { atom } from "@mongez/react-atom";
import { seedQuantities } from "../data/products";

export type CartQuantities = Record<string, number>;

export const cartAtom = atom<
  CartQuantities,
  {
    setQty: (key: string, qty: number) => void;
    replaceAll: (quantities: CartQuantities) => void;
  }
>({
  key: "bundle-builder.cart",
  default: seedQuantities(),
  actions: {
    setQty(key, qty) {
      this.merge({ [key]: Math.max(0, qty) });
    },
    replaceAll(quantities) {
      this.update(quantities);
    },
  },
});
