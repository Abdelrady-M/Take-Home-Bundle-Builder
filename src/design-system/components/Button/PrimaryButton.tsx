import { Button, type ButtonProps } from "@/components/ui/button";

export type PrimaryButtonProps = ButtonProps;

export function PrimaryButton(props: PrimaryButtonProps) {
  return <Button {...props} variant="default" />;
}
