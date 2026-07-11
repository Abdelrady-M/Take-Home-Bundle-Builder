import { useFormControl, type FormControlProps } from "@mongez/react-form";

type PinInputProps = FormControlProps;

export function PinInput(props: PinInputProps) {
  useFormControl(props);

  return (
    <>
      <h1>PinInput</h1>
    </>
  );
}
