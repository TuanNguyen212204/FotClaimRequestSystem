import React from "react";
import styles from "./Progress.module.css";

type ProgressProps = {
  value: number;
  label?: string;
  type?: "base" | "trailing" | "title" | "top-floating" | "bottom-floating";
};

const Progress: React.FC<ProgressProps> = ({ value, label = "", type = "base" }) => {
  return (
    <div className={styles.progressContainer}>
      {type === "title" && (
        <div className={styles.progressTitle}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      )}    
      
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar} style={{ width: `${value}%` }}></div>
        {type === "trailing" && (
          <div className={styles.progressTrailingLabel}>
            <span>{label}</span>
            <span>{value}%</span>
          </div>
        )}
      </div>

      {type === "top-floating" && (
        <div className={styles.progressTopLabel}>{value}%</div>
      )}
      {type === "bottom-floating" && (
        <div className={styles.progressBottomLabel}>{value}%</div>
      )}
    </div>
  );
};

export default Progress;
