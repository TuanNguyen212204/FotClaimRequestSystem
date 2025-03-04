import { useState, useEffect } from 'react';
import './switchTheme.css';

interface SwitchThemeProps {
    defaultTheme?: boolean;
}

export const SwitchTheme = ({ defaultTheme = false }: SwitchThemeProps) => {
    const storageChange = `switch_theme`;
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const storageValue = localStorage.getItem(storageChange);
        return storageValue ? JSON.parse(storageValue) : defaultTheme ?? false;
    });

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
        document.body.classList.toggle('light-theme', !isDarkTheme);
        localStorage.setItem(storageChange, JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const handleChange = () => {
        setIsDarkTheme((prev: any) => !prev);
    };

    return (
        <div className='switch-container'>
            <label className='switch-label'>
                <button
                    className={`theme-button ${isDarkTheme ? 'dark' : 'light'}`}
                    onClick={handleChange}
                >
                    {isDarkTheme ? '🌙' : '🌞'}
                </button>
                <span className="theme-label">{isDarkTheme ? 'Dark Mode' : 'Light Mode'}</span>
            </label>
        </div>
    );
};