import { useEffect, useState } from "react";
import { message, Spin, Tooltip } from "antd";
import { ExternalLink, Trash } from "lucide-react";
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

const StaffInformation = () => {
  const [dataSource, setDataSource] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get<{ httpStatus: number; data: Staff[] }>("/admin/staffs");
      if (response.data.httpStatus === 200) {
        setDataSource(response.data.data);
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

  const handleEdit = async (record: string) => {
    console.log("Editing user:", record); 
    console.log("record: ", record);
    setSelectedStaff(record);  
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await httpClient.delete(`/admin/staffs/${id}`);
        setDataSource((prevData) => prevData.filter((item) => item.user_id !== id));
        message.success(`Deleted staff with ID: ${id}`);
      } catch (error) {
        message.error("Error deleting staff! Try again.");
      }
    }
  };

  const columns = [
    { dataIndex: "user_id", title: "User ID" },
    { dataIndex: "full_name", title: "Full Name" },
    { dataIndex: "email", title: "Email" },
    { dataIndex: "department", title: "Department" },
    { dataIndex: "job_rank", title: "Job Rank" },
    {
      key: "action",
      dataIndex: "user_id",
      title: "Action",
      cell: ({ record }: { record: Staff }) => {
        return (
          <div className={styles.actions}>
            <Tooltip title="Detail">
              <ExternalLink
                className={styles.iconApprove}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Trash
                className={styles.iconReject}
                onClick={() => handleDelete(record.user_id)}
              />
            </Tooltip>
          </div>
        );
      },
    }
  ];

  return (
    <div className={styles.container}>
      <h2>Staff Information</h2>
      {loading ? <Spin size="large" /> : <TableComponent columns={columns} dataSource={dataSource} pagination />}
      {isModalOpen && (
        <StaffDetails 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          staff={selectedStaff} 
          loading={loading} 
        />
      )}

    </div>
  );
};

export default StaffInformation;
