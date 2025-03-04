import React from "react";
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
  size: "small" | "medium" | "large";
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "medium", className, ...InputProps }, ref) => {
    const sizeClass = size ? styles[`${size}`] : "";
    return (
      <input
        {...InputProps}
        className={`input ${sizeClass} ${className}`}
        ref={ref}
      />
    );
  }
);
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ size = "medium", ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);

  return (
    <div className={styles.passwordInputWrapper}>
      <Input
        {...props}
        type={visible ? "text" : "password"}
        ref={ref}
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

// const Password = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
//   (props, ref) => <Input {...props} type="password" ref={ref} />
// );
// const Email = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
//   (props, ref) => <Input {...props} type="email" ref={ref} />
// );
// const Number = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
//   (props, ref) => <Input {...props} type="number" ref={ref} />
// );
// const Text = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
//   (props, ref) => <Input {...props} type="text" ref={ref} />
// );
// const File = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
//   (props, ref) => <Input {...props} type="file" ref={ref} />
// );

// interface InputComponent extends React.ForwardRefExoticComponent<InputProps> {
//   Number: typeof Number;
//   Text: typeof Text;
//   File: typeof File;
//   Password: typeof Password;
//   Email: typeof Email;
// }
// //
// export const InputWithSubComponents = Input as InputComponent;
// InputWithSubComponents.Password = Password;
// InputWithSubComponents.File = File;
// InputWithSubComponents.Number = Number;
// InputWithSubComponents.Text = Text;
// InputWithSubComponents.Email = Email;

export default Input;
