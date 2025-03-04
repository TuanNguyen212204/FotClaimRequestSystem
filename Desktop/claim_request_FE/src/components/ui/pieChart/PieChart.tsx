import React, { useState } from "react";
import styles from "@components/ui/circleChart/PieChart.module.css";

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <svg viewBox="0 0 32 32" className={styles.pieChart}>
      {data.map((slice, index) => {
        const isHovered = hoverIndex === index;
        const hoverRadius = isHovered ? 17 : 16;

        const [startX, startY] = getCoordinatesForPercentage(
          cumulativePercentage,
          hoverRadius
        );
        cumulativePercentage += slice.value / total;
        const [endX, endY] = getCoordinatesForPercentage(
          cumulativePercentage,
          hoverRadius
        );
        const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

        const midPercentage = cumulativePercentage - slice.value / (2 * total);
        const [textX, textY] = getCoordinatesForPercentage(midPercentage, 10);

        return (
          <g
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <path
              d={`M16,16 L${startX},${startY} A16,16 0 ${largeArcFlag} 1 ${endX},${endY} Z`}
              fill={slice.color}
              className={styles.pieSlice}
            />
            <text x={textX} y={textY} className={styles.pieText}>
              {slice.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const getCoordinatesForPercentage = (
  percentage: number,
  radius: number = 16
): [number, number] => {
  const x = Math.cos(2 * Math.PI * percentage) * radius + 16;
  const y = Math.sin(2 * Math.PI * percentage) * radius + 16;
  return [x, y];
};

export default PieChart;
