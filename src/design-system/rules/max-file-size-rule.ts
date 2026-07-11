import { trans } from "@mongez/localization";
import { type InputRule } from "@mongez/react-form";
import { convertFileSizeToBytes } from "../../shared/utils";

/**
 * This rule is used to limit the maximum allowed file size.
 */
export const maxFileSizeRule: InputRule = {
  name: "maxSize",
  preservedProps: ["sizeUnit", "maxSize"],
  validate: ({ value, maxSize, sizeUnit }) => {
    if (!value || !maxSize) return;

    // we need to convert maxSize with sizeUnit into bytes

    const maxFileSize = convertFileSizeToBytes(maxSize, sizeUnit || "KB");

    if (Array.isArray(value)) {
      const errors: string[] = [];
      for (const file of value) {
        if ((file as File).size > maxFileSize) {
          errors.push(
            trans("validation.maxFileSizeError", {
              file: file.name,
              maxSize,
              unit: sizeUnit,
            }),
          );
        }
      }

      if (errors.length > 0) return errors;
    }

    if ((value as File).size > maxFileSize) {
      return trans("validation.maxFileSize", { maxSize, unit: sizeUnit });
    }
  },
};
