import { useEffect, useState } from "react";
import { Table, Space, message, Spin } from "antd";
import { FilePen, Trash } from "lucide-react";
import axios from "axios";
import styles from "./StaffInformation.module.css";
import StaffDetails from "./StaffDetail";

const StaffInformation = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("https://claimsystem.info.vn/api/v1/admin/staffs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.httpStatus === 200) {
        setDataSource(
          data.data.map((item: any, index: number) => ({
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
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`https://claimsystem.info.vn/api/v1/admin/staff/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        const token = localStorage.getItem("token");
        await axios.delete(`https://claimsystem.info.vn/api/v1/admin/staffs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
      {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={dataSource} pagination />}

      <StaffDetails isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} staff={selectedStaff} loading={loading} />
    </div>
  );
};

export default StaffInformation;
