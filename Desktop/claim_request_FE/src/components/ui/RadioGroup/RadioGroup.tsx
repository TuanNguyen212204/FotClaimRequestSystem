import React, { ChangeEvent } from "react";
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
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

// export const RadioGroupButtonOutline: React.FC<RadioGroupProps> = ({
//   options,
//   name,
//   selectedValue,
//   onChange,
//   buttonProps,
// }) => {
//   return (
//     <div className={styles.radioGroupButtonOutline}>
//       {options.map((option) => (
//         <label
//           key={option.value}
//           className={`${styles.radioButtonLabelOutline} ${
//             option.disabled ? styles.disabled : ""
//           } ${selectedValue === option.value ? styles.active : ""}`}
//         >
//           <input
//             type="radio"
//             name={name}
//             value={option.value}
//             checked={selectedValue === option.value}
//             onChange={onChange}
//             className={styles.radioButtonInputOutline}
//             disabled={option.disabled}
//             {...buttonProps}
//           />
//           <span className={styles.radioButtonCustomOutline}>
//             {option.label}
//           </span>
//         </label>
//       ))}
//     </div>
//   );
// };
