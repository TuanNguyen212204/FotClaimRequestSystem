import React from "react";
import { DropdownListProps } from "./AutoComplete.types";

const DropdownList: React.FC<DropdownListProps & { isOpen: boolean }> = ({
  options,
  onSelect,
  activeIndex,
  notFoundContent,
  isOpen,
}) => {
  return (
    <ul
      className={`absolute top-[130%] left-0 w-full border border-[#d9d9d9] rounded bg-white m-0 p-1 list-none max-h-[150px] z-10 overflow-y-auto box-border transition-all duration-300 ease-in-out origin-top ${
        isOpen
          ? "opacity-100 scale-y-100"
          : "opacity-0 scale-y-0 pointer-events-none"
      }`}
    >
      {options.map((option, index) => (
        <li
          key={option.value}
          onClick={() => onSelect(option)}
          className={`p-2 cursor-pointer rounded text-black hover:bg-gray-200 max-h-5 ${
            index === activeIndex ? "bg-gray-300" : ""
          }`}
        >
          {option.label || option.value}
        </li>
      ))}
      {options.length === 0 &&
        notFoundContent &&
        (React.isValidElement(notFoundContent) &&
        notFoundContent.type === "li" ? (
          notFoundContent
        ) : (
          <li className="p-2 pointer-events-none rounded max-h-5 text-black hover:bg-gray-200">
            {notFoundContent ? notFoundContent : "No Data Found"}
          </li>
        ))}
    </ul>
  );
};

export default DropdownList;
