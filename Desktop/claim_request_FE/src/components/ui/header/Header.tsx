import React from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import Badge from "@/components/ui/Badge";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* <div className={styles.leftSection}>
      </div> */}
      <div className={styles.rightSection}>
        <SearchBar />
        <Badge count={10}>
          <FaBell className={styles.icon} />
        </Badge>
        <FaUserCircle
          className={styles.icon}
          onClick={() => {
            navigate(PATH.userInfo);
          }}
        />
        <span className={styles.username}>Administrator</span>
      </div>
    </header>
  );
};

export default Header;
