import { useState, useEffect } from "react";
import SummaryCard from "@/components/card/SummaryCard";
import DashboardHeader from "@/components/card/DashboardHeader";
import { Chart } from "react-google-charts";
import {
  CheckCircle,
  XCircle,
  Clock,
  ClipboardList,
  Briefcase,
  Users,
} from "lucide-react";
import styles from "./Dashboard.module.css";
import httpClient from "@/constant/apiInstance";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    totalProjects: null,
    totalUsers: null,
    totalClaims: null,
    pendingClaims: null,
    approvedClaims: null,
    rejectedClaims: null,
  });

  // Fetch dữ liệu biểu đồ
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const response = await fetch(
          `https://67b847da699a8a7baef3677f.mockapi.io/${timeframe}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeframe]);

  // Fetch tất cả dữ liệu tổng hợp một lần
  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const endpoints = [
          "/admin/total-projects",
          "/admin/total-users",
          "/admin/total-claims",
          "/admin/pending-claims",
          "/admin/approved-claims",
          "/admin/rejected-claims",
        ];
       
        const responses = await Promise.all(
          endpoints.map((endpoint) => httpClient.get(endpoint))
        );
        const [
          totalProjects,
          totalUsers,
          totalClaims,
          pendingClaims,
          approvedClaims,
          rejectedClaims,
        ] = responses.map((res) => res?.data?.data ?? null);

        setSummary({
          totalProjects,
          totalUsers,
          totalClaims,
          pendingClaims,
          approvedClaims,
          rejectedClaims,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setSummary({
          totalProjects: null,
          totalUsers: null,
          totalClaims: null,
          pendingClaims: null,
          approvedClaims: null,
          rejectedClaims: null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = [
    ["Time", "Pending", "Approved", "Rejected", "Paid"],
    ...data.map((item) => [
      item.name,
      item.pending,
      item.approved,
      item.rejected,
      item.paid,
    ]),
    ...data.map((item) => [
      item.name,
      item.pending,
      item.approved,
      item.rejected,
      item.paid,
    ]),
  ];

  return (
    <div className={styles.container}>
      <DashboardHeader />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <SummaryCard
          title="Total Claims"
          value={loading ? "Loading..." : summary.totalClaims ?? "N/A"}
          icon={<ClipboardList />}
          percentage={10}
        />
        <SummaryCard
          title="Pending Claims"
          value={loading ? "Loading..." : summary.pendingClaims ?? "N/A"}
          icon={<Clock />}
          percentage={-5}
        />
        <SummaryCard
          title="Approved Claims"
          value={loading ? "Loading..." : summary.approvedClaims ?? "N/A"}
          icon={<CheckCircle />}
          percentage={20}
        />
        <SummaryCard
          title="Rejected Claims"
          value={loading ? "Loading..." : summary.rejectedClaims ?? "N/A"}
          icon={<XCircle />}
          percentage={-12}
        />
        <SummaryCard
          title="Total Users"
          value={loading ? "Loading..." : summary.totalUsers ?? "N/A"}
          icon={<Users />}
          percentage={8}
        />
        <SummaryCard
          title="Total Projects"
          value={loading ? "Loading..." : summary.totalProjects ?? "N/A"}
          icon={<Briefcase />}
          percentage={15}
        />
        <SummaryCard
          title="Total Claims"
          value={loading ? "Loading..." : summary.totalClaims ?? "N/A"}
          icon={<ClipboardList />}
          percentage={10}
        />
        <SummaryCard
          title="Pending Claims"
          value={loading ? "Loading..." : summary.pendingClaims ?? "N/A"}
          icon={<Clock />}
          percentage={-5}
        />
        <SummaryCard
          title="Approved Claims"
          value={loading ? "Loading..." : summary.approvedClaims ?? "N/A"}
          icon={<CheckCircle />}
          percentage={20}
        />
        <SummaryCard
          title="Rejected Claims"
          value={loading ? "Loading..." : summary.rejectedClaims ?? "N/A"}
          icon={<XCircle />}
          percentage={-12}
        />
        <SummaryCard
          title="Total Users"
          value={loading ? "Loading..." : summary.totalUsers ?? "N/A"}
          icon={<Users />}
          percentage={8}
        />
        <SummaryCard
          title="Total Projects"
          value={loading ? "Loading..." : summary.totalProjects ?? "N/A"}
          icon={<Briefcase />}
          percentage={15}
        />
      </div>

      {/* Chart */}
      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>📊 Claim Status Overview</h2>
          <select
            className={`${styles.select} p-2 border rounded-md shadow-sm transition-all duration-300`}
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
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
                2: { color: "#D50000" }, // Rejected (Red)
                3: { color: "#00b7ff" }, // Paid (Yellow)
              },
              legend: { position: "bottom" },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
