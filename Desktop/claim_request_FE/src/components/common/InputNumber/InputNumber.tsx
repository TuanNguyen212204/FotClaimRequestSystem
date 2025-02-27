import styles from "@/components/common/InputNumber/InputNumber.module.css";
import { useState } from "react";

interface InputNumberProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  label,
  value,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<number | "">(value || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) newValue = min;
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    setInputValue(newValue);
    onChange?.(newValue);
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.inputNumber}
          type="number"
          value={inputValue}
          placeholder=""
          min={min}
          max={max}
          onChange={handleChange}
        />
        {label && <label className={styles.inputLabel}>{label}</label>}
      </div>
    </div>
  );
};

export default InputNumber;
