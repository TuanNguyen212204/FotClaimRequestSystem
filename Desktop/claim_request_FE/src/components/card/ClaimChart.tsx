import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import httpClient from "@/constant/apiInstance";
import styles from "./ClaimChart.module.css";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const statuses = ["PENDING", "APPROVED", "REJECTED", "PAID"];
const colors = ["#8884d8", "#82ca9d", "#ff7300", "#00c49f"];

const ClaimChart = () => {
  const [rawData, setRawData] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({ PENDING: true, APPROVED: true, REJECTED: true, PAID: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get("/admin/claims-by-status");
        if (response.data?.data?.result) {
          const formattedData = response.data.data.result.map((item) => ({
            month: monthNames[item.month - 1],
            PENDING: item.data.PENDING || 0,
            APPROVED: item.data.APPROVED || 0,
            REJECTED: item.data.REJECTED || 0,
            PAID: item.data.PAID || 0,
          }));
          setRawData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredData = () => {
    const header = ["Month", ...statuses.filter((s) => visibleSeries[s])];
    const body = rawData.map((item) => [item.month, ...statuses.filter((s) => visibleSeries[s]).map((s) => item[s])]);
    return [header, ...body];
  };

  const toggleSeries = (status) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [status]: !prev[status], 
    }));
  };

  if (loading) return <p className={styles.loading}>Loading data...</p>;

  return (
    <div className={styles.chartContainer}>
      <p className={styles.chartTitle}>Claim Status Overview</p>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={getFilteredData()}
        options={{
          chartArea: { width: "70%" },
          // hAxis: { title: "Months", minValue: 0 },
          vAxis: { title: "Claims", minValue: 0 },
          legend: { position: "none" }, 
          colors: colors.filter((_, i) => visibleSeries[statuses[i]]),
        }}
      />
      <div className={styles.legendContainer}>
        {statuses.map((status, index) => (
          <span
            key={status}
            className={`${styles.legendItem} ${visibleSeries[status] ? "" : styles.inactive}`}
            onClick={() => toggleSeries(status)}
            style={{ color: colors[index], cursor: "pointer" }}
          >
            ⬤ {status}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ClaimChart;
