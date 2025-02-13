import React from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";

const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      {/* <div className={styles.leftSection}>
      </div> */}
      <div className={styles.rightSection}>
        <SearchBar />
        <FaBell className={styles.icon} />
        <FaUserCircle className={styles.icon} onClick={() => {
          navigate(PATH.userinfo)
        }} />
        <span className={styles.username}>Administrator</span>
      </div>
    </header>
  );
};

export default Header;
