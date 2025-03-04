import { useState } from "react";
import "./toggleButton.css";

interface ToggleButtonProps {
    onChange?: (value: boolean) => void;
}

export const ToggleButton = ({ onChange }: ToggleButtonProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleToggle = (): void => {
        setIsChecked((prev) => {
            const newValue = !prev;
            if (onChange) {
                onChange(newValue);
            }
            return newValue;
        });
    };

    return (
        <div className='toggle-container'>
            <label className='toggle-label'>ToggleButton</label>
            <div
                className={`toggle-button ${isChecked ? 'checked' : ''}`}
                onClick={handleToggle}
            >
                <span className='toggle-text'>{isChecked ? 'ON' : 'OFF'} </span>
                <div className='toggle-button-circle' />
            </div>
        </div>
    );
};