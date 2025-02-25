import React, { useState, useEffect } from 'react';
import styles from './StrongPassword.module.css';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

interface StrongPasswordProps {
    value: string;
    onChange: (value: string) => void;
    onValidityChange?: (isValid: boolean) => void;
}

interface PasswordRequirement {
    regex: RegExp;
    message: string;
    category: 'length' | 'character';
}

const StrongPassword: React.FC<StrongPasswordProps> = ({
    value,
    onChange,
    onValidityChange
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState(false);

    const [requirements] = useState<PasswordRequirement[]>([
        {
            regex: /^.{6,10}$/,
            message: 'Length: 6-10 characters',
            category: 'length'
        },
        {
            regex: /[0-9]/,
            message: 'Number (0-9)',
            category: 'character'
        },
        {
            regex: /[a-z]/,
            message: 'Lowercase (a-z)',
            category: 'character'
        },
        {
            regex: /[A-Z]/,
            message: 'Uppercase (A-Z)',
            category: 'character'
        },
        {
            regex: /[\W]/,
            message: 'Special character (!@#$...)',
            category: 'character'
        }
    ]);

    const validatePassword = (password: string): boolean => {
        return password.match(/^.{6,10}$/) ? true : false;
    };

    const checkRequirement = (requirement: PasswordRequirement): boolean => {
        return requirement.regex.test(value);
    };

    const getValidCharacterCount = (): number => {
        return requirements
            .filter(req => req.category === 'character' && checkRequirement(req))
            .length;
    };

    const getPasswordStrength = (): string => {
        const validCharCount = getValidCharacterCount();
        const lengthValid = value.length >= 6;

        if (value.length === 0) return ''; 
        if (value.length < 6) return styles.weak;
        if (lengthValid && validCharCount >= 3) return styles.strong; 
        if (lengthValid && validCharCount >= 2) return styles.medium; 
        return styles.weak; 
    };

    useEffect(() => {
        const valid = validatePassword(value);
        onValidityChange?.(valid);
    }, [value, onValidityChange]);

    return (
        <div className={styles.passwordContainer}>
            <div className={styles.inputWrapper}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${styles.passwordInput} ${focusedInput ? styles.focused : ''}`}
                    placeholder="Enter password"
                    onFocus={() => setFocusedInput(true)}
                    onBlur={() => setFocusedInput(false)}
                />
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
            </div>

            <div className={styles.strengthIndicator}>
                <div className={`${styles.strengthBar} ${getPasswordStrength()}`} />
            </div>

            <div className={styles.requirementTitle}>
                Password must meet the following requirements:
            </div>
            <div className={styles.lengthRequirement}>
                {requirements
                    .filter(req => req.category === 'length')
                    .map((requirement, index) => (
                        <div
                            key={index}
                            className={`${styles.requirement} ${checkRequirement(requirement) ? styles.valid : styles.invalid}`}
                        >
                            <span className={styles.icon}>
                                {checkRequirement(requirement) ? <FaCheck size={16} /> : <FaTimes size={16} />}
                            </span>
                            <span>{requirement.message}</span>
                        </div>
                    ))}
            </div>

            <div className={styles.requirementSubtitle}>
                At least 3 of the following:
            </div>
            {requirements
                .filter(req => req.category === 'character')
                .map((requirement, index) => (
                    <div
                        key={index}
                        className={`${styles.requirement} ${checkRequirement(requirement) ? styles.valid : styles.invalid}`}
                    >
                        <span className={styles.icon}>
                            {checkRequirement(requirement) ? <FaCheck size={16} /> : <FaTimes size={16} />}
                        </span>
                        <span>{requirement.message}</span>
                    </div>
                ))}
        </div>
    );
};

export default StrongPassword; 