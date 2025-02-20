import { useEffect, useState } from "react";
import TableComponent, { Column, DataRecord } from "@components/common/Table";
import { FilePen, Trash } from "lucide-react";
import styles from "./ProjectInformation.module.css";
import axios from "axios";
import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ProjectData extends DataRecord {
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
        <FilePen size={18} className={styles.editIcon} onClick={() => console.log("Edit", record)} />
        <Trash size={18} className={styles.deleteIcon} onClick={() => console.log("Delete", record)} />
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
        const { data } = await axios.get(
          "https://67b58a5b07ba6e59083d402d.mockapi.io/project/project"
        );

        const formattedData = data.map((item: any, index: number) => ({
          key: item.id || `row-${index}`,
          index: index + 1,
          projectName: item.projectName ?? "N/A",
          projectCode: item.projectCode ?? "N/A",
          duration: item.duration ?? "Unknown",
          role: item.role ?? "Not Assigned",
        }));

        setDataSource(formattedData);
      } catch (error) {
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
      <TableComponent columns={columns} dataSource={dataSource} loading={loading} pagination />
    </div>
  );
};

export default ProjectInformation;
