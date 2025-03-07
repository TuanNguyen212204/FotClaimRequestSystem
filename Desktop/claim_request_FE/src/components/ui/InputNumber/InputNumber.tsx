import styles from "@/components/ui/InputNumber/InputNumber.module.css";
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

  const handleIncrease = () => {
    const newValue = Math.min((inputValue || 0) + 1, max);
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleDecrease = () => {
    const newValue = Math.max((inputValue || 0) - 1, min);
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.containerInputNumber}>
      <div className={styles.generalBox}>
        <div className={styles.inputBox}>
          {label && <label className={styles.inputLabel}>{label}</label>}
          <input
            className={styles.inputNumber}
            type="number"
            value={inputValue}
            min={min}
            max={max}
            onChange={handleChange}
          />
        </div>
        <div className={styles.controls}>
          <button className={styles.plus} onClick={handleIncrease}>
            +
          </button>
          <button className={styles.minus} onClick={handleDecrease}>
            −
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
