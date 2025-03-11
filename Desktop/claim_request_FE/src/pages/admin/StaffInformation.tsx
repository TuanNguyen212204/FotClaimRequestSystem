import { useEffect, useState } from "react";
import { Space, message, Spin } from "antd";
import { FilePen, Trash } from "lucide-react";
import httpClient from "@/constant/apiInstance";
import styles from "./StaffInformation.module.css";
import StaffDetails from "./StaffDetail";
import TableComponent from "@/components/ui/Table/Table";

interface Staff {
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  job_rank: string;
}

interface StaffTableData {
  key: string;
  index: number;
  fullName: string;
  email: string;
  department: string;
  jobRank: string;
  action: JSX.Element;
}

const StaffInformation = () => {
  const [dataSource, setDataSource] = useState<StaffTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get<{ httpStatus: number; data: Staff[] }>("/admin/staffs");
      const { data } = response;

      if (data.httpStatus === 200) {
        setDataSource(
          data.data.map((item, index) => ({
            key: item.user_id,
            index: index + 1,
            fullName: item.full_name,
            email: item.email,
            department: item.department,
            jobRank: item.job_rank,
            action: (
              <Space size="middle">
                <div className={styles.icon} onClick={() => handleEdit(item.user_id)}>
                  <FilePen size={18} />
                </div>
                <div className={styles.icon} onClick={() => handleDelete(item.user_id)}>
                  <Trash size={18} />
                </div>
              </Space>
            ),
          }))
        );
      } else {
        message.error("Failed to fetch staff data.");
      }
    } catch (error) {
      message.error("An error occurred while fetching staff data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (userId: string) => {
    setIsModalOpen(true);
    setLoading(true);
    try {
      const response = await httpClient.get<{ httpStatus: number; data: Staff }>(`/admin/staff/${userId}`);
      const { data } = response;

      if (data.httpStatus === 200) {
        setSelectedStaff(data.data);
      } else {
        message.error("Failed to fetch staff details.");
      }
    } catch (error) {
      message.error("Error fetching staff details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await httpClient.delete(`/admin/staffs/${id}`);
        setDataSource((prevData) => prevData.filter((item) => item.key !== id));
        message.success(`Deleted staff with ID: ${id}`);
      } catch (error) {
        message.error("Error deleting staff! Try again.");
      }
    }
  };

  const columns = [
    { dataIndex: "index", title: "STT" },
    { dataIndex: "fullName", title: "Full Name" },
    { dataIndex: "email", title: "Email" },
    { dataIndex: "department", title: "Department" },
    { dataIndex: "jobRank", title: "Job Rank" },
    { title: "Action", dataIndex: "action", key: "action" },
  ];

  return (
    <div className={styles.container}>
      <h2>Staff Information</h2>
      {loading ? <Spin size="large" /> : <TableComponent columns={columns} dataSource={dataSource} pagination />}
      <StaffDetails isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} staff={selectedStaff} loading={loading} />
    </div>
  );
};

export default StaffInformation;
