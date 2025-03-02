import React from 'react';
import styles from "@components/ui/Badge/Badge.module.css"
interface BadgeProps {
    count: number;
    color?: string;
    className?: string;

}

const Badge: React.FC<BadgeProps> =  ({count, color = 'red', className  }) =>{
    return (
        <span
        className={`${styles.badge} ${className || ''}`}
        style={{backgroundColor: color, padding: '4px 8px', borderRadius: '12px', color: '#fff' }}
        >
            {count}
        </span>
    )
};

export default Badge