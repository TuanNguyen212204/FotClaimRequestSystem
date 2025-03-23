import React from "react";
import styles from "./StatusTag.module.css";

export type StatusType = "pending" | "approved" | "rejected" | "paid";

interface StatusTagProps {
  status: StatusType;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const statusClasses = {
    pending: styles.pending,
    approved: styles.approved,
    rejected: styles.rejected,
    paid: styles.paid,
  };

  return (
    <span className={`${styles.statusTagContainer} ${statusClasses[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusTag;
