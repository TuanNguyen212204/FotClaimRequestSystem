import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.css";
import SearchBar from "../searchbar/SearchBar";
import {
  FaBell,
  FaUserCircle,
  FaEllipsisV,
  FaCheck,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import Badge from "@components/ui/Badge";
import fptlogo from "@assets/fot.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotificationAll,
  deleteNotificationById,
  fetchNotificationsAsync,
  markNotificationAllAsRead,
  markNotificationAsReadById,
} from "@/redux/thunk/notification/notificationThunk";
import { io, Socket } from "socket.io-client";
import {
  addNotification,
  updateMarkAsRead,
} from "@/redux/slices/notification/notificationSlice";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const Header: React.FC = () => {
  const [_, setRole] = useState<string>();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [optionsVisibleId, setOptionsVisibleId] = useState<number | null>(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);
  const user_id = localStorage.getItem("user_id");
  const notifications = useSelector(
    (state: any) => state.notifications?.notifications?.notifications
  );

  useEffect(() => {
    dispatch(fetchNotificationsAsync() as any);
  }, [dispatch]);

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
      socketRef.current = io("https://claimsystem.info.vn:3002", {
        autoConnect: true,
        withCredentials: true,
        transports: ["websocket", "polling"],
        path: "/socket.io/",
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });
    }

    const socket = socketRef.current;

    socket.on("connect", () => {
      if (user_id) {
        socket.emit("login", user_id);
      }
    });

    socket.on("notification", (notification) => {
      try {
        dispatch(addNotification(notification));
        toast.success("You have a new notification!");
      } catch (error) {
        console.error("Lỗi khi dispatch:", error);
      }
    });

    socket.on("broadcast", (notification) => {
      try {
        dispatch(addNotification(notification));
      } catch (error) {
        console.error("Lỗi khi dispatch:", error);
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", (_) => {
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
      socket.off("connect");
      socket.off("notification");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleMarkAllAsRead = async () => {
    await dispatch(markNotificationAllAsRead() as any);
    await dispatch(fetchNotificationsAsync() as any);
  };

  const handleMarkAsRead = async (id: number) => {
    console.log(id);
    await dispatch(updateMarkAsRead(id));
    await dispatch(markNotificationAsReadById(id) as any);
  };
  const handleDelete = async (id: number) => {
    console.log(id);
    await dispatch(deleteNotificationById(id) as any);
    await dispatch(fetchNotificationsAsync() as any);
  };

  const handleDeleteAllNoti = async () => {
    await dispatch(deleteNotificationAll() as any);
    await dispatch(fetchNotificationsAsync() as any);
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
          <LanguageSwitcher />
        </div>
      </header>
      {dropdownVisible && (
        <div className={styles.dropdown}>
          <div className={styles.top}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleMarkAllAsRead}
            >
              <FaCheck style={{ marginRight: 5 }} />
              Mark All As Read
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleDeleteAllNoti}
            >
              <FaTrash style={{ marginRight: 5 }} />
              Clear All
            </div>
          </div>
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  notification.is_read ? styles.read : styles.unread
                }`}
              >
                <strong>{notification.title}</strong>
                <div className={styles.headers}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaExclamationTriangle
                      style={{ marginRight: 5, fontSize: 14 }}
                    />
                    <span className={styles.noti}>Notification</span>
                  </div>
                  <span className={styles.timestamp}>
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
                <hr style={{ border: "0.3px solid #ccc" }} />
                <p>{notification.message}</p>
                <div
                  className={styles.circle}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionsVisibleId(
                      optionsVisibleId === notification.id
                        ? null
                        : notification.id
                    );
                  }}
                >
                  <FaEllipsisV className={styles.threeDots} />
                  <div
                    className={`${styles.options} ${
                      optionsVisibleId === notification.id
                        ? styles.showOptions
                        : ""
                    }`}
                  >
                    {!!notification.is_read === false ? (
                      <div
                        className={styles.option}
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <FaCheck />
                        <div style={{ marginLeft: 4 }}>Mark as Read</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div
                      className={styles.option}
                      style={{ display: "flex", alignItems: "center" }}
                      onClick={() => {
                        handleDelete(notification.id);
                      }}
                    >
                      <FaTrash />
                      <div style={{ marginLeft: 4 }}>Delete</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyNotification}>No Notification</div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
