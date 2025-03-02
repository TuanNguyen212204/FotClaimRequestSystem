import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Dropdown.module.css";

export interface DropdownProps {
  label?: string;
  options: Option[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

export interface Option {
  value: string;
  label: string;
}
const DEFAULT_OPTION: Option = { value: "", label: "" };
//kiem tra coi option truyen vao co hop le khong
const isValidOption = (option: Option) =>
  option &&
  typeof option.value === "string" &&
  typeof option.label === "string";
//kiem tra coi options truyen vao phai array hay khong va moi option trong array co hop le khong
const isValidOptions = (options: Option[]) =>
  Array.isArray(options) && options.every(isValidOption);
const Dropdown: React.FC<DropdownProps> = ({
  label = "Select an option",
  options,
  onSelect,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleMouseEnter = () => !disabled && setIsOpen(true);
  const handleMouseLeave = () => !disabled && setIsOpen(false);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };
  //cho nay de minh check coi options co hop le khong, neu khong thi gan mac dinh no la DEFAULT_OPTION de tranh loi hien thi tren giao dien
  const isOptionsValid: Option[] = isValidOptions(options)
    ? options
    : [DEFAULT_OPTION];
  return (
    <div
      className={styles.dropdown_container}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={styles.dropdown_trigger}
        disabled={disabled}
        aria-label="Dropdown menu"
      >
        {selectedOption || label} <ChevronDown />
      </button>
      {isOpen && (
        <div className={styles.dropdown_menu}>
          {isOptionsValid.map(({ value, label }) => (
            <button
              key={value}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(value);
              }}
              className={styles.dropdown_item}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
