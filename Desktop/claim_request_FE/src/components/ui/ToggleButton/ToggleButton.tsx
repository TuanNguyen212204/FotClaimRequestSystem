import { useState, useEffect } from "react";
import "./ToggleButton.css"; // Import file CSS
import Modal from "@/components/ui/modal/Modal"; // Import the Modal component=
import { toast, ToastContainer } from "react-toastify";
const ToggleButton = ({
  userId,
  checked,
  onChange,
}: {
  userId: string;
  checked: boolean;
  onChange?: (newChecked: boolean) => void;
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
      tabIndex={-1}
      className={`toggle-wrapper ${enabled ? "enabled" : ""}`}
      onClick={handleClick}
    >
      <span className="toggle-circle"></span>
    </button>
  );
};

export const AdminButton = ({
  userId,
  checked,
  onClick,
}: {
  userId: string;
  checked: boolean;
  onClick?: () => void;
}) => {
  const [enabled, setEnabled] = useState(checked);

  return (
    <button
      tabIndex={-1}
      className={`toggle-wrapper ${enabled ? "enabled" : ""}`}
      // Disable the button
      onClick={() => {
        toast.error("You don't have permission to change this user status!");
      }}
    >
      <span className="toggle-circle"></span>
    </button>
  );
};
export default ToggleButton;
