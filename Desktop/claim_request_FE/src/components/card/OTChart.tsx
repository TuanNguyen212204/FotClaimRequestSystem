import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import httpClient from "@/constant/apiInstance"; 

const OTChart = ({ data }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await httpClient.get("/projects?page=1&limit=20&sortBy=project_id&order=ASC");
        setProjects(response.data.data); 
        console.log("API Response:", response.data.data);
        
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const totalOT = data.reduce((sum, project) => sum + project.otHours, 0);
  const projectMap = projects.reduce((map, proj) => {
    map[proj.project_id] = proj.project_name;
    return map;
  }, {});
  console.log("Project Map:", projectMap);
  
  const chartData = [
    ["Project", "OT Percentage"],
    ...data
      .map((project) => [
        projectMap[project.project_id] || project.project_id, // Dùng tên project nếu có
        (project.otHours / totalOT) * 100,
      ])
      .sort((a, b) => b[1] - a[1]), // Sắp xếp theo % OT giảm dần
  ];

  const options = {
    title: "OT Percentage by Project",
    chartArea: { width: "60%" },
    hAxis: { title: "Percentage (%)", minValue: 0, maxValue: 100 },
    vAxis: { title: "Project" },
    legend: { position: "none" },
    colors: ["#34A853"],
  };

  return <Chart chartType="BarChart" width="100%" height="400px" data={chartData} options={options} />;
};

export default OTChart;
