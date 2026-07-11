import { useFormControl, type FormControlProps } from "@mongez/react-form";

type DatePickerInputProps = FormControlProps;

export function DatePickerInput(props: DatePickerInputProps) {
  useFormControl(props);

  return (
    <>
      <h1>DatePickerInput</h1>
    </>
  );
}
