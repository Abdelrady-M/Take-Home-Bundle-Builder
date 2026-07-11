import { useSubmitButton } from "@mongez/react-form";
import { Button, type ButtonProps } from "@ui/button";
import { Loader } from "../Loader";

type SubmitButtonProps = ButtonProps;

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { disabled, isSubmitting } = useSubmitButton();

  return (
    <Button {...props} disabled={disabled || isSubmitting}>
      {isSubmitting ? <Loader /> : children}
    </Button>
  );
}
