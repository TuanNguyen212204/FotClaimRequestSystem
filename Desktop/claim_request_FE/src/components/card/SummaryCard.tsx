import { ReactNode } from "react";
import styles from "./SummaryCard.module.css";
import { ArrowUp, ArrowDown } from "lucide-react";

const SummaryCard = ({
  title,
  value,
  icon,
  percentage,
}: {
  title: string;
  value: number;
  icon: ReactNode;
  percentage: number;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.value}>{value}</p>
      <p className={styles.detail}>This Month: </p>
      <div
        className={`${styles.percentage} ${
          percentage >= 0 ? styles.positive : styles.negative
        }`}
      >
        {percentage >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className={styles.percentageValue}>{Math.abs(percentage)}%</span>
        <span className={styles.comparison}>vs last month</span>
      </div>
    </div>
  );
};

export default SummaryCard;
