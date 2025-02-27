import { useState, useEffect, useRef } from "react";

export interface Option {
  value: string;
  label?: React.ReactNode;
}

interface UseAutoCompleteProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

export const useAutoComplete = ({
  options: initialOptions,
  value: controlledValue,
  onChange,
}: UseAutoCompleteProps) => {
  const [value, setValue] = useState(controlledValue || ""); // neu co tu ben ngoai controll vs unconstroll
  const [open, setOpen] = useState(false); // dieu khien khi nao co suggest
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    initialOptions || []
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isSelectingRef = useRef(false); //flag de check neu da select thi close

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);//  neu ben ngoai thay doi

  useEffect(() => {
    const filtered = initialOptions.filter(
      (option) => option.value.toLowerCase().includes(value.toLowerCase()) //insentive case metching
    );
    setFilteredOptions(filtered);
    if (!isSelectingRef.current) {
      setOpen(value.length > 0);
    } else {
      isSelectingRef.current = false;
    }
  }, [value, initialOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue); // neu co thi tra ve cho parent cai input cua no
    }
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     containerRef.current &&
  //     !containerRef.current.contains(event.target as Node)
  //   ) {
  //     setOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleSelect = (option: Option) => {
    isSelectingRef.current = true;
    setValue(option.value);
    setOpen(false);
    return option;
  };

  return {
    value,
    setValue,
    open,
    filteredOptions,
    containerRef,
    handleInputChange,
    handleSelect,
  };
};
