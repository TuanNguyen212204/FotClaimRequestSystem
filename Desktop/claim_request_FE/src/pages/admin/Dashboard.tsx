import { useState, useEffect } from "react";
import SummaryCard from "@/components/card/SummaryCard";
import DashboardHeader from "@/components/card/DashboardHeader";
import { Chart } from "react-google-charts";
import { TrendingUp, CheckCircle, XCircle, Wallet, Briefcase, Users, Clock, ClipboardList } from "lucide-react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    let url = `https://67b847da699a8a7baef3677f.mockapi.io/${timeframe}`;
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeframe]);

  const chartData = [
    ["Time", "Pending", "Approved", "Rejected"],
    ...data.map(item => [item.name, item.pending, item.approved, item.rejected])
  ];

  return (
    <div className={styles.container}>
      <DashboardHeader />

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <SummaryCard title="Total Claims" value={105} icon={<ClipboardList />} percentage={10} />
        <SummaryCard title="Pending Claims" value={30} icon={<Clock />} percentage={-5} />
        <SummaryCard title="Approved Claims" value={50} icon={<CheckCircle />} percentage={20} />
        <SummaryCard title="Rejected Claims" value={10} icon={<XCircle />} percentage={-12} />
        <SummaryCard title="Total Users" value={500} icon={<Users />} percentage={8} />
        <SummaryCard title="Total Projects" value={20} icon={<Briefcase />} percentage={15} />
      </div>

      {/* Biểu đồ */}
      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>📊 Claim Status Overview</h2>
          <select
            className={`${styles.select} p-2 border rounded-md shadow-sm transition-all duration-300`}
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : (
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={chartData}
            options={{
              hAxis: { title: "Time" },
              vAxis: { title: "Claims" },
              series: {
                0: { color: "#FFA500" }, // Pending (Orange)
                1: { color: "#00C853" }, // Approved (Green)
                2: { color: "#D50000" }  // Rejected (Red)
              },
              legend: { position: "bottom" }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
