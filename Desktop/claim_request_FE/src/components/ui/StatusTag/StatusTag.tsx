import React from "react";
import styles from "./StatusTag.module.css";
import { useTranslation } from "react-i18next";

export type StatusType = "PENDING" | "APPROVED" | "REJECTED" | "PAID" | "DRAFT";

interface StatusTagProps {
  status: StatusType;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const { t } = useTranslation("userClaims");

  const statusClasses = {
    PENDING: styles.pending,
    APPROVED: styles.approved,
    REJECTED: styles.rejected,
    PAID: styles.paid,
    DRAFT: styles.draft,
  };

  const statusLabels = {
    PENDING: t("status_pending"),
    APPROVED: t("status_approved"),
    REJECTED: t("status_rejected"),
    PAID: t("status_paid"),
    DRAFT: t("status_draft"),
  };

  return (
    <span className={`${styles.statusTagContainer} ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

export default StatusTag;
