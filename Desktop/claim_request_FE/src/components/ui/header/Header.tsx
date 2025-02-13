import React from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* <div className={styles.leftSection}>
      </div> */}
      <div className={styles.rightSection}>
        <SearchBar />
        <FaBell className={styles.icon} />
        <FaUserCircle className={styles.icon} />
        <span className={styles.username}>Administrator</span>
      </div>
    </header>
  );
};

export default Header;
