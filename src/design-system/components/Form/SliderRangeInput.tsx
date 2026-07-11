import { useFormControl, type FormControlProps } from "@mongez/react-form";

type SliderInputProps = FormControlProps & {
  value: [number | string, number | string];
};

export function SliderRangeInput(props: SliderInputProps) {
  useFormControl(props);

  return (
    <>
      <h1>SliderInput</h1>
    </>
  );
}
