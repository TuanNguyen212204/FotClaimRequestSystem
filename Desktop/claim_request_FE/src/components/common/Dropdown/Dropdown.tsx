import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Dropdown.module.css";
import { set } from "react-hook-form";

interface DropdownProps {
  label?: string;
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const handleMouseEnter = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div
      className={styles.dropdown_container}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.dropdown_trigger} disabled={disabled}>
        {selectedOption || label} <ChevronDown />{" "}
      </button>
      {isOpen && (
        <div className={styles.dropdown_menu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdown_item}
              onClick={() => {
                handleOptionClick(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
