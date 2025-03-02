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
          {options.map(({ value, label }) => (
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
