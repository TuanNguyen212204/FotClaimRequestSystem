import React, { useState } from "react";
import { TooltipProps } from "@/types/Tooltip.types";
import styles from "./Tooltip.module.css";

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTooltipClass = () => {
    switch (position) {
      case "bottom":
        return styles.tooltipBottom;
      case "right":
        return styles.tooltipRight;
      case "left":
        return styles.tooltipLeft;
      case "top":
      default:
        return styles.tooltipTop;
    }
  };

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className={`${styles.tooltipText} ${getTooltipClass()}`}>
          {text}
          <span className={styles.arrow} />
        </div>
      )}
    </div>
  );
};
