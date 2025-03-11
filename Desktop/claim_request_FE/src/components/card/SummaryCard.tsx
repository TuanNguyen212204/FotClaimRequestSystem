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
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={`${styles.value}`}>{value}</p>
      <div className={`flex items-center ${percentage >= 0 ? "text-green-600" : "text-red-600"} ${styles.percentage}`}>
        {percentage >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      <span className="ml-1 font-semibold">{Math.abs(percentage)}%</span>
      <span className="text-gray-500 ml-1 text-sm">vs last month</span>
      </div>
    </div>


  );
};

export default SummaryCard;
