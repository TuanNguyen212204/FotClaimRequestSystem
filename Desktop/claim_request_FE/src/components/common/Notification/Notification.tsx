// src/components/common/Notification.tsx
import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';

interface NotificationItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // Thời gian tự động ẩn (ms), mặc định là 5000ms
  onClose?: () => void;
}

let notificationId = 0;

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 10000, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = () => {
    console.log("Adding notification:", { message, type, duration }); // Debug
    if (!message.trim()) return; // Ngăn thêm thông báo nếu message rỗng hoặc chỉ có khoảng trắng
    const newNotification: NotificationItem = {
      id: notificationId++,
      message,
      type,
      duration,
    };
    setNotifications(prev => [...prev, newNotification]);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    addNotification();
  }, [message, type, duration, onClose]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className={styles.notificationContainer}>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`${styles.notification} ${styles[`notification-${notif.type}`]} ${notif.duration ? styles.fadeOut : ''}`}
          onAnimationEnd={() => notif.duration && removeNotification(notif.id)}
        >
          <p>{notif.message}</p>
          <button
            onClick={() => removeNotification(notif.id)}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;