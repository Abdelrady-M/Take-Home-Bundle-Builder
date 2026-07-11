import {
  type FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { Switch } from "@ui/switch";
import { type ReactNode } from "react";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

export type SwitchInputProps = FormControlProps & {
  label: ReactNode;
};

export function SwitchInput({ label, ...props }: SwitchInputProps) {
  const { checked, setChecked, id, error, disabled } = useFormControl({
    rules: [requiredRule],
    type: "checkbox",
    ...props,
  });

  return (
    <>
      <div className="items-top flex gap-2">
        <Switch
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
