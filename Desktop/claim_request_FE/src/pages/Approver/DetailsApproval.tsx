import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import {
  fetchPendingClaimDetailAsync,
  fetchAllPendingClaimAsync,
} from "@/redux/thunk/Claim/claimThunk";
import { selectAllDetailPending } from "@/redux/selector/pendingSelector";
import Modal from "@ui/modal/Modal";
import { MoveRight, Mail, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./DetailsApproval.module.css";
import StatusTag from "@/components/ui/StatusTag/StatusTag";
import { toast } from "react-toastify";
import httpClient from "@/constant/apiInstance.ts";
import { useTranslation } from "react-i18next";

const formatDateToMonthDay = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "long" });

  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  return `${month} ${getDayWithSuffix(day)}`;
};

interface PendingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  currentPage: string;
  limit: string;
}

export const DetailsApproval: React.FC<PendingDetailModalProps> = ({
  isOpen,
  onClose,
  requestId,
  currentPage,
  limit,
}) => {
  const { t } = useTranslation("details");
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectAllDetailPending);
  const [isChevronDown, setIsChevronDown] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && requestId) {
      document.body.style.overflow = "hidden";
      dispatch(
        fetchPendingClaimDetailAsync({
          page: currentPage,
          limit,
          request_id: requestId,
        }),
      );
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, requestId, currentPage, limit, dispatch]);

  const handleApproveClaimDetention = async (request_id: string) => {
    try {
      await httpClient.post(`/approvers/${request_id}/approve-claim`, {});
      dispatch(
        fetchAllPendingClaimAsync({
          page: currentPage.toString(),
          limit: limit.toString(),
        }),
      );
      toast.success(t("toast.success")); // Thêm key nếu cần
      onClose();
    } catch (error) {
      console.log("Error approving claim: ", error);
      toast.error(t("toast.error")); // Thêm key nếu cần
    }
  };

  const handleHistoryItems = () => {
    setIsChevronDown(!isChevronDown);
    const historyContainer = document.querySelector(`.${styles.history}`);
    if (historyContainer) {
      if (!isChevronDown) {
        historyContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        historyContainer.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={() => handleApproveClaimDetention(requestId)}
      buttonCancel={t("close_button")}
      buttonOk={t("approve_button")}
      title={t("claim_detail_title")}
      width={600}
      centered={false}
      position={{ right: 5, top: 23 }}
      backgroundColor="#f5f5f5"
      footerPosition="center"
      height="95%"
      okButtonProps={{ style: { backgroundColor: "#89AC46", color: "white" } }}
      className={styles.modal}
    >
      <hr className={styles.divider} />
      <div className={styles.modalContent}>
        <div className={styles.container}>
          <div className={styles.containerUser}>
            <img
              src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="User avatar"
              className={styles.avatar}
            />
            <p className={styles.username}>{claimDetail?.user.full_name}</p>
          </div>
          <div className={styles.emailContainer}>
            <Mail className={styles.emailIcon} />|
            <p className={styles.email}>{claimDetail?.user.email}</p>
          </div>
          <hr className={styles.divider} />
          <div className={styles.containerProject}>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>{t("project_id")}:</span>
              <span className={styles.projectValue}>
                {claimDetail?.project_id}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>{t("project_name")}:</span>
              <span className={styles.projectValue}>
                {claimDetail?.project_name}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>{t("time_duration")}:</span>
              <span className={styles.projectValue}>
                {formatDateToMonthDay(`${claimDetail?.start_date}`)}
                <MoveRight size={20} className={styles.iconMoveRight} />
                {formatDateToMonthDay(`${claimDetail?.end_date}`)}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>
                {t("submitted_date")}:
              </span>
              <span className={styles.projectValue}>
                {formatDateToMonthDay(`${claimDetail?.submitted_date}`)}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>{t("status")}:</span>
              <span className={styles.projectValue}>
                {claimDetail?.claim_status ? (
                  <StatusTag
                    status={
                      claimDetail.claim_status as
                        | "PENDING"
                        | "APPROVED"
                        | "REJECTED"
                        | "PAID"
                    }
                  />
                ) : (
                  "-"
                )}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>
                {t("total_working_hours")}:
              </span>
              <span className={styles.projectValue}>
                {claimDetail?.total_hours} {t("hours")}
              </span>
            </div>
          </div>
          <div className={styles.containerHistory}>
            {claimDetail?.claim_details &&
            claimDetail.claim_details.length > 0 ? (
              <div className={styles.history}>
                <div className={styles.historyHeader}>
                  <p>{t("history")}</p>
                  {isChevronDown ? (
                    <ChevronUp
                      className={styles.historyIcon}
                      onClick={handleHistoryItems}
                    />
                  ) : (
                    <ChevronDown
                      className={styles.historyIcon}
                      onClick={handleHistoryItems}
                    />
                  )}
                </div>
                {isChevronDown
                  ? claimDetail.claim_details.map((detail, index) => (
                      <div key={index} className={styles.historyItem}>
                        <span className={styles.historyItemDate}>
                          {formatDateToMonthDay(detail.date)}
                        </span>
                        <div className={styles.historyItemInfo}>
                          <div className={styles.historyItemRow}>
                            <span className={styles.historyItemLabel}>
                              {t("working_hours")}:
                            </span>
                            <span className={styles.historyItemValue}>
                              {detail.working_hours} {t("hours")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};
