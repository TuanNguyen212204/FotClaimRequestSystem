import { useEffect, useState } from "react";
import { message, Spin, Button } from "antd";
import { IdCard ,User, Mail, Flame, Briefcase, DollarSign, CheckCircle, XCircle } from "lucide-react";
import httpClient from "@/constant/apiInstance";
import styles from "./StaffInformation.module.css";

interface Staff {
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  job_rank: string;
  salary?: string;
  user_status?: number;
  role_name?: string;
}

interface StaffDetailProps {
  isOpen: boolean;
  onClose: () => void;
  staff?: string;
  loading: boolean;
}

const StaffDetail = ({ isOpen, onClose, staff, loading }: StaffDetailProps) => {
  const [staffInfo, setStaffInfo] = useState<Staff | null>(null);

  useEffect(() => {
    if (staff) {
      fetchStaffData();
    }
  }, [staff]);

  const fetchStaffData = async () => {
    if (!staff) {
      console.warn("Staff ID is missing!");
      return;
    }
    try {
      const response = await httpClient.get<{ data: Staff[] }>(`/admin/staff/${staff}`);
      if (response.data && response.data.data.length > 0) {
        setStaffInfo(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
      message.error("Failed to fetch staff data.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Staff Details</h2>
        </div>
        {loading || !staffInfo ? (
          <Spin size="large" />
        ) : (
          <div className={styles.staffDetails}>
            <p><IdCard /> <strong>User ID:</strong> {staffInfo.user_id}</p>
            <p><User /> <strong>Full Name:</strong> {staffInfo.full_name}</p>
            <p><Mail /> <strong>Email:</strong> {staffInfo.email}</p>
            <p><Flame /> <strong>Department:</strong> {staffInfo.department}</p>
            <p><Briefcase /> <strong>Job Rank:</strong> {staffInfo.job_rank}</p>
            <p><DollarSign /> <strong>Salary:</strong> {staffInfo.salary || "N/A"}</p>
            <p>
              {staffInfo.user_status === 1 ? <CheckCircle color="green" /> : <XCircle color="red" />} 
              <strong>User Status:</strong> {staffInfo.user_status === 1 ? "Active" : "Inactive"}
            </p>
            <p><Briefcase /> <strong>Role Name:</strong> {staffInfo.role_name || "N/A"}</p>
          </div>
        )}
        <Button type="primary" danger className={styles.cancelButton} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default StaffDetail;
