import {
  requiredRule,
  useFormControl,
  type FormControlProps,
} from "@mongez/react-form";
import { Button } from "@ui/button";
import { useMemo, type ReactNode } from "react";
import { type FileSizeUnit } from "shared/types";
import { fileSize } from "shared/utils";
import { maxFileSizeRule } from "../../rules/max-file-size-rule";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

type FileInputProps = FormControlProps & {
  children?: ReactNode;
  displayFileSize?: boolean;
  maxSize?: number;
  sizeUnit?: FileSizeUnit;
  accept?: string[];
  clearable?: boolean;
};

export function FileInput({
  label,
  children,
  clearable: _,
  accept,
  displayFileSize = true,
  ...props
}: FileInputProps) {
  const { value, changeValue, error, id, inputRef } = useFormControl({
    rules: [requiredRule, maxFileSizeRule],
    ...props,
  });

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      changeValue(file);
    }

    // reset the input value to allow selecting the same file again
    e.target.value = "";
  };

  const content = useMemo(() => {
    if (!value) {
      return children || "Choose file";
    }

    if (displayFileSize) {
      const { size, unit } = fileSize(value.size);
      return `${value.name} (${size} ${unit})`;
    }

    return null;
  }, [value, children, displayFileSize]);

  return (
    <>
      <InputLabel htmlFor={id} required={props.required}>
        {label}
      </InputLabel>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}>
          {content}
        </Button>
      </div>

      <input
        accept={(accept || []).join(",")}
        type="file"
        onChange={selectFile}
        id={id}
        hidden
        ref={inputRef}
      />

      <InputError error={error} />
    </>
  );
}
