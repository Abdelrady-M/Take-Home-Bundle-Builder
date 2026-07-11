/**
 * This component will be used as a number input in the form design system
 * It will allow only number values (integer or float) and will validate the input based on the min and max props if provided
 */
import { maxRule, minRule, numberRule, requiredRule } from "@mongez/react-form";
import { BaseInput, type BaseInputProps } from "./BaseInput";

type NumberInputProps = BaseInputProps & {
  min?: number;
  max?: number;
};

export function NumberInput(props: NumberInputProps) {
  return (
    <BaseInput
      rules={[requiredRule, numberRule, minRule, maxRule]}
      {...props}
      type="text"
    />
  );
}
