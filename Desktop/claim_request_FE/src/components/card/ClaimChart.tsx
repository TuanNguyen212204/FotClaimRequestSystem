import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import httpClient from "@/constant/apiInstance";
import styles from "./ClaimChart.module.css";
import { useTranslation } from "react-i18next";

const colors = ["#8884d8", "#82ca9d", "#ff7300", "#00c49f"];

const ClaimChart = () => {
  const { t } = useTranslation("dashboard");

  const monthNames = [
    t("dashboard.claimChart.months.january"),
    t("dashboard.claimChart.months.february"),
    t("dashboard.claimChart.months.march"),
    t("dashboard.claimChart.months.april"),
    t("dashboard.claimChart.months.may"),
    t("dashboard.claimChart.months.june"),
    t("dashboard.claimChart.months.july"),
    t("dashboard.claimChart.months.august"),
    t("dashboard.claimChart.months.september"),
    t("dashboard.claimChart.months.october"),
    t("dashboard.claimChart.months.november"),
    t("dashboard.claimChart.months.december"),
  ];

  const statuses = ["PENDING", "APPROVED", "REJECTED", "PAID"];

  const [rawData, setRawData] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({
    PENDING: true,
    APPROVED: true,
    REJECTED: true,
    PAID: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get("/admin/claims-by-status");
        if (response.data?.data.result) {
          const formattedData = response.data.data.result.map((item) => ({
            month: monthNames[item.month - 1],
            PENDING: item.data.PENDING || 0,
            APPROVED: item.data.APPROVED || 0,
            REJECTED: item.data.REJECTED || 0,
            PAID: item.data.PAID || 0,
          }));
          console.log("Formatted Data:", formattedData);
          console.log("Formatted Data2:", response.data.data.result);
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
    const body = rawData.map((item) => [
      item.month,
      ...statuses.filter((s) => visibleSeries[s]).map((s) => Number(item[s]) || 0),
    ]);
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
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={getFilteredData()}
        options={{
          title: "Claim Status Overview",
          chartArea: { width: "70%" },
          hAxis: { title: t("dashboard.claimChart.hAxis"), minValue: 0 },
          vAxis: { title: t("dashboard.claimChart.vAxis"), minValue: 0 },
          legend: { position: "none" },
          colors: colors.filter((_, i) => visibleSeries[statuses[i]]),
        }}
      />
      <div className={styles.legendContainer}>
        {statuses.map((status, index) => (
          <span
            key={status}
            className={`${styles.legendItem} ${
              visibleSeries[status] ? "" : styles.inactive
            }`}
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
