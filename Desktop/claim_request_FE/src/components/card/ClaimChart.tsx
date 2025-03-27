import { useState, useEffect } from "react";
import httpClient from "@/constant/apiInstance";

interface ClaimData {
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
    PAID: number;
    DRAFT?: number;
    APRROVED?: number; 
  }
  
  interface ApiResponse {
    data: {
      httpStatus: number;
      errorCode: number;
      result: { month: number; data: ClaimData }[];
    };
  }

  interface ChartData {
    month: string;
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
    PAID: number;
    DRAFT: number;
  }
  
  const ClaimChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await httpClient.get<ApiResponse>("admin/claims-by-status");
          const apiData = response?.data?.result || [];
  
          const formattedData: ChartData[] = apiData.map((item) => ({
            month: new Date(0, item.month - 1).toLocaleString("en", { month: "short" }),
            PENDING: item.data.PENDING || 0,
            APPROVED: (item.data.APPROVED || 0) + (item.data.APRROVED || 0), 
            REJECTED: item.data.REJECTED || 0,
            PAID: item.data.PAID || 0,
            DRAFT: item.data.DRAFT || 0,
          }));
  
          setChartData(formattedData);
        } catch (error) {
          console.error("API error:", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h2>Claim Status Overview</h2>
        <pre>{JSON.stringify(chartData, null, 2)}</pre>
      </div>
    );
  };
  
  export default ClaimChart;