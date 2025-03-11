import { ReactNode } from "react";

const SummaryCard = ({ title, value, icon, type }: { title: string; value: number; icon: ReactNode; type: "primary" | "error" | "success" | "warning" }) => {
  const colors = {
    primary: "bg-blue-100 text-blue-500",
    error: "bg-red-100 text-red-500",
    success: "bg-green-100 text-green-500",
    warning: "bg-yellow-100 text-yellow-500",
  };

  return (
    <div className={`p-4 rounded-xl shadow ${colors[type]}`}>
      <div className="flex items-center">
        <div className="text-2xl">{icon}</div>
        <h2 className="text-lg font-semibold ml-2">{title}</h2>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default SummaryCard;
