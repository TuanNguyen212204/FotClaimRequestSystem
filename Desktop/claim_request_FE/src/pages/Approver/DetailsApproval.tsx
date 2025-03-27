import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import {
  fetchPendingClaimDetailAsync,
  fetchAllPendingClaimAsync,
} from "@/redux/thunk/Claim/claimThunk";
import { selectAllDetailPending } from "@/redux/selector/pendingSelector";
import Modal from "@ui/modal/Modal";
import { MoveRight, Mail, ChevronDown } from "lucide-react";
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
  const [isChevronDown, setIsChevronDown] = useState<boolean>(false);

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

  const handleHistoryItems = () => {
    setIsChevronDown(!isChevronDown);
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

            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>Time Duration:</span>
              <span className={styles.projectValue}>
                {formatDateToMonthDay(`${claimDetail?.start_date}`)}
                <MoveRight size={20} className={styles.iconMoveRight} />
                {formatDateToMonthDay(`${claimDetail?.end_date}`)}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>Submitted Date:</span>
              <span className={styles.projectValue}>
                {formatDateToMonthDay(`${claimDetail?.submitted_date}`)}
              </span>
            </div>
            <div className={styles.projectRow}>
              <span className={styles.projectLabel}>Status:</span>
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
              <span className={styles.projectLabel}>Total Working Hours:</span>
              <span className={styles.projectValue}>
                {claimDetail?.total_hours} hours
              </span>
            </div>
          </div>
          <div className={styles.containerHistory}>
            {claimDetail?.claim_details &&
              claimDetail.claim_details.length > 0 ? (
              <div className={styles.history}>
                <p>History</p>
                {claimDetail.claim_details.map((detail, index) => (
                  <div key={index} className={styles.historyItem}>
                    <span className={styles.historyItemDate}>
                      {formatDateToMonthDay(detail.date)}
                    </span>

                    <div className={styles.historyItemInfo}>
                      <div className={styles.historyItemRow}>
                        <span className={styles.historyItemLabel}>
                          Working Hours:
                        </span>
                        <span className={styles.historyItemValue}>
                          {detail.working_hours} hours
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};
