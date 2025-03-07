import React from "react";
import { X } from "lucide-react";
import { ClearIconProps } from "./AutoComplete.types";

const ClearIcon: React.FC<ClearIconProps> = ({ onClick, Icon }) => (
  <span
    onClick={onClick}
    className="absolute flex items-center justify-center cursor-pointer w-6 h-6 hover:bg-gray-100 rounded-full right-2 top-1/2 -translate-y-1/2"
  >
    {typeof Icon !== "boolean" ? Icon : <X size={16} color="#888" />}
  </span>
);

export default ClearIcon;
