import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { trans } from "@mongez/localization";
import {
  lengthRule,
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from "@mongez/react-form";
import { SelectContext, useSelectManager } from "design-system/hooks";
import type { MultipleSelectInputProps } from "design-system/types";
import { useRef } from "react";
import {
  SelectInputEmpty,
  SelectInputError,
  SelectInputGroups,
  SelectInputHeading,
  SelectInputLabel,
  SelectInputLoading,
  SelectInputSearch,
} from "./SelectComponents";

export function MultiSelectInput(props: MultipleSelectInputProps) {
  const selectManager = useSelectManager(
    {
      errors: {
        get minLength() {
          return trans("validation.minItems", {
            items: props.minLength,
          });
        },
        get maxLength() {
          return trans("validation.maxItems", {
            items: props.maxLength,
          });
        },
        get length() {
          return trans("validation.length", {
            length: props.length,
          });
        },
      },
      ...props,
    },
    {
      multiple: true,
      rules: [requiredRule, minLengthRule, maxLengthRule, lengthRule],
    },
  );

  const { id, opened, setOpened } = selectManager;
  const rootRef = useRef<HTMLDivElement>(null);

  selectManager.refs.root = rootRef;

  return (
    <SelectContext.Provider value={selectManager}>
      <div ref={rootRef} className="multi-select-root">
        <SelectInputLabel />
        <Popover open={opened} onOpenChange={setOpened}>
          <PopoverTrigger id={id} asChild>
            <SelectInputHeading />
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <SelectInputSearch />
            <SelectInputLoading />
            <SelectInputEmpty />
            <SelectInputGroups />
          </PopoverContent>
        </Popover>
        <SelectInputError />
      </div>
    </SelectContext.Provider>
  );
}
