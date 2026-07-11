import type { AppDirection } from "../types";

export const isRTL = () => document.documentElement.dir === "rtl";
export const isLTR = () => document.documentElement.dir === "ltr";
export const currentDirection = (): AppDirection =>
  (document.documentElement.dir || "ltr") as AppDirection;
