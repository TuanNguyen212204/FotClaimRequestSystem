import { useEffect, useState } from "react";
import TableComponent, { Column, DataRecord } from "@/components/ui/Table/Table";
import { FilePen, Trash } from "lucide-react";
import styles from "./StaffInformation.module.css";
import axios from "axios";
import { Space, message, Spin } from "antd";

interface StaffData extends DataRecord {
  userID: string;
  fullName: string;
  email: string;
  department: string;
  jobRank: string;
  action?: React.ReactNode;
}

const StaffInformation = () => {
  const [dataSource, setDataSource] = useState<StaffData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); 
      const { data } = await axios.get("/api/v1/admin/staffs", {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });
  
      if (data.httpStatus === 200) {
        const formattedData = data.data.map((item: StaffData, index: number) => ({
          ...item,
          key: item.userID,
          index: index + 1,
          action: (
            <Space size="middle">
              <div className={styles.icon} onClick={() => handleEdit(item)}>
                <FilePen size={18} />
              </div>
              <div className={styles.icon} onClick={() => handleDelete(item.userID)}>
                <Trash size={18} />
              </div>
            </Space>
          ),
        }));
  
        setDataSource(formattedData);
      } else {
        message.error("Failed to fetch staff data.");
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            message.error("Unauthorized! Please log in again.");
            break;
          case 403:
            message.error("Access denied! You don't have permission.");
            break;
          case 500:
            message.error("Server error! Please try again later.");
            break;
          default:
            message.error("An error occurred! Please try again.");
        }
      } else {
        message.error("Network error! Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record: StaffData) => {
    console.log("Edit", record);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/v1/admin/staffs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setDataSource((prevData) => prevData.filter((item) => item.userID !== id));
        message.success(`Deleted staff with ID: ${id}`);
      } catch (error) {
        message.error("Error deleting staff! Try again.");
      }
    }
  };

  const columns: Column[] = [
    { dataIndex: "index", title: "STT" },
    { dataIndex: "fullName", title: "Full Name" },
    { dataIndex: "email", title: "Email" },
    { dataIndex: "department", title: "Department" },
    { dataIndex: "jobRank", title: "Job Rank" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      <h2>Staff Information</h2>
      {loading ? <Spin size="large" /> : <TableComponent columns={columns} dataSource={dataSource} pagination />}
    </div>
  );
};

export default StaffInformation;

//modifi ?