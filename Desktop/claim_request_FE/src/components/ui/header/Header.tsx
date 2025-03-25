import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import Badge from "@components/ui/Badge";
import fptlogo from "@assets/fot.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsAsync } from "@/redux/thunk/notification/notificationThunk";
import { io, Socket } from "socket.io-client";
import {
  addNotification,
  markAllAsRead,
} from "@/redux/slices/notification/notificationSlice";
import { User } from "@/types/User";

const Header: React.FC = () => {
  const [role, setRole] = useState<string>();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  const { notifications } = useSelector((state: any) => state.notifications);

  console.log(typeof notifications);
  console.log(notifications);

  const user_id = localStorage.getItem("user_id");

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n: any) => !n.is_read).length
    : 0;

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
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3001", {
        autoConnect: true,
        withCredentials: true,
      });
    }

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Socket connected successfully:", socket.id);
      if (user_id) {
        console.log("Emitting login event with user_id:", user_id);
        socket.emit("login", user_id);
      }
    });

    socket.on("notification", (notification) => {
      console.log("Received new notification:", notification);

      const notificationWithIsRead = {
        ...notification,
        is_read: false,
      };

      dispatch(addNotification(notificationWithIsRead));
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setTimeout(() => {
        if (socketRef.current) {
          console.log("Attempting to reconnect...");
          socketRef.current.connect();
        }
      }, 3000);
    });

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      console.log("Cleaning up socket connection");
      socket.off("connect");
      socket.off("notification");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("Notifications updated:", notifications);
  }, [notifications]);

  useEffect(() => {
    dispatch(fetchNotificationsAsync() as any);
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
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
            <Badge count={unreadCount}>
              <FaBell className={styles.icon} onClick={toggleDropdown} />
            </Badge>
          </div>
          <FaUserCircle
            className={styles.icon}
            onClick={() => navigate(PATH.userInfo)}
          />
          <span className={styles.username}>{username}</span>
        </div>
      </header>
      {dropdownVisible && (
        <div className={styles.dropdown}>
          <div className={styles.markAll} onClick={handleMarkAllAsRead}>
            Mark All As Read
          </div>
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications?.map((notification: any) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  notification.isRead ? styles.read : styles.unread
                }`}
              >
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <span className={styles.timestamp}>
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <div className={styles.emptyNotification}>
              No Notification
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
