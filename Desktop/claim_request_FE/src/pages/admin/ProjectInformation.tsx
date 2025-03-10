import { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { FilePen } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import type { ColumnsType } from "antd/es/table";

interface ProjectData {
  key: string;
  index: number;
  projectName: string;
  projectCode: string;
  duration: string;
  role: string;
}

const columns: ColumnsType<ProjectData> = [
  { title: "STT", dataIndex: "index", key: "index" },
  { title: "Project Name", dataIndex: "projectName", key: "projectName" },
  { title: "Project Code", dataIndex: "projectCode", key: "projectCode" },
  { title: "Duration", dataIndex: "duration", key: "duration" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <FilePen size={18} onClick={() => console.log("Edit", record)} />
      </Space>
    ),
  },
];

const ProjectInformation = () => {
  const [dataSource, setDataSource] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/");
        console.log("Fetched data:", data);

        if (Array.isArray(data?.data)) {
          const formattedData = data.data.map((item: any, index: number) => ({
            key: item.project_id || `row-${index}`,
            index: index + 1,
            projectName: item.project_name ?? "N/A",
            projectCode: item.project_id ?? "N/A",
            duration: item.start_date && item.end_date 
              ? `${item.start_date.split("T")[0]} - ${item.end_date.split("T")[0]}` 
              : "N/A",
            role: item.project_status === 1 ? "Active" : "Completed",
          }));
          
          setDataSource(formattedData);
        } else {
          console.warn("API response format is incorrect:", data);
        }
      } catch (error: any) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Project Information</h2>
      <Table columns={columns} dataSource={dataSource} loading={loading} pagination />
    </div>
  );
};

export default ProjectInformation;
