import { type ReactNode } from "react";

type InputErrorProps = {
  error: ReactNode;
};

export function InputError({ error }: InputErrorProps) {
  const isVisible = !!error;

  if (!error) return null;

  return (
    <div
      className={`h-5 transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
      <div className="text-red-500 font-bold text-sm mt-1">{error}</div>
    </div>
  );
}
