import React, { useEffect } from "react";
import styles from "@components/ui/Notification/Notification.module.css";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  return (
    <div className={styles.notificationContainer}>
      <div
        className={`${styles.notification} ${styles[`notification-${type}`]} ${
          styles.fadeOut
        }`}
        onAnimationEnd={onClose}
      >
        <span className={styles.notificationContent}>
          <p>{message}</p>
        </span>
        <button onClick={onClose} className={styles.closeButton}>
          x
        </button>
      </div>
    </div>
  );
};

export default Notification;