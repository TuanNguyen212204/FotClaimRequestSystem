import { useState, useEffect } from 'react';
import './switchTheme.css';

export const SwitchTheme = () => {
    const storageChange = `switch_theme`;
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const storageValue = localStorage.getItem(storageChange);
        return storageValue ? JSON.parse(storageValue) : false;
    });

    useEffect(() => {
            if (isDarkTheme) {
                document.body.classList.add('dark-theme');
                document.body.classList.remove('light-theme');
            } else {
                document.body.classList.add('light-theme');
                document.body.classList.remove('dark-theme');
            }
        localStorage.setItem(storageChange, JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const handleChange = () => {
        setIsDarkTheme((prev: any) => !prev);
    };

    return (
        <div className='switch-container'>
            <button
                className={`theme-switch ${isDarkTheme ? 'dark' : 'light'}`}
                onClick={handleChange}
            >
                <span className='switch-knob' />
            </button>
        </div>
    );
};