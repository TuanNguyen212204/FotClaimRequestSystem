import React from "react";
import styles from "./RadioGroup.module.css";
import { RadioGroupProps } from "@/types/RadioGroup.type.ts";

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  buttonProps,
}) => {
  return (
    <div className={styles.radioGroup}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.radioLabel} ${option.disabled ? styles.disabled : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
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
  options,
  name,
  selectedValue,
  onChange,
  buttonProps,
}) => {
  return (
    <div className={styles.radioGroupButton}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.radioButtonLabel} ${option.disabled ? styles.disabled : ""} ${selectedValue === option.value ? styles.active : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
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

