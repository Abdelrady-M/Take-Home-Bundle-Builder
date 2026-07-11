import React, { useState } from "react";

interface SegmentControlData {
  label: React.ReactNode;
  value: string | number;
}

interface SegmentControlInputProps {
  data: (SegmentControlData | string)[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
}

export const SegmentControlInput: React.FC<SegmentControlInputProps> = ({
  data,
  defaultValue,
  onChange,
  label,
}) => {
  // Manage local state for selected value
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(defaultValue);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(
    defaultValue !== undefined
      ? data.findIndex(item =>
          typeof item === "string"
            ? item === defaultValue
            : item.value === defaultValue,
        )
      : undefined,
  );

  // Update local state and trigger onChange when a new value is selected
  const handleSelect = (value: string | number, index: number) => {
    setSelectedValue(value);
    setActiveIndex(index);
    if (onChange) {
      onChange(value); // Call the onChange prop if provided
    }
  };

  return (
    <div className="w-full relative">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative flex rounded-lg p-0 bg-[#f1f3f5] dark:bg-gray-800">
        {/* Background "slider" for selected segment */}
        {activeIndex !== undefined && (
          <div
            className="absolute top-1 bottom-1 left-1 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-100 ease-in-out"
            style={{
              width: `calc((100% / ${data.length}) - 0.5rem)`, // Adjusting width for padding
              transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 0.5}rem))`,
            }}
          />
        )}
        {data.map((item, index) => {
          if (typeof item === "string") {
            item = {
              label: item,
              value: item,
            };
          }

          const isSelected = item.value === selectedValue;

          return (
            <button
              key={item.value}
              type="button"
              className={`relative z-10 flex-1 mx-1 px-4 py-2 text-center font-medium rounded-lg 
                focus:outline-none focus-visible:ring-2 ring-gray-500
                transition-colors duration-300 ease-in-out
                ${isSelected ? "text-gray-900 dark:text-gray-100" : "text-gray-800 dark:text-gray-400"}
              `}
              onClick={() => handleSelect(item.value, index)}>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
