/**
 * This file is used to define the translations for the application
 * Import only the ones that should be used among the entire application
 * It's recommended to place all translation files inside this folder to make it easier to manage
 * Please note module-related translation files should be imported from their main.ts file
 *
 * Also, please group each translation object by a group key, i.e `auth` to be used like `auth.forgetPassword`
 */
import { extend, groupedTranslations } from "@mongez/localization";
import {
  arValidationTranslation,
  enValidationTranslation,
} from "@mongez/react-form";
import common from "./common.json";
import countries from "./countries.json";

extend("en", { validation: enValidationTranslation });
extend("ar", { validation: arValidationTranslation });

groupedTranslations(common);
groupedTranslations("countries", countries);

groupedTranslations({
  validation: {
    maxFileSize: {
      en: "Max allowed file size is :maxSize :unit",
      ar: "أقصى حجم مسموح به هو :maxSize :unit",
    },
    maxFileSizeError: {
      en: ":file exceeds the size limit of :maxSize :unit",
      ar: ":file يتجاوز الحد الأقصى للحجم المسموح به :maxSize :unit",
    },
    minItems: {
      en: "This input should have at least :items items",
      ar: "يجب أن يكون هذا الحقل يحتوي على على الأقل :items عنصر",
    },
  },
});
