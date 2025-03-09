import React, { ChangeEvent, useState } from "react";
import styles from "./Radio.module.css";

export interface RadioGroupProps {
  options: Option[];
  name: string;
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonProps?: React.InputHTMLAttributes<HTMLInputElement>;
  configDefault?: ConfigDefault;
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
  options,
  selectedValue,
  onChange,
  buttonProps,
  name,
}) => {
  const [selected, setSelected] = useState(selectedValue);

  const setSelectedValue = (value: string) => {
    setSelected(value);
    onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
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
            checked={selected === option.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedValue(option.value)}
            className={styles.radioInput}
            disabled={option.disabled}
            {...buttonProps}
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
  options,
  selectedValue,
  onChange,
  buttonProps,
  name,
}) => {
  const [selected, setSelected] = useState(selectedValue);

  const setSelectedValue = (value: string) => {
    setSelected(value);
    onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
  };

  const newOptions = options.map((option) => ({
    label: option[configDefault.label] || "",
    value: option[configDefault.value] || "",
    disabled: option.disabled || false, 
  }));

  return (
    <div className={styles.radioGroupButton}>
      {newOptions.map((option) => (
        <label
          key={option.value}
          className={`${styles.radioButtonLabel} ${
            option.disabled ? styles.disabled : ""
          } ${selectedValue === option.value ? styles.active : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedValue(option.value)}
            className={styles.radioButtonInput}
            disabled={option.disabled}
            {...buttonProps}
          />
          <span className={styles.radioButtonCustom}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
