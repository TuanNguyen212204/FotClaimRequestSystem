interface IStaffInfoProps {
  name: string;
  department: string;
  staffID: string; // strng
}
export default function StaffInfo({
  name,
  department,
  staffID,
}: IStaffInfoProps): JSX.Element {
  return (
    <div className="mb-5 box-border">
      <h2 className="text-lg pb-1.5 mb-4 border-b-1 border-gray-400">
        Staff Information
      </h2>
      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Staff Name</span>
        <input
          placeholder="none"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          disabled
          value={name ? name : ""}
        ></input>
      </div>
      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Staff Department</span>
        <input
          disabled
          placeholder="none"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          value={department ? department : ""}
        ></input>
      </div>

      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Staff ID</span>
        <input
          disabled
          placeholder="none"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          value={staffID ? staffID : ""}
        ></input>
      </div>
    </div>
  );
}
