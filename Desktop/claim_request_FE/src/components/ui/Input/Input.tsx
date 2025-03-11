import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Input.module.css";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  maxLength?: number;
  size: "small" | "medium" | "large";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "medium", className, maxLength = 100, ...InputProps }, ref) => {
    const sizeClass = size ? styles[`${size}`] : "";
    return (
      <input
        {...InputProps}
        className={`input ${sizeClass} ${className} `}
        ref={ref}
        maxLength={maxLength}
      />
    );
  }
);

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ size = "medium", maxLength = 100, ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const toggleVisibility = () => setVisible(!visible);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   if (value.length <= maxLength) {
  //     setInputValue(value);
  //   }
  // };
  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);
  return (
    <div className={styles.passwordInputWrapper}>
      <Input
        {...props}
        type={visible ? "text" : "password"}
        ref={ref}
        maxLength={maxLength}
        size={size}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className={styles.toggleVisibility}
      >
        {visible ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
});

export default Input;
