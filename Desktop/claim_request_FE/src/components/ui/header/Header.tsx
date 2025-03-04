import React from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import Avatar from "@/components/common/Avatar/Avatar";
import { CircleUserRound } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* <div className={styles.leftSection}>
      </div> */}
      <div className={styles.rightSection}>
        <SearchBar />
        <FaBell className={styles.icon} />

        <div
          className={styles.icon}
          onClick={() => {
            navigate(PATH.userInfo);
          }}
        >
          <Avatar
            src="https://static-cse.canva.com/blob/1806764/1600w-_q--r1GW6_E.jpg"
            shape="circle"
            size={40}
          />
        </div>
        <span className={styles.username}>Administrator</span>
      </div>
    </header>
  );
};

export default Header;
