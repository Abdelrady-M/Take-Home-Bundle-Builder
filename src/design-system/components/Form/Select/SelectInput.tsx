import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectContext, useSelectManager } from "design-system/hooks";
import type { SelectInputProps } from "design-system/types";
import {
  SelectInputEmpty,
  SelectInputGroups,
  SelectInputHeading,
  SelectInputLabel,
  SelectInputLoading,
  SelectInputSearch,
} from "./SelectComponents";

export function SelectInput(props: SelectInputProps) {
  const selectManager = useSelectManager(props);

  const { id, opened, setOpened } = selectManager;

  return (
    <div className="select-root">
      <SelectContext.Provider value={selectManager}>
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
      </SelectContext.Provider>
    </div>
  );
}
