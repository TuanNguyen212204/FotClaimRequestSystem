import { useState } from "react";
import "./ToggleButton.css"; // Import file CSS

const ToggleButton = ({
  userId,
  checked,
  onChange,
}: {
  userId: string;
  checked: boolean;
  onChange: (userId: string, currentStatus: number) => void;
}) => {
  const [enabled, setEnabled] = useState(checked);
  const handleClick = () => {
    const newStatus = enabled ? 0 : 1;
    setEnabled(!enabled);
    onChange(userId, newStatus);
  };
  return (
    <button
      className={`toggle-wrapper ${enabled ? "enabled" : ""}`}
      onClick={() => handleClick()}
    >
      <span className="toggle-circle"></span>
    </button>
  );
};

export default ToggleButton;
