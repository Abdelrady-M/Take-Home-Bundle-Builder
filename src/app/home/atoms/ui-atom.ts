import { atom } from "@mongez/react-atom";
import type { StepId } from "../data/types";

export const activeStepAtom = atom<StepId | "">({
  key: "bundle-builder.active-step",
  default: "cameras",
});
