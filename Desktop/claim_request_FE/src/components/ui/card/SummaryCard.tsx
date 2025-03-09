import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
}

const SummaryCard = ({ title, value, icon, bgColor, textColor }: SummaryCardProps) => {
  return (
    <div className={`p-4 rounded-xl shadow ${bgColor}`}>
      <div className="flex items-center">
        <div className={`text-2xl ${textColor}`}>{icon}</div>
        <h2 className="text-lg font-semibold ml-2">{title}</h2>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default SummaryCard;
