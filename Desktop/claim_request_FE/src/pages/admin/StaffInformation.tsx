import { useEffect, useState } from "react";
import TableComponent, { Column, DataRecord } from "@components/common/Table";
import { FilePen, Trash } from "lucide-react";
import styles from "./StaffInformation.module.css"; 
import axios from "axios";
import { Space } from "antd";

interface StaffData extends DataRecord {
  id: string;
  staffName: string;
  department: string;
  jobRank: string;
  salary: string;
}

const StaffInformation = () => {
  const [dataSource, setDataSource] = useState<StaffData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu từ API Mock
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<StaffData[]>(
          "https://67b58a5b07ba6e59083d402d.mockapi.io/project/staff"
        );

        const formattedData = data.map((item, index) => ({
          ...item,
          key: item.id, // Đảm bảo có key
          index: index + 1,
        }));

        setDataSource(formattedData);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Xử lý Edit
  const handleEdit = (record: StaffData) => {
    console.log("Edit", record);
  };

  // Xử lý Delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await axios.delete(`https://67b58a5b07ba6e59083d402d.mockapi.io/project/staff/${id}`);
        setDataSource(prevData => prevData.filter(item => item.id !== id)); // Cập nhật UI
        console.log(`Deleted staff with ID: ${id}`);
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
  };

  // Cấu hình cột cho bảng Staff
  const columns = [
    { dataIndex: "index", title: "STT" },
    { dataIndex: "staffName", title: "Staff Name" },
    { dataIndex: "department", title: "Department" },
    { dataIndex: "jobRank", title: "Job Rank" },
    { dataIndex: "salary", title: "Salary" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: StaffData) => (
        <Space size="middle">
          <FilePen size={18} className={styles.editIcon} onClick={() => handleEdit(record)} />
          <Trash size={18} className={styles.deleteIcon} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Staff Information</h2>
      <TableComponent columns={columns} dataSource={dataSource} loading={loading} pagination />
    </div>
  );
};

export default StaffInformation;
