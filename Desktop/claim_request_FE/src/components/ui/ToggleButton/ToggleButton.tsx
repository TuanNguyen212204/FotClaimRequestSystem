import { useState, useEffect } from "react";
import "./ToggleButton.css"; // Import file CSS
import Modal from "@/components/ui/modal/Modal"; // Import the Modal component
import { toast } from "react-toastify";
const ToggleButton = ({
  userId,
  checked,
  onChange,
}: {
  userId: string;
  checked: boolean;
  onChange: (newChecked: boolean) => void;
}) => {
  const [enabled, setEnabled] = useState(checked);

  useEffect(() => {
    setEnabled(checked);
  }, [checked]);

  const handleClick = () => {
    const newStatus = !enabled;
    Modal.confirm({
      title: newStatus ? "Enable User" : "Disable User",
      children: `Are you sure you want to ${
        newStatus ? "Enable" : "Disable"
      } this user?`,
      onOk: () => {
        setEnabled(newStatus);
        onChange(newStatus);
        toast.success("Update status successful!");
      },
      onCancel: () => {
        toast.error("Update status failed!");
      },
    });
  };

  return (
    <button
      className={`toggle-wrapper ${enabled ? "enabled" : ""}`}
      onClick={handleClick}
    >
      <span className="toggle-circle"></span>
    </button>
  );
};

export default ToggleButton;
