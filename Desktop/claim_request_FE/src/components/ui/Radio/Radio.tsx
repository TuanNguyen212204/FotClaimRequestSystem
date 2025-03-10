import React, { ChangeEvent, useState } from "react";
import styles from "./Radio.module.css";

export interface RadioGroupProps {
  options: Option[];
  label?: string;
  onSelect: (value: string) => void;
  disabled: boolean;
  configDefault?: ConfigDefault;
  name: string;
}

export interface ConfigDefault {
  value: keyof Option;
  label: keyof Option;
}

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

const DEFAULT_OPTION: ConfigDefault = { value: "value", label: "label" };

export const RadioGroup: React.FC<RadioGroupProps> = ({
  configDefault = DEFAULT_OPTION,
  label = "Selected an option",
  options,
  onSelect,
  disabled,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(label);

  const handleOptionClick = (value: string, label: string) => {
    if (!disabled) {
      setSelectedOption(value);
      setSelectedLabel(label);
      onSelect(value);
    }
  };

  const newOptions = options.map((option) => ({
    label: option[configDefault.label] || "",
    value: option[configDefault.value] || "",
    disabled: option.disabled || false,
  }));

  return (
    <div className={styles.radioGroup}>
      {newOptions.map((option) => (
        <label
          key={option.value}
          className={`${styles.radioLabel} ${
            option.disabled ? styles.disabled : ""
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleOptionClick(option.value, option.label)}
            className={styles.radioInput}
            disabled={option.disabled || disabled}
          />
          <span className={styles.radioCustom}></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export const RadioGroupButton: React.FC<RadioGroupProps> = ({
  configDefault = DEFAULT_OPTION,
  label = "Selected an option",
  options,
  onSelect,
  disabled,
  name,
}) => {
 const [selectedOption, setSelectedOption] = useState<string | null>(configDefault.value  || null);
 const [selectedLabel, setSelectedLabel] = useState<string | null>(label);

 const handleOptionClick = (value: string, label: string) => {
   if (!disabled) {
     setSelectedOption(value);
     setSelectedLabel(label);
     onSelect(value);
   }
 };

 const newOptions = options.map((option) => ({
   label: option[configDefault.label] || "",
   value: option[configDefault.value] || "",
   disabled: option.disabled || false,
 }));

  return (
    <div className={styles.radioGroupButton}>
      {newOptions.map((option) => {
        const isActive =
          selectedOption === option.value ||
          (!selectedOption && option.value === configDefault.value);

        return (
          <label
            key={option.value}
            className={`${styles.radioButtonLabel} ${
              isActive ? styles.active : ""
            } ${option.disabled || disabled ? styles.disabled : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleOptionClick(option.value, option.label)}
              className={styles.radioButtonInput}
              disabled={option.disabled || disabled}
            />
            <span className={styles.radioButtonCustom}>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
