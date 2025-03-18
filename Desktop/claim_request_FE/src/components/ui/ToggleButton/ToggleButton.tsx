import { useState, useEffect } from "react";
import "./ToggleButton.css"; // Import file CSS

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
    setEnabled(newStatus);
    onChange(newStatus);
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
