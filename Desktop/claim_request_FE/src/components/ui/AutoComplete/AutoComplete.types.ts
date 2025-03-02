import React from "react";
import { Option } from "@/Hooks/useAutoComplete";
export type AutoCompleteVariant =
  | "outline"
  | "filled"
  | "borderless"
  | "default";
export interface AutoCompleteProps {
  options: Option[];
  onSelect?: (value: string, option: Option) => void;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  allowClear?: boolean | React.ReactNode;
  varient?: AutoCompleteVariant;
  disabled?: boolean;
  autoFocus?: boolean;
  notFoundContent?: React.ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder?: string;
}

export interface ClearIconProps {
  onClick: () => void;
  Icon: React.ReactNode;
}

export interface DropdownListProps {
  options: Option[];
  onSelect: (option: Option) => void;
  activeIndex: number;
  notFoundContent?: React.ReactNode;
}
