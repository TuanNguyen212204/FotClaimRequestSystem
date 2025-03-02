import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Dropdown.module.css";

export interface DropdownProps {
  label?: string;
  options: Option[];
  onSelect: (option: string) => void;
  disabled?: boolean;
  configDefault?: ConfigDefault;
}
export interface ConfigDefault {
  value: keyof Option;
  label: keyof Option;
}
export interface Option {
  value: string;
  label: string;
}

const DEFAULT_OPTION: ConfigDefault = { value: "value", label: "label" };

const Dropdown: React.FC<DropdownProps> = ({
  configDefault = DEFAULT_OPTION,
  label = "Select an option",
  options,
  onSelect,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(label);
  const handleMouseEnter = () => !disabled && setIsOpen(true);
  const handleMouseLeave = () => !disabled && setIsOpen(false);
  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(value);
    setSelectedLabel(label);
    onSelect(value);
    setIsOpen(false);
  };
  const newOptions = options.map((option) => ({
    label: option[configDefault.label] || "",
    value: option[configDefault.value] || "",
  }));
  return (
    <div
      className={styles.dropdown_container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={styles.dropdown_trigger}
        disabled={disabled}
        aria-label="Dropdown menu"
      >
        {selectedLabel} <ChevronDown />
      </button>
      {isOpen && (
        <div className={styles.dropdown_menu}>
          {newOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(value, label);
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
