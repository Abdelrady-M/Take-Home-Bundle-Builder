/**
 * This component will be used as a base component to other components like Text Input, Email Input, Password Input, etc.
 */
import {
  useFormControl,
  type FormControlHook,
  type FormControlProps,
} from "@mongez/react-form";
import { Input } from "@ui/input";
import { type FunctionComponent, type ReactNode } from "react";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

type SideComponent = FunctionComponent<
  Pick<FormControlHook, "changeValue" | "value">
>;

// TODO: Implement LeftSection and RightSection
export type BaseInputProps = FormControlProps & {
  leftSection?: SideComponent;
  rightSection?: SideComponent;
  Component?: FunctionComponent;
  hint?: ReactNode;
  isCollectable?: boolean;
};

export function BaseInput({
  Component = Input,
  label,
  isCollectable = true,
  ...props
}: BaseInputProps) {
  const { changeValue, value, error, id, disabled, inputRef, otherProps } =
    useFormControl(props, { isCollectable: () => isCollectable });

  return (
    <>
      {label && (
        <InputLabel htmlFor={id} required={props.required}>
          {label}
        </InputLabel>
      )}
      <Component
        value={value}
        onChange={e => changeValue(e.target.value)}
        id={id}
        ref={inputRef}
        disabled={disabled}
        {...otherProps}
      />

      <InputError error={error} />
    </>
  );
}
