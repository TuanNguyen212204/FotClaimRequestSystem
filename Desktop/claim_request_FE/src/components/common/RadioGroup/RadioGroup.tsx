import React from "react";
import styles from "./RadioGroup.module.css";
import { RadioGroupProps } from "@/types/RadioGroup.type.ts";

const RadioGroup: React.FC<RadioGroupProps> = ({
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

export default RadioGroup;