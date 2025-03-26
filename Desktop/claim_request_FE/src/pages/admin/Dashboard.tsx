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
  const [totalClaim, setTotalClaim] = useState({ totalClaims: null, currentMonthClaims: null, changePercentage: null });
  const [totalPending, setTotalPending] = useState({ pendingClaims: null, currentMonthPending: null, changePercentage: null });
  const [totalApproved, setTotalApproved] = useState({ approvedClaims: null, currentMonthClaims: null, changePercentage: null });
  const [totalRejected, setTotalRejected] = useState({ rejectedClaims: null, currentMonthClaims: null, changePercentage: null });
  const [summary, setSummary] = useState({ totalProjects: null, totalUsers: null, });

  const [selected, setSelected] = useState({
    Pending: true,
    Approved: true,
    Rejected: true,
    Paid: true,
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
    const fetchTotalClaim = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-claims");
        const data = response?.data?.data ?? {};
  
        setTotalClaim({
          totalClaims: data.totalClaims ?? null,
          currentMonthClaims: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalClaim({
          totalClaims: null,
          currentMonthClaims: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalClaim();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/pending-claims");
        const data = response?.data?.data ?? {};
        setTotalPending({
          pendingClaims: data.pendingClaims ?? null,
          currentMonthPending: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalPending({
          pendingClaims: null,
          currentMonthPending: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);
  
  useEffect(() => {
    const fetchTotalApproved = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/approved-claims");
        const data = response?.data?.data ?? {};
  
        setTotalApproved({
          approvedClaims: data.approvedClaims ?? null,
          currentMonthClaims: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalApproved({
          approvedClaims: null,
          currentMonthClaims: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalApproved();
  }, []);

  useEffect(() => {
    const fetchTotalRejected = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/rejected-claims");
        const data = response?.data?.data ?? {};
        setTotalRejected({
          rejectedClaims: data.rejectedClaims ?? null,
          currentMonthClaims: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalRejected({
          rejectedClaims: null,
          currentMonthClaims: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalRejected();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const endpoints = [
          "/admin/total-projects",
          "/admin/total-users",
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) => httpClient.get(endpoint))
        );
        const [
          totalProjects,
          totalUsers,
        ] = responses.map((res) => res?.data?.data ?? null);

        setSummary({
          totalProjects,
          totalUsers,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setSummary({
          totalProjects: null,
          totalUsers: null,
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
            <SummaryCard 
              title="Total Claims" 
              totalvalue={totalClaim?.totalClaims ?? 0}
              monthvalue={totalClaim?.currentMonthClaims ?? 0}
              icon={<ClipboardList />} 
              percentage={totalClaim?.changePercentage ?? 0} 
            />
            <SummaryCard 
              title="Pending Claims" 
              totalvalue={totalPending?.pendingClaims ?? 0}
              monthvalue={totalPending?.currentMonthPending ?? 0}
              icon={<Clock />} 
              percentage={totalPending?.changePercentage ?? 0} 
            />
            <SummaryCard 
              title="Total Projects" 
              totalvalue={summary.totalProjects ?? 0}
              icon={<Briefcase />} 
            />
            <SummaryCard 
              title="Approved Claims" 
              totalvalue={totalApproved?.approvedClaims ?? 0}
              monthvalue={totalApproved?.currentMonthClaims ?? 0}
              icon={<CheckCircle />} 
              percentage={totalApproved?.changePercentage ?? 0} 
            />
            <SummaryCard
              title="Rejected Claims" 
              totalvalue={totalRejected?.rejectedClaims ?? 0}
              monthvalue={totalRejected?.currentMonthClaims ?? 0}
              icon={<XCircle />} 
              percentage={totalRejected?.changePercentage ?? 0} 
            />
            <SummaryCard 
              title="Total Users" 
              totalvalue={summary.totalUsers ?? 0}
              icon={<Users />} 
            />
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
