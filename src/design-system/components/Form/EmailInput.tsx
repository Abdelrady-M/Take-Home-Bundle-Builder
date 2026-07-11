import { emailRule, requiredRule } from "@mongez/react-form";
import { BaseInput, type BaseInputProps } from "./BaseInput";

type EmailInputProps = BaseInputProps;

export function EmailInput(props: EmailInputProps) {
  return (
    <BaseInput rules={[requiredRule, emailRule]} {...props} type="email" />
  );
}
