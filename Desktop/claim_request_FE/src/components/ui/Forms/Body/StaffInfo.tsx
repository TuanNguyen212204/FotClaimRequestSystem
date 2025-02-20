import { useState } from "react";

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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <div className="mb-5 box-border">
      <div className="flex justify-between items-center border-b-1 border-gray-400 pb-1.5 mb-4">
        <h2 className="text-lg">Staff Information</h2>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-blue-500 underline"
        >
          {isCollapsed ? "Collapse" : "Expand"}
        </button>
      </div>
      {isCollapsed && (
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
      )}
    </div>
  );
}
