import { useDispatch, useSelector } from "react-redux";
import styles from "./UserClaimDetail.module.css";
import { AppDispatch } from "@/redux";
import { selectMyClaimDetail } from "@/redux/selector/claimSelector";
import { useEffect } from "react";
import { fetchMyClaimDetailAsync } from "@/redux/thunk/Claim/claimThunk";
import Modal from "../modal/Modal";
import { MoveRight } from "lucide-react";
import StatusTag from "../StatusTag/StatusTag";

const formatDateToMonthDay = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "long" });

  // Thêm th, st, nd, rd cho ngày
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

interface UserClaimDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestID: string;
  currentPage: string;
  limit: string;
}

const UserClaimDetailsModal = ({
  isOpen,
  onClose,
  requestID,
}: UserClaimDetailsModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectMyClaimDetail);

  useEffect(() => {
    if (isOpen && requestID) {
      dispatch(fetchMyClaimDetailAsync(requestID));
    }
  }, [isOpen, requestID, dispatch]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Claim Details"
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      backgroundColor="#E9ECEF"
    >
      <hr />
      <div className={styles.containerProject}>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Project ID:</span>
          <span className={styles.projectValue}>
            {claimDetail?.project?.project_id}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Project Name:</span>
          <span className={styles.projectValue}>
            {claimDetail?.project?.project_name}
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
            {claimDetail?.submitted_date}
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
        {claimDetail?.claim_details && claimDetail?.claim_details.length > 0 ? (
          <div className={styles.history}>
            <p>History</p>
            {claimDetail?.claim_details.map((detail, index) => (
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
    </Modal>
  );
};

export default UserClaimDetailsModal;
