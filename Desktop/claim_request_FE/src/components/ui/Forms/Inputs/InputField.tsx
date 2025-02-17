import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  picture?: React.ReactElement<HTMLImageElement>;
  error?: FieldError | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  picture,
  error,
  ...rest
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { ref: registerRef, ...restRegister } = register(name);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.type === "date") {
        inputRef.current.showPicker();
      }
    }
  };

  return (
    <div className="flex-1">
      <div className="mb-4" w-ful>
        <label className="block text-black font-medium mb-1" htmlFor={name}>
          {label}
        </label>
        <div className="relative">
          <input
            id={name}
            {...restRegister}
            {...rest}
            ref={(e) => {
              inputRef.current = e;
              registerRef(e);
            }}
            onClick={handleClick}
            className="p-2 border border-gray-400 rounded-lg bg-white text-black w-full pr-10 box-border "
          />
          {picture && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {picture}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    </div>
  );
};

export default InputField;
