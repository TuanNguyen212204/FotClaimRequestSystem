import React, { useEffect } from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import Badge from "@components/ui/Badge";
import { useState } from "react";
const Header: React.FC = () => {
  const [role, setRole] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    const record = Number(localStorage.getItem("role_id"));
    if (record === 1) {
      setRole("Admin");
    } else if (record === 2) {
      setRole("Approver");
    } else if (record === 3) {
      setRole("Finance");
    } else if (record === 4) {
      setRole("User");
    }
  }, []);
  return (
    <header className={styles.header}>
      {/* <div className={styles.leftSection}>
      </div> */}
      <div className={styles.rightSection}>
        <SearchBar />
        <Badge count={100}>
          <FaBell className={styles.icon} />
        </Badge>
        <FaUserCircle
          className={styles.icon}
          onClick={() => {
            navigate(PATH.userInfo);
          }}
        />
        <span className={styles.username}>{role}</span>
      </div>
    </header>
  );
};

export default Header;
