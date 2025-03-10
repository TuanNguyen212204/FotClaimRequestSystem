import { useState, useEffect } from "react";
import SummaryCard from "@/components/card/SummaryCard";
import RecentClaims from "@/components/card/RecentClaims";
import Ratings from "@/components/card/Ratings";
import Progress from "@/components/card/Progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, CheckCircle, XCircle, Wallet } from "lucide-react";
import styles from "./Dashboard.module.css"; 

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    let url = "";

    switch (timeframe) {
      case "weekly":
        url = ""; // API weekly sau
        break;
      case "yearly":
        url = "https://67b847da699a8a7baef3677f.mockapi.io/yearly";
        break;
      default:
        url = "https://67b847da699a8a7baef3677f.mockapi.io/monthly";
    }

    if (!url) {
      setData([]); 
      setLoading(false);
      return;
    }

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

  return (
    <div className={styles.container}>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Pending Claims" value={30} icon={<TrendingUp />} type="warning" />
        <SummaryCard title="Approved Claims" value={50} icon={<CheckCircle />} type="success" />
        <SummaryCard title="Rejected Claims" value={10} icon={<XCircle />} type="error" />
        <SummaryCard title="Paid" value={15} icon={<Wallet />} type="primary" />
      </div>

      <div className="mb-6">
        <RecentClaims />
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>📊 Claim Status Overview</h2>
          <select 
            className={styles.select} 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis /> 
              <Tooltip />
              <Line type="monotone" dataKey="pending" stroke="#FFA500" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="approved" stroke="#00C853" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rejected" stroke="#D50000" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="mb-6">
        < Ratings />
      </div>

      <div className="mb-6">
        <h3>Progress Project Overview</h3>
        <Progress value={10} type="base" />
        <Progress value={50} type="title" label="Progress Title" />
        <Progress value={70} type="top-floating" label="Top floating label" /> 
        <Progress value={30} type="trailing" label="Trailing Label" />

      </div>

    </div>
  );
};

export default Dashboard;
