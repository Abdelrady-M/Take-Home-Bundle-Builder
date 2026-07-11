import iconDelivery from "assets/images/bundle-builder/icon-delivery.svg";
import iconPlanGlyph from "assets/images/bundle-builder/icon-plan.svg";
import iconStepCameras from "assets/images/bundle-builder/icon-step-cameras.svg";
import iconStepExtraProtection from "assets/images/bundle-builder/icon-step-extra-protection.svg";
import iconStepPlan from "assets/images/bundle-builder/icon-step-plan.svg";
import iconStepSensors from "assets/images/bundle-builder/icon-step-sensors.svg";
import satisfactionBadge from "assets/images/bundle-builder/satisfaction-badge.png";
import wyzeBatteryCamProSwatchBlack from "assets/images/bundle-builder/wyze-battery-cam-pro-swatch-black.png";
import wyzeBatteryCamProSwatchWhite from "assets/images/bundle-builder/wyze-battery-cam-pro-swatch-white.png";
import wyzeCamFloodlightV2Photo from "assets/images/bundle-builder/wyze-cam-floodlight-v2-photo.png";
import wyzeCamFloodlightV2SwatchBlack from "assets/images/bundle-builder/wyze-cam-floodlight-v2-swatch-black.png";
import wyzeCamFloodlightV2SwatchWhite from "assets/images/bundle-builder/wyze-cam-floodlight-v2-swatch-white.png";
import wyzeCamPanV3Photo from "assets/images/bundle-builder/wyze-cam-pan-v3-photo.png";
import wyzeCamPanV3SwatchBlack from "assets/images/bundle-builder/wyze-cam-pan-v3-swatch-black.png";
import wyzeCamPanV3SwatchWhite from "assets/images/bundle-builder/wyze-cam-pan-v3-swatch-white.png";
import wyzeCamV4Photo from "assets/images/bundle-builder/wyze-cam-v4-photo.png";
import wyzeCamV4SwatchBlack from "assets/images/bundle-builder/wyze-cam-v4-swatch-black.png";
import wyzeCamV4SwatchGrey from "assets/images/bundle-builder/wyze-cam-v4-swatch-grey.png";
import wyzeCamV4SwatchWhite from "assets/images/bundle-builder/wyze-cam-v4-swatch-white.png";
import wyzeDuoCamDoorbellPhoto from "assets/images/bundle-builder/wyze-duo-cam-doorbell-photo.png";
import wyzeMicrosdCardPhoto from "assets/images/bundle-builder/wyze-microsd-card-photo.png";
import wyzeSenseHubPhoto from "assets/images/bundle-builder/wyze-sense-hub-photo.png";
import wyzeSenseMotionSensorPhoto from "assets/images/bundle-builder/wyze-sense-motion-sensor-photo.png";

import rawProducts from "./products.json";
import type { ProductRecord, StepDefinition, StepId } from "./types";

/**
 * Figma exports resolve to CDN URLs that expire after 7 days, so the JSON
 * catalog stores logical image keys instead — this registry is the only
 * place that turns a key into an actual bundled asset URL.
 */
const imageRegistry: Record<string, string> = {
  "icon-plan": iconPlanGlyph,
  "satisfaction-badge": satisfactionBadge,
  "wyze-battery-cam-pro-swatch-black": wyzeBatteryCamProSwatchBlack,
  "wyze-battery-cam-pro-swatch-white": wyzeBatteryCamProSwatchWhite,
  "wyze-cam-floodlight-v2-photo": wyzeCamFloodlightV2Photo,
  "wyze-cam-floodlight-v2-swatch-black": wyzeCamFloodlightV2SwatchBlack,
  "wyze-cam-floodlight-v2-swatch-white": wyzeCamFloodlightV2SwatchWhite,
  "wyze-cam-pan-v3-photo": wyzeCamPanV3Photo,
  "wyze-cam-pan-v3-swatch-black": wyzeCamPanV3SwatchBlack,
  "wyze-cam-pan-v3-swatch-white": wyzeCamPanV3SwatchWhite,
  "wyze-cam-v4-photo": wyzeCamV4Photo,
  "wyze-cam-v4-swatch-black": wyzeCamV4SwatchBlack,
  "wyze-cam-v4-swatch-grey": wyzeCamV4SwatchGrey,
  "wyze-cam-v4-swatch-white": wyzeCamV4SwatchWhite,
  "wyze-duo-cam-doorbell-photo": wyzeDuoCamDoorbellPhoto,
  "wyze-microsd-card-photo": wyzeMicrosdCardPhoto,
  "wyze-sense-hub-photo": wyzeSenseHubPhoto,
  "wyze-sense-motion-sensor-photo": wyzeSenseMotionSensorPhoto,
};

export function resolveImage(key: string): string {
  return imageRegistry[key] ?? "";
}

export const products: ProductRecord[] = rawProducts as ProductRecord[];

export const steps: StepDefinition[] = [
  {
    id: "cameras",
    icon: iconStepCameras,
    title: "Choose your cameras",
    nextLabel: "Next: Choose your plan",
  },
  {
    id: "plan",
    icon: iconStepPlan,
    title: "Choose your plan",
    nextLabel: "Next: Choose your sensors",
  },
  {
    id: "sensors",
    icon: iconStepSensors,
    title: "Choose your sensors",
    nextLabel: "Next: Add extra protection",
  },
  {
    id: "extra-protection",
    icon: iconStepExtraProtection,
    title: "Add extra protection",
  },
];

export const reviewCategoryOrder = [
  "Cameras",
  "Sensors",
  "Accessories",
  "Plan",
] as const;

export const fastShipping = {
  icon: iconDelivery,
  label: "Fast Shipping",
  compareAtPrice: 5.99,
};

export function productsByStep(stepId: StepId): ProductRecord[] {
  return products.filter(product => product.stepId === stepId);
}

/** The atom's storage key for a product line: variant-scoped when the product has variants. */
export function cartKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}::${variantId}` : productId;
}

export function seedQuantities(): Record<string, number> {
  const seed: Record<string, number> = {};

  for (const product of products) {
    if (product.variants) {
      for (const variant of product.variants) {
        seed[cartKey(product.id, variant.id)] = variant.seedQty;
      }
    } else {
      seed[cartKey(product.id)] = product.seedQty ?? 0;
    }
  }

  return seed;
}
