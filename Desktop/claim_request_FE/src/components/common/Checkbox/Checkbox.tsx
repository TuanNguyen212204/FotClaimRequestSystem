import { useState, ChangeEvent } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const BasicCheckbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="checkbox-input"
      />
      {label && <label className="checkbox-label">{label}</label>}
    </div>
  );
};

export const CustomCheckbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="checkbox-container">
      <label className="custom-checkbox-wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="custom-checkbox-input"
        />
        <span className="custom-checkbox" />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
    </div>
  );
};

export const ToggleCheckbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="checkbox-container">
      <label className="toggle-checkbox-wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="toggle-checkbox-input"
        />
        <span className="toggle-checkbox" />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
    </div>
  );
};

export const CircularCheckbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="checkbox-container">
      <label className="circular-checkbox-wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="circular-checkbox-input"
        />
        <span className="circular-checkbox" />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
    </div>
  );
};

export const AnimatedCheckbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="checkbox-container">
      <label className="animated-checkbox-wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="animated-checkbox-input"
        />
        <span className="animated-checkbox" />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
    </div>
  );
};

export const MinimalCheckbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="checkbox-container">
      <label className="minimal-checkbox-wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="minimal-checkbox-input"
        />
        <span className="minimal-checkbox" />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
    </div>
  );
};