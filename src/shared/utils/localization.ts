import { current } from "@mongez/react";

type LocaleCodes = {
  [localeCode: string]: {
    direction: "ltr" | "rtl";
    name: string;
  };
};

/**
 * Get proper value based on current locale code
 */
export function getLocalizedValue(
  value: any,
  localeCode: string = current("localeCode"),
  localeCodeKey = "localeCode",
  textKey = "text",
) {
  if (!value) return "";

  if (value[localeCode]) return value[localeCode];

  if (Array.isArray(value)) {
    return value.find(item => item[localeCodeKey] === localeCode)?.[textKey];
  }

  return value;
}

export const localeCodesList: LocaleCodes = {
  en: {
    direction: "ltr",
    name: "English",
  },
  ar: {
    direction: "rtl",
    name: "العربية",
  },
};
