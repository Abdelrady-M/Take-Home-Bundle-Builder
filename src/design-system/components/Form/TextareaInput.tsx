import { Textarea } from "@ui/textarea";
import { BaseInput, type BaseInputProps } from "./BaseInput";

export type TextareaInputProps = BaseInputProps;

export function TextareaInput(props: TextareaInputProps) {
  return <BaseInput {...props} Component={Textarea} />;
}
