import { useState, useEffect, useRef } from "react";
import {
  Option,
  UseAutoCompleteProps,
  UseAutoCompleteReturn,
} from "./useAutoComplete.types";

export const useAutoComplete = ({
  options: initialOptions,
  value: controlledValue,
  onChange,
  onSearch,
  onSelect,
}: UseAutoCompleteProps): UseAutoCompleteReturn => {
  const [value, setValue] = useState(controlledValue || "");
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    initialOptions || [],
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isSelectingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (!onSearch) {
      const filtered = initialOptions.filter((option) =>
        option.value.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(initialOptions);
    }

    if (!isSelectingRef.current) {
      setOpen(value.length > 0); //le imput box
    } else {
      isSelectingRef.current = false;
    }
    setActiveIndex(-1);
  }, [value, initialOptions]);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [containerRef]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    if (onSearch) {
      onSearch(newValue);
    }
  };

  const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1,
      );
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        handleSelect(filteredOptions[activeIndex]);
      }
    }
  };

  const handleSelect = (option: Option) => {
    isSelectingRef.current = true;
    if (onChange) {
      onChange(option.value);
    }
    if (onSelect) {
      onSelect(option.value, option);
    }
    setValue(option.value);
    setOpen(false);
    return option;
  };

  const handleClear = () => {
    setValue("");
  };

  return {
    value,
    setValue,
    open,
    setOpen,
    filteredOptions,
    activeIndex,
    setActiveIndex,
    handleClear,
    containerRef,
    handleInputChange,
    handelKeyDown,
    handleSelect,
  };
};

export default useAutoComplete;
