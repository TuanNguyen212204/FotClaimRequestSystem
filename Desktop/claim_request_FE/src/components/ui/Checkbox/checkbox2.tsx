import { useState, ChangeEvent, useEffect } from 'react';
import './csscheckbox2.css';

interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export const DisabledCheckbox = ({ checked = false }: CheckboxProps) => {
    return (
        <div className="checkbox-container">
            <label className="disabled-checkbox-wrapper">
                <input
                    type="checkbox"
                    checked={checked}
                    disabled
                    className="disabled-checkbox-input"
                />
                <span className="disabled-checkbox" />
            </label>
        </div>
    );
};

export const CheckedDisabledCheckbox = ({ checked = true }: CheckboxProps) => {
    return (
        <div className="checkbox-container">
            <label className="checked-disabled-checkbox-wrapper">
                <input
                    type="checkbox"
                    checked={checked}
                    disabled
                    className="checked-disabled-checkbox-input"
                />
                <span className="checked-disabled-checkbox" />
            </label>
        </div>
    );
};

export const SuccessCheckbox = ({ checked: checkChange, onChange }: CheckboxProps) => {
    const storageChange = `checkbox_success`;
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
            <label className="success-checkbox-wrapper">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    className="success-checkbox-input"
                />
                <span
                    className="success-checkbox"
                />
            </label>
        </div>
    );
};

export const InvalidCheckbox = ({ checked: checkChange, onChange }: CheckboxProps) => {
    const storageChange = `checkbox_invalid`;
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
            <label className="invalid-checkbox-wrapper">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    className="invalid-checkbox-input"
                />
                <span
                    className="invalid-checkbox"
                />
            </label>
        </div>
    );
};