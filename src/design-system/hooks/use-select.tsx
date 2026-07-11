import {
  type InputRule,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import type {
  MultipleSelectInputProps,
  SelectContextValue,
  SelectInputProps,
  SelectManager,
  SelectOption,
  SelectOptionsGroup,
  SelectState,
} from "design-system/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { parseError } from "shared/utils";

type SearchConfigurations = {
  multiple?: boolean;
  rules?: InputRule[];
};

const defaultMapOption = (option: any): SelectOption => {
  if (typeof option === "string") {
    return {
      value: option,
      label: option,
    };
  }

  return {
    value: String(option.id || option.value),
    label:
      option.label ||
      option.name ||
      option.title ||
      option.text ||
      option.value,
    ...option,
  };
};

export const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelect(): SelectContextValue {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("useSelect must be used within a SelectProvider");
  }

  return context;
}

export function useSelectOption(option: SelectOption) {
  const { refs, multiple, highlightedOption, changeValue, value, props } =
    useSelect();

  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!optionRef.current) return;

    if (!refs.options.includes(optionRef)) {
      refs.options.push(optionRef);
    }

    const onClickHandler = () => {
      if (option.disabled) return;

      let newValue: SelectOption["value"] | SelectOption["value"][];

      if (props.required) {
        // if the select input is required, we will not allow deselecting the option
        if (option.value === value) {
          return;
        }

        if (multiple && value?.length === 1 && option.value === value[0]) {
          return;
        }
      }

      if (!multiple) {
        newValue = option.value === value ? "" : option.value;
      } else {
        newValue = [...value] as SelectOption["value"][];

        if (value.includes(option.value)) {
          newValue.splice(newValue.indexOf(option.value), 1);
        } else {
          if (props.limit && newValue.length >= props.limit) {
            return;
          }

          newValue.push(option.value);
        }
      }

      changeValue(newValue);
    };

    optionRef.current.addEventListener("click", onClickHandler);

    return () => {
      if (!optionRef.current) return;

      if (refs.options.includes(optionRef)) {
        refs.options.splice(refs.options.indexOf(optionRef), 1);
      }

      optionRef.current.removeEventListener("click", onClickHandler);
    };
  }, [option.value, value]);

  return {
    ref: optionRef,
    disabled: false,
    isSelected: multiple
      ? value?.includes(option.value)
      : option.value === value,
    isDisabled: !!option.disabled,
    isHighlighted: highlightedOption?.value === option.value,
    multiple,
  };
}

