import { useState, ChangeEvent } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  label?: string; 
  checked?: boolean; 
  onChange?: (checked: boolean) => void; 
}

const Checkbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked); 
    }
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="checkbox-input"
      />
      {label && <label className="checkbox-label">{label}</label>}
    </div>
  );
};

export default Checkbox;