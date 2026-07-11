import { useFormControl, type FormControlProps } from "@mongez/react-form";

type ImageInputProps = FormControlProps;

export function ImageInput(props: ImageInputProps) {
  useFormControl(props);

  return (
    <>
      <h1>ImageInput</h1>
    </>
  );
}
