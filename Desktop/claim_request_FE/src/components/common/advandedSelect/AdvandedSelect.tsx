import React, { useState, useRef, useEffect } from "react";
import styles from "./AdvandedSelect.module.css";

interface Option {
  value: string;
  label: string;
}

interface AdvancedSelectProps {
  options: Option[];
  selectedValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const AdvancedSelect: React.FC<AdvancedSelectProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Select...",
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={selectRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.selectBox} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedValue ? styles.selected : styles.placeholder}>
          {selectedValue ? options.find((opt) => opt.value === selectedValue)?.label : placeholder}
        </span>
        <div className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`} />
      </div>

      {isOpen && (
  <div className={styles.dropdown}>
    <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Find..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <ul className={styles.optionsList}>
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option) => (
          <li
            key={option.value}
            className={`${styles.option} ${selectedValue === option.value ? styles.selectedOption : ""}`}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
              setSearch("");
            }}
          >
            {option.label}
          </li>
        ))
      ) : (
        <li className={styles.noOption}>No results found</li>
      )}
    </ul>
  </div>
)}

    </div>
  );
};

export default AdvancedSelect;
