import { useFormControl, type FormControlProps } from "@mongez/react-form";

type SliderInputProps = FormControlProps & {
  // props go here
  value: number | string;
};

export function SliderInput(props: SliderInputProps) {
  useFormControl(props);

  return (
    <>
      <h1>SliderInput</h1>
    </>
  );
}
