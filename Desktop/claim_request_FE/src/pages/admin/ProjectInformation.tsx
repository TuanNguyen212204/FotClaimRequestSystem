import { useEffect, useState } from "react";
import { message, Spin, Tooltip } from "antd";
import { FilePen } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import TableComponent from "@/components/ui/Table/Table";
import styles from "./ProjectInformation.module.css";

interface ProjectData {
  key: string;
  index: number;
  projectName: string;
  projectCode: string;
  duration: string;
  role: string;
}

const ProjectInformation = () => {
  const [dataSource, setDataSource] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/");
      if (Array.isArray(data?.data)) {
        const formattedData = data.data.map((item: any, index: number) => ({
          key: item.project_id || `row-${index}`,
          index: index + 1,
          projectName: item.project_name ?? "N/A",
          projectCode: item.project_id ?? "N/A",
          duration:
            item.start_date && item.end_date
              ? `${item.start_date.split("T")[0]} - ${item.end_date.split("T")[0]}`
              : "N/A",
          role: item.project_status === 1 ? "Active" : "Completed",
        }));
        setDataSource(formattedData);
      } else {
        message.error("Invalid API response format.");
      }
    } catch (error) {
      message.error("Error fetching project data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record: ProjectData) => {
    console.log("Edit project:", record);
  };

  const columns = [
    { dataIndex: "index", title: "STT" },
    { dataIndex: "projectName", title: "Project Name" },
    { dataIndex: "projectCode", title: "Project Code" },
    { dataIndex: "duration", title: "Duration" },
    { dataIndex: "role", title: "Role" },
    {
      key: "action",
      title: "Action",
      cell: ({ record }: { record: ProjectData }) => (
        <div className={styles.actions}>
          <Tooltip title="Edit">
            <FilePen className={styles.iconEdit} onClick={() => handleEdit(record)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h2>Project Information</h2>
      {loading ? <Spin size="large" /> : <TableComponent columns={columns} dataSource={dataSource} pagination />}
    </div>
  );
};

export default ProjectInformation;