export function useSelectManager(
  {
    options: incomingOptions,
    searchRequest,
    request,
    searchable = true,
    dynamicRequest,
    filter,
    mapOption = defaultMapOption,
    mapResponse,
    closeOnSelect,
    onSearch,
    classes = {},
    clearable,
    defaultValue,
    ...props
  }: SelectInputProps | MultipleSelectInputProps,
  configurations: SearchConfigurations = {},
): SelectManager {
  const { multiple = false, rules = [requiredRule] } = configurations;

  if (closeOnSelect === undefined) {
    closeOnSelect = !multiple;
  }

  const { value, changeValue, setError, id, inputRef, error, disabled } =
    useFormControl(
      {
        rules,
        defaultValue: defaultValue ?? ((multiple ? [] : "") as any),
        ...props,
      } as SelectInputProps,
      {
        multiple,
      },
    );

  const [state, setState] = useState<SelectState>(() => {
    const optionsList = incomingOptions ? incomingOptions.map(mapOption) : [];
    return {
      opened: false,
      isLoading: false,
      options: optionsList,
      displayedOptions: optionsList,
      searchValue: "",
      selectedOption: value
        ? optionsList.find(option => option.value === value)
        : undefined,
    };
  });

  const setIsLoading = (isLoading: boolean) => {
    change("isLoading", isLoading);
  };

  const open = () => change("opened", true);
  const toggle = () => change("opened", !state.opened);

  const refsList = useRef<SelectManager["refs"]>({
    root: undefined,
    options: [],
    listContainer: undefined,
    searchInput: undefined,
    groups: [],
  });

  const change = (key, value) => {
    setState(state => ({
      ...state,
      [key]: value,
    }));
  };

  const merge = (data: Partial<typeof state>) => {
    setState(state => ({
      ...state,
      ...data,
    }));
  };

  const setOptions = options => {
    change("options", options.map(mapOption));
  };

  // watch for incoming options change
  useEffect(() => {
    if (incomingOptions) {
      setOptions(incomingOptions);
    }
  }, [incomingOptions]);

  const manageRequestResponse = async (response: any) => {
    let options: SelectOption[];

    if (response instanceof Response) {
      response = await response.json();
    }

    if (mapResponse) {
      options = mapResponse(response);
    } else if (response?.data) {
      options = response.data;
    } else {
      options = response;
    }

    options = options.map(mapOption);

    merge({
      isLoading: false,
      options,
      displayedOptions: options,
      selectedOption: value
        ? options.find(option => option.value === value)
        : state.selectedOption,
    });
  };

  const loadOptionsFrom = async requestFunction => {
    try {
      setIsLoading(true);
      const response = await requestFunction(value);

      manageRequestResponse(response);
    } catch (error) {
      setError(parseError(error));
      setIsLoading(false);
    }
  };

  // watch for dynamic request change
  useEffect(() => {
    if (!dynamicRequest) return;

    loadOptionsFrom(dynamicRequest);
  }, [dynamicRequest]);

  // check if request is provided, the main difference between it and dynamicRequest is that
  // request is called once when the component is mounted
  useEffect(() => {
    if (!request) return;

    loadOptionsFrom(request);
  }, []);

  const filterOption = (searchText: string, option: SelectOption) => {
    if (!filter) {
      let result = option
        .label!.toString()
        .toLowerCase()
        .includes(searchText.toLowerCase());

      if (!result && option.group) {
        result = option.group
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }

      return result;
    }

    return filter(searchText, option);
  };

  //   Search options callback
  const searchOptionsCallback = async (searchText: string) => {
    onSearch?.(searchText);

    if (!searchRequest) {
      merge({
        searchValue: searchText,
        displayedOptions: !searchText
          ? [...state.options]
          : state.options.filter(option => filterOption(searchText, option)),
      });
      return;
    }

    try {
      merge({
        searchValue: searchText,
        isLoading: true,
      });

      const response = await searchRequest(searchText, value);

      manageRequestResponse(response);
    } catch (error) {
      setError(parseError(error));
    }
  };

  const textList = {
    noResults: "No results found",
    placeholder: props.placeholder || "Select an option",
    searchPlaceholder: "Search...",
    loading: "Loading...",
  };

  const closeDropdown = () => {
    merge({
      displayedOptions: [...state.options],
      highlightedOption: undefined,
      searchValue: "",
      opened: false,
    });
  };

  const setOpened = (opened: boolean) => {
    if (opened === false) {
      closeDropdown();
    } else {
      change("opened", opened);
    }
  };

  const changeInputValue = (
    value?: SelectOption["value"] | SelectOption["value"][],
    moreData?: Partial<SelectState>,
  ) => {
    changeValue(value);

    merge({
      selectedOption:
        !multiple && value
          ? state.options.find(option => option.value === value)
          : undefined,
      highlightedOption: multiple ? state.highlightedOption : undefined,
      selectedOptions:
        multiple && value && value.length > 0
          ? state.options.filter(option => value.includes(option.value))
          : [],
      opened: closeOnSelect ? false : state.opened,
      ...moreData,
    });
  };

  const clear = () => {
    changeValue(multiple ? [] : "");
  };

  const highlightOption = (option: SelectOption) => {
    change("highlightedOption", option);
    const listContainer = refsList.current.listContainer?.current;
    // keep the list container scroll position nearby the highlighted option
    if (listContainer) {
      const optionElement = refsList.current.options.find(
        ref => ref.current?.id === `option-${option.value}`,
      );

      if (optionElement?.current) {
        // now we need to check if this element is visible or not inside the list container
        // if not then we should scroll the list container to make it visible
        const optionRect = optionElement.current?.getBoundingClientRect();
        const listRect = listContainer.getBoundingClientRect();

        if (optionRect && listRect) {
          // be aware of scroll position that is in the middle of list container and the element is above the middle as well
          if (optionRect.top < listRect.top) {
            listContainer.scrollTop -= listRect.top - optionRect.top;
          } else if (optionRect.bottom > listRect.bottom) {
            listContainer.scrollTop += optionRect.bottom - listRect.bottom;
          }
        }
      }
    }
  };

  const highlightOptionEvent = (e: React.KeyboardEvent) => {
    const key = e.key;
    // we need to also check if the user pressed enter key
    if (key === "Enter" && state.highlightedOption) {
      e.preventDefault();

      if (!multiple) {
        changeInputValue(state.highlightedOption.value);
      } else {
        if (!value.includes(state.highlightedOption.value)) {
          changeInputValue([
            ...(value as SelectOption["value"][]),
            state.highlightedOption.value,
          ]);
        } else {
          changeInputValue(
            (value as SelectOption["value"][]).filter(
              val => val !== state.highlightedOption?.value,
            ),
          );
        }
      }

      return;
    }

    if (multiple && key === "Space") {
      // if user pressed space key, we should select the highlighted option
      if (state.highlightedOption) {
        if (!value.includes(state.highlightedOption.value)) {
          changeInputValue([
            ...(value as SelectOption["value"][]),
            state.highlightedOption.value,
          ]);
        } else {
          changeInputValue(
            (value as SelectOption["value"][]).filter(
              val => val !== state.highlightedOption?.value,
            ),
          );
        }

        return;
      }
    }

    if (key !== "ArrowDown" && key !== "ArrowUp") return;
    e.preventDefault();

    const highlightedOption = state.highlightedOption;

    if (key === "ArrowDown") {
      // if no highlighted option, highlight the first one
      if (!highlightedOption) {
        return highlightOption(state.displayedOptions[0]);
      }

      const lastOption =
        state.displayedOptions[state.displayedOptions.length - 1];
      // now we have two possible cases
      // 1. highlight the next option of current highlighted option
      // 2. highlight the first option if the current highlighted option is the last one

      if (lastOption?.value === highlightedOption.value) {
        // in this case, we should highlight the first option
        return highlightOption(state.displayedOptions[0]);
      }

      const currentElement = state.displayedOptions.find(
        option => option.value === highlightedOption.value,
      );

      if (currentElement) {
        const nextIndex = state.displayedOptions.indexOf(currentElement) + 1;

        if (nextIndex < state.displayedOptions.length) {
          return highlightOption(state.displayedOptions[nextIndex]);
        }
      }
    }

    // now the same logic but in the opposite direction
    if (key === "ArrowUp") {
      if (!highlightedOption) {
        return highlightOption(
          state.displayedOptions[state.displayedOptions.length - 1],
        );
      }

      const firstOption = state.displayedOptions[0];

      if (firstOption.value === highlightedOption.value) {
        return highlightOption(
          state.displayedOptions[state.displayedOptions.length - 1],
        );
      }

      const currentElement = state.displayedOptions.find(
        option => option.value === highlightedOption.value,
      );

      if (currentElement) {
        const prevIndex = state.displayedOptions.indexOf(currentElement) - 1;

        if (prevIndex >= 0) {
          highlightOption(state.displayedOptions[prevIndex]);
        }
      }
    }
  };

  return {
    value,
    changeValue: changeInputValue,
    searchable,
    searchOptionsCallback,
    id,
    inputRef,
    error,
    closeOnSelect,
    disabled,
    highlightOptionEvent,
    textList,
    multiple,
    classes,
    open,
    close: closeDropdown,
    toggle,
    refs: refsList.current,
    setOpened,
    props,
    clear,
    clearable: clearable !== undefined ? clearable : !props.required,
    ...state,
    get groups(): SelectOptionsGroup[] {
      const groups: SelectOptionsGroup[] = [];

      state.displayedOptions.forEach(option => {
        const groupName = option.group || "";

        const group = groups.find(group => group.label === groupName);

        if (group) {
          group.options.push(option);
        } else {
          groups.push({
            label: groupName,
            options: [option],
          });
        }
      });

      return groups;
    },
  };
}
