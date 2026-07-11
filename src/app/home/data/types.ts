export type StepId = "cameras" | "plan" | "sensors" | "extra-protection";

export type ReviewCategory = "Cameras" | "Sensors" | "Accessories" | "Plan";

export interface ProductVariant {
  id: string;
  label: string;
  swatchImage?: string;
  seedQty: number;
}

export interface ProductRecord {
  id: string;
  stepId: StepId;
  reviewCategory: ReviewCategory;
  name: string;
  description?: string;
  learnMoreUrl?: string;
  image: string;
  badge?: string;
  compareAtPrice?: number;
  price: number;
  priceUnit?: "once" | "/mo";
  variants?: ProductVariant[];
  activeVariantId?: string;
  seedQty?: number;
  required?: boolean;
  isPlan?: boolean;
}

export interface StepDefinition {
  id: StepId;
  icon: string;
  title: string;
  nextLabel?: string;
}
