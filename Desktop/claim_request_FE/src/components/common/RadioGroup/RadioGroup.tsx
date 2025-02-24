import React from "react";
import styles from "./RadioGroup.module.css";
import { RadioGroupProps } from "./RadioGroup.type";

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
        <label key={option.value} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className={styles.radioInput}
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