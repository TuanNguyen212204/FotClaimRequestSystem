import React from "react";
import styles from "./StatusTag.module.css";

type StatusType = "PENDING" | "APPROVED" | "REJECTED" | "PAID";

interface StatusTagProps {
  status: StatusType;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const statusClasses = {
    PENDING: styles.pending,
    APPROVED: styles.approved,
    REJECTED: styles.rejected,
    PAID: styles.paid,
  };

  return (
    <span className={`${styles.statusTagContainer} ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default StatusTag;
