import {
  requiredRule,
  useFormControl,
  type FormControlProps,
} from "@mongez/react-form";
import { maxFileSizeRule } from "design-system/rules/max-file-size-rule";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

type DropZoneInputProps = FormControlProps & {
  accept?: string[];
  image?: boolean;
};

export function DropZoneInput({ label, accept, ...props }: DropZoneInputProps) {
  const { changeValue, error, value, id, inputRef } = useFormControl({
    rules: [requiredRule, maxFileSizeRule],
    ...props,
  });

  const mergeFilesList = (files: File[]) => {
    changeValue([...(value || []), ...files]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  const handleDropzoneClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);

    mergeFilesList(fileArray);
  };

  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    mergeFilesList(Array.from(files || []));

    // reset the input value
    e.target.value = "";
  };

  const onFileRemove = (file: File) => {
    changeValue(value.filter(f => f !== file));
  };

  return (
    <>
      {label && (
        <InputLabel required={props.required} htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <div className="flex items-center justify-center w-full">
        <div
          role="button"
          onClick={handleDropzoneClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 uppercase dark:text-gray-400">
              {accept ? accept.join(", ") : "Any file"}
            </p>
          </div>
          <input
            ref={inputRef}
            multiple
            id={id}
            accept={(accept || []).join(",")}
            type="file"
            onChange={selectFiles}
            hidden
          />
        </div>
      </div>

      {/* Display selected files */}
      {value?.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold">Selected Files:</h4>
          <ul className="text-sm text-gray-500 dark:text-gray-400">
            {value.map((file, index) => (
              <FileItem key={index} file={file} onRemove={onFileRemove} />
            ))}
          </ul>
        </div>
      )}

      <InputError error={error} />
    </>
  );
}

export function FileItem({
  file,
  onRemove,
}: {
  file: File;
  onRemove: (file: File) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span>{file.name}</span>
      <Trash2Icon
        color="red"
        type="button"
        onClick={() => onRemove(file)}
        className="cursor-pointer"
      />
    </div>
  );
}
