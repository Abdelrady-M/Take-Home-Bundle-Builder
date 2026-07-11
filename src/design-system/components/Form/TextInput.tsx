import { maxLengthRule, minLengthRule, requiredRule } from "@mongez/react-form";
import { BaseInput, type BaseInputProps } from "./BaseInput";

export type TextInputProps = BaseInputProps & {
  minLength?: number;
  maxLength?: number;
  length?: number;
};

export function TextInput(props: TextInputProps) {
  return (
    <BaseInput
      rules={[requiredRule, minLengthRule, maxLengthRule]}
      {...props}
      type="text"
    />
  );
}
