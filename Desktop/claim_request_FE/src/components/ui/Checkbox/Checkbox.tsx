import { useState, ChangeEvent, useEffect } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const BasicCheckbox = ({ checked: checkChange, onChange }: CheckboxProps) => {
  const storageChange = `checkbox_basic`;
  const [isChecked, setIsChecked] = useState(() => {
    const storageValue = localStorage.getItem(storageChange);
    return storageValue ? JSON.parse(storageValue) : checkChange ?? false;
  });

  useEffect(() => {
    localStorage.setItem(storageChange, JSON.stringify(isChecked));
  }, [isChecked, storageChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className="checkbox-container">
      <label className="basic-checkbox-wrapper">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="basic-checkbox-input"
        />
        <span className="basic-checkbox" />
      </label>
    </div>
  );
};

export const ToggleCheckbox = ({ checked: checkChange, onChange }: CheckboxProps) => {
  const storageChange = `checkbox_toggle`;
  const [isChecked, setIsChecked] = useState(() => {
    const storageValue = localStorage.getItem(storageChange);
    return storageValue ? JSON.parse(storageValue) : checkChange ?? false;
  });

  useEffect(() => {
    localStorage.setItem(storageChange, JSON.stringify(isChecked));
  }, [isChecked, storageChange]);

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
      </label>
    </div>
  );
};

export const CircularCheckbox = ({ checked: checkChange, onChange }: CheckboxProps) => {
  const storageChange = `checkbox_circular`;
  const [isChecked, setIsChecked] = useState(() => {
    const storageValue = localStorage.getItem(storageChange);
    return storageValue ? JSON.parse(storageValue) : checkChange ?? false;
  });

  useEffect(() => {
    localStorage.setItem(storageChange, JSON.stringify(isChecked));
  }, [isChecked, storageChange]);

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
      </label>
    </div>
  );
};

export const AnimatedCheckbox = ({ checked: checkChange, onChange }: CheckboxProps) => {
  const storageChange = `checkbox_animated`;
  const [isChecked, setIsChecked] = useState(() => {
    const storageValue = localStorage.getItem(storageChange);
    return storageValue ? JSON.parse(storageValue) : checkChange ?? false;
  });

  useEffect(() => {
    localStorage.setItem(storageChange, JSON.stringify(isChecked));
  }, [isChecked, storageChange]);

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
      </label>
    </div>
  );
};

export const MinimalCheckbox = ({ checked: checkChange, onChange }: CheckboxProps) => {
  const storageChange = `checkbox_minimal`;
  const [isChecked, setIsChecked] = useState(() => {
    const storageValue = localStorage.getItem(storageChange);
    return storageValue ? JSON.parse(storageValue) : checkChange ?? false;
  });

  useEffect(() => {
    localStorage.setItem(storageChange, JSON.stringify(isChecked));
  }, [isChecked, storageChange]);

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
      </label>
    </div>
  );
};