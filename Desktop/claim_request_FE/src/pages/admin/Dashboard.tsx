import { useState, useEffect } from "react";
import SummaryCard from "@/components/card/SummaryCard";
import DashboardHeader from "@/components/card/DashboardHeader";
import OTChart from "@/components/card/OTChart";
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
  const [selected, setSelected] = useState({
    Pending: true,
    Approved: true,
    Rejected: true,
    Paid: true,
  });

  const [summary, setSummary] = useState({
    totalProjects: null,
    totalUsers: null,
    totalClaims: null,
    pendingClaims: null,
    approvedClaims: null,
    rejectedClaims: null,
  });

  const projectData = [
    { name: "Project A", otHours: 120 },
    { name: "Project B", otHours: 95 },
    { name: "Project C", otHours: 85 },
    { name: "Project D", otHours: 60 },
  ];

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

  const filteredData = [
    ["Time", ...Object.keys(selected).filter((key) => selected[key])],
    ...data.map((item) => [
      item.name,
      ...Object.keys(selected)
        .filter((key) => selected[key])
        .map((key) => item[key.toLowerCase()]),
    ]),
  ];

  const isValidData = filteredData.length > 1 && filteredData[0].length > 1;
  const chartData = isValidData ? filteredData : [["Time", "No Data"], ["", 0]];

  return (
    <div className={styles.container}>
      <DashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-3">
          <SummaryCard title="Total Claims" value={summary.totalClaims ?? "N/A"} icon={<ClipboardList />} percentage={10} />
          <SummaryCard title="Pending Claims" value={summary.pendingClaims ?? "N/A"} icon={<Clock />} percentage={-5} />
          <SummaryCard title="Approved Claims" value={summary.approvedClaims ?? "N/A"} icon={<CheckCircle />} percentage={20} />
          <SummaryCard title="Rejected Claims" value={summary.rejectedClaims ?? "N/A"} icon={<XCircle />} percentage={-12} />
          <SummaryCard title="Total Users" value={summary.totalUsers ?? "N/A"} icon={<Users />} percentage={8} />
          <SummaryCard title="Total Projects" value={summary.totalProjects ?? "N/A"} icon={<Briefcase />} percentage={15} />
        </div>

        <div className={`${styles.chartOT} col-span-2`}>
          <OTChart data={projectData} />
        </div>
      </div>

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

        <div className="flex gap-3 mb-4">
          {Object.keys(selected).map((key) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selected[key]}
                onChange={() =>
                  setSelected({ ...selected, [key]: !selected[key] })
                }
              />
              <span>{key}</span>
            </label>
          ))}
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
              // hAxis: { title: "Time" },
              vAxis: { title: "Claims" },
              legend: { position: "bottom" },
              curveType: "function",
              series: {
                0: { color: "#FFA500" }, 
                1: { color: "#00C853" }, 
                2: { color: "#D50000" }, 
                3: { color: "#00b7ff" }, 
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
