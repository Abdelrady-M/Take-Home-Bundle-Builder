import { type FormControlProps } from "@mongez/react-form";
import { type ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string;
  image?: string;
  disabled?: boolean;
  group?: string;
  [key: string]: any;
};

export type SelectInputProps = FormControlProps & {
  options?: (SelectOption | string)[];
  mapOption?: (value: any) => SelectOption;
  mapResponse?: (response: any) => SelectOption[];
  request?: (value: SelectOption["value"]) => Promise<any>;
  dynamicRequest?: (value: SelectOption["value"]) => Promise<any>;
  searchRequest?: (searchText, value: SelectOption["value"]) => Promise<any>;
  searchable?: boolean;
  onSearch?: (searchText: string) => void;
  renderSelectedOption?: (option: SelectOption) => ReactNode;
  filter?: (searchText: string, option: SelectOption) => boolean;
  closeOnSelect?: boolean;
  clearable?: boolean;
  virtualized?: boolean;
  classes?: {
    root?: string;
    heading?: string;
    search?: string;
    options?: string;
  };
};

export type MultipleSelectInputProps = Omit<
  SelectInputProps,
  "renderSelectedOption"
> & {
  renderSelectedOptions?: (options: SelectOption[]) => ReactNode;
  minLength?: number;
  maxLength?: number;
  length?: number;
  limit?: number;
};

export type SelectOptionsGroup = {
  label: string;
  options: SelectOption[];
};

export type SelectContextValue = SelectManager;

export type SelectState = {
  opened: boolean;
  isLoading: boolean;
  options: SelectOption[];
  displayedOptions: SelectOption[];
  searchValue: string;
  selectedOption?: SelectOption;
  selectedOptions?: SelectOption[];
  highlightedOption?: SelectOption;
};

export type SelectManager = SelectState & {
  value: SelectOption["value"];
  changeValue: (value: SelectOption["value"] | SelectOption["value"][]) => void;
  searchOptionsCallback: (searchText: string) => void;
  props: SelectInputProps | MultipleSelectInputProps;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  closeOnSelect: boolean;
  multiple: boolean;
  disabled: boolean;
  classes: SelectInputProps["classes"];
  refs: {
    root?: React.RefObject<HTMLDivElement | null>;
    searchInput?: React.RefObject<HTMLInputElement | null>;
    groups: React.RefObject<HTMLDivElement | null>[];
    options: React.RefObject<HTMLDivElement | null>[];
    listContainer?: React.RefObject<HTMLDivElement | null>;
  };
  clear: () => void;
  textList: {
    noResults: string;
    placeholder: string;
    searchPlaceholder: string;
    loading: string;
  };
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpened: (opened: boolean) => void;
  groups: SelectOptionsGroup[];
  error?: ReactNode;
  searchable?: boolean;
  clearable: boolean;
  highlightOptionEvent: (e: React.KeyboardEvent) => void;
};
