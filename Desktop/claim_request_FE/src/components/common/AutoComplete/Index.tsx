import React from "react";
import { useAutoComplete, Option } from "@Hooks/useAutoComplete";

interface AutoCompleteProps {
  options: Option[];
  onSelect?: (value: string, option: Option) => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  onSelect,
  value,
  onChange,
  placeholder = "Type to search...",
}) => {
  const {
    value: inputValue,
    open,
    filteredOptions,
    containerRef,
    handleInputChange,
    handleSelect,
  } = useAutoComplete({
    options,
    value,
    onChange,
  });

  const insiderHandleSelect = (option: Option) => {
    const selected = handleSelect(option);
    if (onSelect) {
      onSelect(selected.value, selected);
    }
  };
  return (
    <div ref={containerRef} className="box-border relative max-w-[309px]">
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-2 border border-[#d9d9d9] text-black bg-white rounded"
      />
      {open && filteredOptions.length > 0 ? (
        <>
          {" "}
          <ul
            className={`absolute top-[130%]  w-full border border-[#d9d9d9] rounded bg-white m-0 p-0 list-none max-h-[150px] z-10 overflow-y-auto`}
          >
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => insiderHandleSelect(option)}
                className="p-2 cursor-pointer text-black hover:bg-gray-100"
              >
                {option.label || option.value}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AutoComplete;
