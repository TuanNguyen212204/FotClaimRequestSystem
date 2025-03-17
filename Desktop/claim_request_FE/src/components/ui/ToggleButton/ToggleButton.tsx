import { useState, useEffect } from "react";
import "./ToggleButton.css"; // Import file CSS

const ToggleButton = ({
  userId,
  checked,
  onChange,
}: {
  userId: string;
  checked: boolean;
  onChange: (userId: string) => void;
}) => {
  const [enabled, setEnabled] = useState(checked);
  const handleClick = () => {
    const newStatus = enabled ? 0 : 1;
    setEnabled(!enabled);
    onChange(userId);
  };

  return (
    <div>
      <button
        className={`toggle-wrapper ${enabled ? "enabled" : ""}`}
        onClick={() => handleClick()}
      >
        <span className="toggle-circle"></span>
      </button>
    </div>
  );
};

export default ToggleButton;
