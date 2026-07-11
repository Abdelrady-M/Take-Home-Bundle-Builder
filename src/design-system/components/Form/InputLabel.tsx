/**
 * This component is used as part of any input in the form design system to render the label
 * For better performance, it should be rendered conditionally based on the label prop if it exists
 */
import { Label } from "@ui/label";
import { type ReactNode } from "react";

export type InputLabelProps = {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  onClick?: () => void;
};

export function InputLabel({
  className,
  required,
  children,
  ...props
}: InputLabelProps) {
  return (
    <Label className={`mb-2 cursor-pointer block ${className}`} {...props}>
      {children}
      {required && <span className="text-red-500">*</span>}
    </Label>
  );
}
