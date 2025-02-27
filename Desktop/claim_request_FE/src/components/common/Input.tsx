import React from "react";
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  size: "small" | "medium" | "large";
}
const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  disable,
  onChange,
  className,
  ref,
  size = "medium",
}) => {
  const sizeClass = size ? `input-${size}` : "";
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disable}
      onChange={onChange}
      className={`${className} ${sizeClass}`}
      ref={ref}
    />
  );
};
export default Input;
