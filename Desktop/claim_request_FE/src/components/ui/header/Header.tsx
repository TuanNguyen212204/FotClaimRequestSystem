import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import Badge from "@components/ui/Badge";
import fptlogo from "@assets/fot.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsAsync,

} from "@/redux/thunk/notification/notificationThunk";

const Header: React.FC = () => {
  const [role, setRole] = useState<string>();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  
  const notifications = useSelector((state: any) => state.notifications);
  
  useEffect(() => {
    const record = Number(localStorage.getItem("role_id"));
    switch (record) {
      case 1:
        setRole("Admin");
        break;
      case 2:
        setRole("Approver");
        break;
      case 3:
        setRole("Finance");
        break;
      case 4:
        setRole("User");
        break;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchNotificationsAsync() as any);
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  return (
    <>
      <header className={styles.header}>
        <div>
          <img src={fptlogo} alt="logo" className={styles.logoImage} />
        </div>
        <div className={styles.rightSection}>
          <SearchBar />
          <div>
            <Badge count={notifications.notifications?.filter((n: any) => !n.isRead).length}>
              <FaBell className={styles.icon} onClick={toggleDropdown} />
            </Badge>
          </div>
          <FaUserCircle className={styles.icon} onClick={() => navigate(PATH.userInfo)} />
          <span className={styles.username}>{username}</span>
        </div>
      </header>
      {dropdownVisible && (
        <div className={styles.dropdown}>
          <div className={styles.markAll} onClick={()=>{}}>
            Đánh dấu tất cả là đã xem
          </div>
          {notifications.notifications?.map((notification: any) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${notification.isRead ? styles.read : styles.unread}`}
              // onClick={() => handleMarkAsRead(notification.id)}
            >
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <span className={styles.timestamp}>
                {new Date(notification.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;