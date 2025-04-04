import { ReactNode } from "react";
import { Chart } from "react-google-charts";
import styles from "./SummaryCard.module.css";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const SummaryCard = ({
  title,
  totalvalue,
  monthvalue,
  icon,
  percentage,
  chartData,
  colors = [],
}: {
  title: string;
  totalvalue: number;
  monthvalue?: number;
  icon: ReactNode;
  percentage?: number;
  chartData?: [string, number][];
  colors?: string[];
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.value}>{totalvalue}</p>
      {monthvalue !== undefined && (
        <p className={styles.detail}>
          {t("dashboard.summaryCard.thisMonth")}: {monthvalue}
        </p>
      )}

      <div
        className={`${styles.percentage} ${
          percentage !== undefined && percentage >= 0
            ? styles.positive
            : styles.negative
        }`}
      >
        {percentage !== undefined ? (
          <>
            {percentage >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className={styles.percentageValue}>
              {Math.abs(percentage)}%
            </span>
          </>
        ) : (
          <span className={styles.percentagePlaceholder}></span>
        )}
        <span className={styles.comparison}>
          {" "}
          {t("dashboard.summaryCard.sinceLastMonth")}
        </span>
      </div>

      {chartData && chartData.length > 0 && (
        <div className={styles.chartWrapper}>
          <div className={styles.legend}>
            {chartData.map(([label, value], index) => (
              <div key={index} className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: colors[index] || getColor(index) }}
                ></span>
                {value} {label}
              </div>
            ))}
          </div>

          <Chart
            chartType="PieChart"
            width="90%"
            height="90%"
            data={[["Label", "Value"], ...chartData]}
            options={{
              pieHole: 0.4,
              legend: "none",
              backgroundColor: "transparent",
              chartArea: { width: "110%", height: "110%" },
              tooltip: { trigger: "focus" },
              pieSliceText: "none",
              slices: chartData.reduce((acc, _, index) => {
                acc[index] = { color: colors[index] || getColor(index) };
                return acc;
              }, {} as Record<number, { color: string }>),
              animation: {
                startup: true,
                easing: "out",
                duration: 1000,
              },
              pieStartAngle: 180,
            }}
          />
        </div>
      )}
    </div>
  );
};

const getColor = (index: number) => {
  const defaultColors = ["#4caf50", "#fbc02d", "#e57373", "#64b5f6", "#ba68c8"];
  return defaultColors[index % defaultColors.length];
};

export default SummaryCard;
