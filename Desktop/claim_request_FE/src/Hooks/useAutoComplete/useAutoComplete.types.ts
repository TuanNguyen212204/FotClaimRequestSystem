import React from "react";

export interface Option {
  value: string;
  label?: React.ReactNode;
}

export interface UseAutoCompleteProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: Option) => void;
}

export interface UseAutoCompleteReturn {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredOptions: Option[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  handleClear: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handelKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSelect: (option: Option) => Option;
}
