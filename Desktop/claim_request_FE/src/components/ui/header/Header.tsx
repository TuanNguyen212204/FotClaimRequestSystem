import React from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import { Tooltip } from "../../common/Tooltip/Tooltip.tsx";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* <div className={styles.leftSection}>
      </div> */}
      <div className={styles.rightSection}>
        <SearchBar />
        <Tooltip text="Notifications" position="bottom">
          <FaBell className={styles.icon} />
        </Tooltip>
        <Tooltip text="User Info" position="bottom">
          <FaUserCircle
            className={styles.icon}
            onClick={() => {
              navigate(PATH.userInfo);
            }}
          />
        </Tooltip>
        <span className={styles.username}>Administrator</span>
      </div>
    </header>
  );
};

export default Header;
