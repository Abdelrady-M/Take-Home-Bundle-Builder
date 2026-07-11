import {
  type FormControlProps,
  RadioGroupContext,
  requiredRule,
  useFormControl,
  useRadioInput,
} from "@mongez/react-form";
import { RadioGroupItem, RadioGroup as RadioGroupUI } from "@ui/radio-group";
import { type ReactNode } from "react";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

export type RadioGroupProps = FormControlProps & {
  children: ReactNode;
  defaultValue?: string;
};

/**
 * Group of radio inputs
 *
 * @usage
 * ```tsx
 * <RadioGroup name="gender" label="Gender" required>
 *  <RadioInput value="male">Male</RadioInput>
 *  <RadioInput value="female">Female</RadioInput>
 * </RadioGroup>
 * ```
 */
export function RadioGroup({ label, ...props }: RadioGroupProps) {
  const { error, value, changeValue } = useFormControl({
    rules: [requiredRule],
    ...props,
  });

  return (
    <RadioGroupContext.Provider value={{ value, changeValue }}>
      {label && (
        <InputLabel className="mb-2" required={props.required}>
          {label}
        </InputLabel>
      )}
      <RadioGroupUI onValueChange={changeValue} value={value}>
        {props.children}
      </RadioGroupUI>

      <InputError error={error} />
    </RadioGroupContext.Provider>
  );
}

export type RadioInputProps = {
  value: string | number | boolean;
  children: ReactNode;
  disabled?: boolean;
};

/**
 * This component can not be used without being wrapped by the RadioGroup component
 */
export function RadioInput({ disabled, value, children }: RadioInputProps) {
  const { isSelected } = useRadioInput(value);
  const id = value.toString() + "-input";

  return (
    <div className="flex items-start gap-2">
      <RadioGroupItem
        disabled={disabled}
        checked={isSelected}
        id={id}
        value={value.toString()}
      />
      <InputLabel htmlFor={id}>{children}</InputLabel>
    </div>
  );
}
