import React from "react";
import styles from "@components/ui/login/LoginForm.module.css";

interface PasswordProgressProps {
  validCount: number;
  maxCount?: number;
}

const PasswordProgress: React.FC<PasswordProgressProps> = ({
  validCount,
  maxCount = 5,
}) => {
  return (
    <div className={styles.passwordProgress}>
      {Array.from({ length: maxCount }, (_, index) => {
        const isFilled = index < validCount;
        let colorClass = "";
        if (isFilled) {
          if (validCount < 3) {
            colorClass = styles["passwordProgress__item--red"];
          } else if (validCount === 3) {
            colorClass = styles["passwordProgress__item--orange"];
          } else if (validCount >= 4) {
            colorClass = styles["passwordProgress__item--green"];
          }
        }
        return (
          <div
            key={index}
            className={`${styles.passwordProgress__item} ${colorClass}`}
          />
        );
      })}
    </div>
  );
};

export default PasswordProgress;