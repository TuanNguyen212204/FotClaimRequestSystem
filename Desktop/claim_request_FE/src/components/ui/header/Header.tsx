import React, { useEffect } from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import Badge from "@components/ui/Badge";
import fptlogo from "@assets/fot.png";
import { useState } from "react";
const Header: React.FC = () => {
  const [role, setRole] = useState<string>();
  const username = localStorage.getItem("username");
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
      <div>
        <img src={fptlogo} alt="logo" className={styles.logoImage} />
      </div>
      <div className={styles.rightSection}>
        <div>
          <SearchBar />
        </div>
        <div>
          <Badge count={100}>
            <FaBell className={styles.icon} />
          </Badge>
        </div>
        <div>
          <FaUserCircle
            className={styles.icon}
            onClick={() => {
              navigate(PATH.userInfo);
            }}
          />
        </div>
        <span className={styles.username}>{username}</span>
      </div>
    </header>
  );
};

export default Header;
