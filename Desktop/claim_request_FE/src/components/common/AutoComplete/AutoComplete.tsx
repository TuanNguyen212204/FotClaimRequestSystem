import React from "react";
import { AutoCompleteProps } from "./AutoComplete.types";
import ClearIcon from "./ClearIcon";
import DropdownList from "./DropDownlist";
import useAutoComplete from "@/Hooks/useAutoComplete";
import { Option } from "@/Hooks/useAutoComplete";
const variantStyles = {
  outline:
    "border bg-white  border-gray-400 hover:border-blue-500 focus:border-blue-500 focus:outline-2 focus:outline-blue-100",
  filled:
    "bg-gray-100 hover:bg-gray-200 border border-transparent outline-none focus:border-blue-500",
  borderless: "border-none shadow-none outline-none bg-white",
  default:
    "border border-[#d9d9d9] bg-white  focus:border-blue-500  hover:border-blue-500 focus:outline-2 focus:outline-blue-100 ",
};

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  onSelect,
  value,
  onChange,
  allowClear,
  onSearch,
  placeholder = "Type to search...",
  disabled = false,
  autoFocus = false,
  varient = "default",
  notFoundContent,
  inputRef,
}) => {
  const {
    value: inputValue,
    open,
    filteredOptions,
    containerRef,
    handleInputChange,
    handleSelect,
    handleClear,
    activeIndex,
    handelKeyDown,
  } = useAutoComplete({
    options,
    value,
    onChange,
    onSearch,
    onSelect,
  });

  const getVariantStyle = () => {
    return (
      variantStyles[varient as keyof typeof variantStyles] ||
      variantStyles.default
    );
  };

  const insiderHandleSelect = (option: Option) => {
    const selected = handleSelect(option);
    if (onSelect) {
      onSelect(selected.value, selected);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative max-w-[301px]  w-full box-border"
    >
      <input
        type="text"
        value={
          activeIndex >= 0 ? filteredOptions[activeIndex].value : inputValue
        }
        ref={inputRef}
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyDown={handelKeyDown}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`w-full p-2 text-black rounded box-border ${getVariantStyle()}`}
      />
      {allowClear && inputValue && (
        <ClearIcon onClick={handleClear} Icon={allowClear} />
      )}

      <DropdownList
        isOpen={open && filteredOptions.length > 0}
        options={filteredOptions}
        onSelect={insiderHandleSelect}
        activeIndex={activeIndex}
      />
      {notFoundContent ? (
        <DropdownList
          isOpen={filteredOptions.length === 0}
          options={filteredOptions}
          onSelect={insiderHandleSelect}
          activeIndex={activeIndex}
          notFoundContent={notFoundContent}
        />
      ) : null}
    </div>
  );
};

export default AutoComplete;
