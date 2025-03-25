import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import {
  fetchPendingClaimDetailAsync,
  fetchAllPendingClaimAsync,
} from "@/redux/thunk/Claim/claimThunk";
import { selectAllDetailPending } from "@/redux/selector/pendingSelector";
import Modal from "@ui/modal/Modal";
import { MoveRight, Mail } from "lucide-react";
import styles from "./DetailsApproval.module.css";
import StatusTag from "@/components/ui/StatusTag/StatusTag";
import { toast } from "react-toastify";
import httpClient from "@/constant/apiInstance.ts";

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
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectAllDetailPending);

  useEffect(() => {
    if (isOpen && requestId) {
      dispatch(
        fetchPendingClaimDetailAsync({
          page: currentPage,
          limit,
          request_id: requestId,
        })
      );
    }
  }, [isOpen, requestId, currentPage, limit, dispatch]);

  const handleApproveClaimDetention = async (request_id: string) => {
    try {
      await httpClient.post(`/approvers/${request_id}/approve-claim`, {});
      dispatch(
        fetchAllPendingClaimAsync({
          page: currentPage.toString(),
          limit: limit.toString(),
        })
      );
      toast.success("Claim approved successfully!");
      onClose();
    } catch (error) {
      console.log("Error approving claim: ", error);
      toast.error("Failed to approve claim.");
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={() => handleApproveClaimDetention(requestId)}
      buttonCancel="Close"
      buttonOk="Approve"
      title="Claim Detail"
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      backgroundColor="#f5f5f5"
      footerPosition="center"
      height="95%"
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
              <span className={styles.projectLabel}>Project ID:</span>
              <span className={styles.projectValue}>
                {claimDetail?.project_id}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>Project Name:</span>
              <span className={styles.projectValue}>
                {claimDetail?.project_name}
              </span>
            </div>
            <div>
              <div className={styles.timeDuration}>
                <p>
                  <strong>Time Duration:</strong>
                </p>
                <h4>
                  <span>
                    {formatDateToMonthDay(`${claimDetail?.start_date}`)}
                  </span>
                  <MoveRight size={20} className={styles.iconMoveRight} />
                  <span>
                    {formatDateToMonthDay(`${claimDetail?.end_date}`)}
                  </span>
                </h4>
              </div>
              <p>
                <strong>Submitted Date:</strong>
                <span>
                  {formatDateToMonthDay(`${claimDetail?.submitted_date}`)}
                </span>
              </p>
              <p>
                <strong>Total Working Hours:</strong>
                <span>{claimDetail?.total_hours} hours</span>
              </p>
              <p>
                <strong>Status:</strong>
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
              </p>
            </div>
          </div>
          {claimDetail?.claim_details &&
            claimDetail.claim_details.length > 0 && (
              <div className={styles.history}>
                <span style={{ fontWeight: "500", fontSize: "20px" }}>
                  Claim History
                </span>
                {claimDetail.claim_details.map((detail, index) => (
                  <div key={index} className={styles.historyItem}>
                    <p>
                      <strong>Date:</strong>
                      <span>{formatDateToMonthDay(detail.date)}</span>
                    </p>
                    <p>
                      <strong>Working Hours:</strong>
                      <span>{detail.working_hours} hours</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </Modal>
  );
};
