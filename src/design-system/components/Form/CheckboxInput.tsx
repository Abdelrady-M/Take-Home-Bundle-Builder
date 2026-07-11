import {
  type FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { Checkbox } from "@ui/checkbox";
import { type ReactNode } from "react";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

export type CheckboxInputProps = FormControlProps & {
  label: ReactNode;
};

export function CheckboxInput({ label, ...props }: CheckboxInputProps) {
  const { checked, setChecked, id, error, disabled } = useFormControl({
    rules: [requiredRule],
    type: "checkbox",
    ...props,
  });

  return (
    <>
      <div className="items-top flex space-x-2">
        <Checkbox
          id={id}
          aria-disabled={disabled}
          disabled={disabled}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <InputLabel htmlFor={id} required={props.required}>
          {label}
        </InputLabel>
      </div>
      <InputError error={error} />
    </>
  );
}
