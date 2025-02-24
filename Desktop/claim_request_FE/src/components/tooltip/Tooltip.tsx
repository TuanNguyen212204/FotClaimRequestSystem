import React, { useState } from "react";
import { TooltipProps } from "./Tooltip.types";
import styles from "./Tooltip.module.css";

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && <div className={styles.tooltipText}>{text}</div>}
    </div>
  );
};
