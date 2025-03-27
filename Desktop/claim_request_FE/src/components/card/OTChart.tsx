import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import httpClient from "@/constant/apiInstance";

const OTChart: React.FC = () => {
  const [chartData, setChartData] = useState<[string, number][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get("admin/top-projects");
        if (response.data && Array.isArray(response.data.data)) {
          const formattedData: [string, number][] = response.data.data.map((item) => [
            item.project_name,
            item.claim_count,
          ]);
          setChartData([["Project", "Claims"], ...formattedData]);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={chartData}
        options={{
          title: "Top Projects by Claim Count",
          legend: { position: "none" },
          chartArea: { width: "80%", height: "70%" },
          backgroundColor: "transparent",
          hAxis: { title: "Project Name" },
          vAxis: { title: "Claim Count" },
          colors: ["#233754"],
        }}
      />
    </div>
  );
};

export default OTChart;