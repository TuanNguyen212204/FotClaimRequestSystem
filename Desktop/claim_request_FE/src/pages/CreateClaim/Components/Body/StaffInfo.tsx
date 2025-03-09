import { useState } from "react";
import { JSX } from "react";

interface IStaffInfoProps {
  name: string;
  department: string;
  staffID: string;
}

export default function StaffInfo({
  name,
  department,
  staffID,
}: IStaffInfoProps): JSX.Element {
 
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="mb-5 box-border">
      <div className="flex justify-between items-center border-b border-gray-400 pb-1.5 mb-4">
        <h2 className="text-lg">Staff Information</h2>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-500 "
        >
          {isCollapsed ? "Collapse" : "Expand"}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isCollapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative">
          <div className="mb-2.5">
            <span className="block mb-1 font-bold">Staff Name</span>
            <input
              placeholder="none"
              className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
              disabled
              value={name || ""}
            />
          </div>
          <div className="mb-2.5">
            <span className="block mb-1 font-bold">Staff Department</span>
            <input
              disabled
              placeholder="none"
              className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
              value={department || ""}
            />
          </div>
          <div className="mb-2.5">
            <span className="block mb-1 font-bold">Staff ID</span>
            <input
              disabled
              placeholder="none"
              className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
              value={staffID || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
