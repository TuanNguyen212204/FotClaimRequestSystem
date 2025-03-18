import { useState, useEffect } from "react";
import SummaryCard from "@/components/card/SummaryCard";
import DashboardHeader from "@/components/card/DashboardHeader";
import { Chart } from "react-google-charts";
import { TrendingUp, CheckCircle, XCircle, Wallet, Briefcase, Users, Clock, ClipboardList } from "lucide-react";
import styles from "./Dashboard.module.css";
import httpClient from "@/constant/apiInstance";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProjects, setTotalProjects] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalClaims, setTotalClaims] = useState<number | null>(null);
  const [pendingClaims, setPendingClaims] = useState<number | null>(null);
  const [approvedClaims, setApprovedClaims] = useState<number | null>(null);
  const [rejectedClaims, setRejectedClaims] = useState<number | null>(null);

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

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-projects");
        console.log("API Response:", response.data);
        setTotalProjects(response.data.data); // Chỉnh lại để lấy `data` từ response
      } catch (error) {
        console.error("Error fetching total projects:", error);
        setTotalProjects(null); // Để tránh lỗi khi render
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-users");
        console.log("API Response:", response.data);
        setTotalUsers(response.data.data); // Chỉnh lại để lấy `data` từ response
      } catch (error) {
        console.error("Error fetching total users:", error);
        setTotalUsers(null); // Để tránh lỗi khi render
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-claims");
        console.log("API Response:", response.data);
        setTotalClaims(response.data.data); // Chỉnh lại để lấy `data` từ response
      } catch (error) {
        console.error("Error fetching total claims:", error);
        setTotalClaims(null); // Để tránh lỗi khi render
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/pending-claims");
        console.log("API Response:", response.data);
        setPendingClaims(response.data.data); // Chỉnh lại để lấy `data` từ response
      } catch (error) {
        console.error("Error fetching Pending claims:", error);
        setPendingClaims(null); // Để tránh lỗi khi render
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);


  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/approved-claims");
        console.log("API Response:", response.data);
        setApprovedClaims(response.data.data); // Chỉnh lại để lấy `data` từ response
      } catch (error) {
        console.error("Error fetching Approved claims:", error);
        setApprovedClaims(null); // Để tránh lỗi khi render
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);


  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/rejected-claims");
        console.log("API Response:", response.data);
        setRejectedClaims(response.data.data); // Chỉnh lại để lấy `data` từ response
      } catch (error) {
        console.error("Error fetching Reject claims:", error);
        setRejectedClaims(null); // Để tránh lỗi khi render
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);



  console.log("Total projects:", totalProjects);
  console.log("Total users:", totalUsers);
  console.log("Total claims:", totalClaims);
  console.log("Pending claims:", pendingClaims);
  console.log("Approved claims:", approvedClaims);
  console.log("Rejected claims:", rejectedClaims);
  
  return (
    <div className={styles.container}>
      <DashboardHeader />

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <SummaryCard title="Total Claims" value={loading ? "Loading..." : totalClaims ?? "N/A"} icon={<ClipboardList />} percentage={10} />
        <SummaryCard title="Pending Claims" value={loading ? "Loading..." : pendingClaims ?? "N/A"} icon={<Clock />} percentage={-5} />
        <SummaryCard title="Approved Claims" value={loading ? "Loading..." : approvedClaims ?? "N/A"} icon={<CheckCircle />} percentage={20} />
        <SummaryCard title="Rejected Claims" value={loading ? "Loading..." : rejectedClaims ?? "N/A"} icon={<XCircle />} percentage={-12} />
        <SummaryCard title="Total Users" value={loading ? "Loading..." : totalUsers ?? "N/A"} icon={<Users />} percentage={8} />
        <SummaryCard title="Total Projects" value={loading ? "Loading..." : totalProjects ?? "N/A"}  icon={<Briefcase />} percentage={15} />
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
