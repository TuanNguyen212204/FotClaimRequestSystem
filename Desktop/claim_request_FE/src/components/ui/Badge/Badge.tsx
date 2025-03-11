import React, { Children } from "react";
import styles from "@components/ui/Badge/Badge.module.css";
interface BadgeProps {
  count: number;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  color = "red",
  className,
  children,
}) => {
  const shouldShowBadge = count > 0;
  const displayCount = count > 99 ? "99+" : count;
  return (
    <div className={styles.badgeContainer}>
      {children}
      {shouldShowBadge && (
        <span
          className={`${styles.badge}`}
          style={{
            backgroundColor: color,
          }}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

export default Badge;