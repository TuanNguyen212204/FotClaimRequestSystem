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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type, placeholder, value, disable, onChange, className, size = "medium" },
    ref
  ) => {
    const sizeClass = size ? `input-${size}` : "";
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disable}
        onChange={onChange}
        className={`input ${sizeClass} ${className}`}
        ref={ref}
      />
    );
  }
);

const Password = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  (props, ref) => <Input {...props} type="password" ref={ref} />
);
const Email = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  (props, ref) => <Input {...props} type="email" ref={ref} />
);
const Number = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  (props, ref) => <Input {...props} type="number" ref={ref} />
);
const Text = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  (props, ref) => <Input {...props} type="text" ref={ref} />
);
const File = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  (props, ref) => <Input {...props} type="file" ref={ref} />
);

interface InputComponent extends React.ForwardRefExoticComponent<InputProps> {
  Number: typeof Number;
  Text: typeof Text;
  File: typeof File;
  Password: typeof Password;
  Email: typeof Email;
}
//
export const InputWithSubComponents = Input as InputComponent;
InputWithSubComponents.Password = Password;
InputWithSubComponents.File = File;
InputWithSubComponents.Number = Number;
InputWithSubComponents.Text = Text;
InputWithSubComponents.Email = Email;

export default Input;
