import { Button } from "@/components/ui/button";
import { trans } from "@mongez/localization";
import { Checkbox } from "@ui/checkbox";
import { InputError } from "design-system/components/Form/InputError";
import { InputLabel } from "design-system/components/Form/InputLabel";
import { TextInput } from "design-system/components/Form/TextInput";
import { Loader } from "design-system/components/Loader";
import { useSelect, useSelectOption } from "design-system/hooks";
import type { SelectOption, SelectOptionsGroup } from "design-system/types";
import { cn } from "design-system/utils";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { forwardRef, useRef } from "react";
import { List } from "react-window";

export function SelectItem({
  option,
  className,
}: {
  option: SelectOption;
  className?: string;
}) {
  const { ref, multiple, isSelected, isDisabled, isHighlighted, disabled } =
    useSelectOption(option);

  const id = `option-${option.value}-input`;

  return (
    <div
      id={`option-${option.value}`}
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 hover:bg-accent hover:text-accent-foreground",
        className,
        isHighlighted && "bg-accent text-accent-foreground",
        isDisabled && "opacity-50 pointer-events-none",
      )}>
      {multiple && (
        <>
          <div className="items-center flex space-x-2">
            <Checkbox
              id={id}
              aria-disabled={disabled}
              disabled={disabled}
              checked={isSelected}
            />
            <label className="font-normal cursor-pointer block">
              {option.label}
            </label>
          </div>
        </>
      )}
      {!multiple && (
        <>
          {option.label}
          {isSelected && (
            <Check className="ml-auto size-4 text-xs tracking-widest text-muted-foreground" />
          )}
        </>
      )}
    </div>
  );
}

export function SelectList({ options }: { options: SelectOption[] }) {
  const { refs, props } = useSelect();
  const ref = useRef<HTMLDivElement>(null);

  const { virtualized } = props;

  refs.listContainer = ref;

  if (virtualized) {
    return (
      <List
        rowComponent={({ index, style }) => (
          <div style={style}>
            <SelectItem option={options[index]} />
          </div>
        )}
        rowCount={options.length}
        rowHeight={35} // Adjust item size as needed
        rowProps={{}}
        style={{ height: 200, width: "100%" }} // Adjust height as needed
      />
    );
  }

  return (
    <div
      ref={ref}
      className="flex flex-col pt-2 gap-1 max-h-48 overflow-x-auto">
      {options.map(option => (
        <SelectItem key={option.value} option={option} />
      ))}
    </div>
  );
}

export function SelectGroup({ group }: { group: SelectOptionsGroup }) {
  const { refs } = useSelect();

  if (!group.label) {
    return <SelectList options={group.options} />;
  }

  const ref = useRef<HTMLDivElement>(null);

  if (!refs.groups.includes(ref)) {
    refs.groups.push(ref);
  }

  return (
    <>
      <div ref={ref} className="my-1 text-sm text-slate-600 px-2 font-bold">
        {group.label}
      </div>
      <div className="px-2">
        <SelectList options={group.options} />
      </div>
    </>
  );
}

export function SelectInputLabel() {
  const { open, props } = useSelect();

  if (!props.label) return null;

  return (
    <InputLabel required={props.required} onClick={open}>
      {props.label}
    </InputLabel>
  );
}

export function SelectInputClear() {
  const { changeValue, multiple, value, clearable } = useSelect();

  if (
    !clearable ||
    !value ||
    (multiple && Array.isArray(value) && value.length === 0)
  )
    return null;

  return (
    <X
      role="button"
      aria-label="Clear"
      className="ml-auto h-4 w-4 shrink-0 opacity-50"
      onClick={e => {
        e.stopPropagation();
        changeValue(multiple ? [] : "");
      }}
    />
  );
}

export function useSelectHeadingContent() {
  const { selectedOption, selectedOptions, textList, value, multiple, props } =
    useSelect();

  if (!value || (multiple && Array.isArray(value) && value.length === 0)) {
    return textList.placeholder;
  }

  if (multiple) {
    if (props.renderSelectedOptions) {
      return props.renderSelectedOptions(selectedOptions!);
    }

    return trans("form.totalSelected", {
      count: value.length,
    });
  }

  if (props.renderSelectedOption) {
    return props.renderSelectedOption(selectedOption!);
  }

  return selectedOption?.label;
}

function _SelectInputHeading(props: any, ref: any) {
  const { opened, classes } = useSelect();

  const Caret = opened ? ChevronUp : ChevronDown;

  const content = useSelectHeadingContent();

  return (
    <Button
      {...props}
      ref={ref}
      variant="outline"
      role="combobox"
      aria-expanded={opened}
      className={cn("w-[200px] justify-between", classes?.heading)}>
      {content}
      {/* Clearable icon */}
      <SelectInputClear />
      {/* Caret icon */}
      <Caret className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
}

export const SelectInputHeading = forwardRef(_SelectInputHeading);

export function SelectInputError() {
  const { error } = useSelect();

  return <InputError error={error} />;
}

export function SelectInputSearch() {
  const {
    searchable,
    searchValue,
    highlightOptionEvent,
    searchOptionsCallback,
    textList,
  } = useSelect();

  if (!searchable) return null;

  return (
    <div className="mx-1 my-2">
      <TextInput
        name=""
        value={searchValue}
        onKeyDown={highlightOptionEvent}
        onChange={searchOptionsCallback}
        placeholder={textList.searchPlaceholder}
      />
    </div>
  );
}

export function SelectInputEmpty() {
  const { displayedOptions, textList } = useSelect();

  if (displayedOptions.length > 0) return null;

  return <div className="py-6 text-center text-sm">{textList.noResults}.</div>;
}

export function SelectInputLoading() {
  const { textList, isLoading } = useSelect();

  if (!isLoading) return null;

  return (
    <div className="flex gap-2 px-2 my-1 items-center p-1">
      <Loader size={3} />
      <span className="text-sm text-gray-500">{textList.loading}</span>
    </div>
  );
}

export function SelectInputGroups() {
  const { groups } = useSelect();
  return (
    <>
      {groups.map(group => (
        <SelectGroup group={group} key={group.label} />
      ))}
    </>
  );
}
