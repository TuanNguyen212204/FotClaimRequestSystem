import React, { useEffect, useState } from "react";
import styles from "../user/UserInfoComponent.module.css";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface StaffInfo {
  name: string;
  id: string;
  email: string;
  department: string;
}

export const UserInfoComponent: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<StaffInfo | null>(null);

  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await axios.get("");
  //       setUser(response.data);
  //     } catch (error) {
  //       toast.error(
  //         error.response?.data?.message || "Failed to fetch user data!"
  //       );
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUserInfo();
  //   }, []);
  const staffInfo: StaffInfo = {
    name: "Nguyễn Ngọc Tuấn",
    id: "SE123456",
    email: "obcxyz@rpt.vn",
    department: "Ho Chi Minh City",
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src="https://static-cse.canva.com/blob/1806764/1600w-_q--r1GW6_E.jpg"
          alt="Avatar"
          className={styles.avatar}
        />
        <button className={styles.editBtn}>✎ Edit Profile</button>
        <div className={styles.info}>
          <div className={styles.row}>
            <p>
              <span className={styles.icon}>👤</span>{" "}
              <strong>Staff Name:</strong> {staffInfo.name}
            </p>
            <p>
              <span className={styles.icon}>🆔</span> <strong>Staff ID:</strong>{" "}
              {staffInfo.id}
            </p>
          </div>
          <p>
            <span className={styles.icon}>📧</span>{" "}
            <strong>Staff Email:</strong> {staffInfo.email}
          </p>
          <p>
            <span className={styles.icon}>🏢</span>{" "}
            <strong>Staff Department:</strong> {staffInfo.department}
          </p>
        </div>
      </div>
    </div>
  );
};
