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
  currentPage,
  limit,
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
    >
      <hr />
      <div className={styles.containerProject}>
        <p>
          Project ID:{" "}
          <span className={styles.boldText}> {claimDetail?.project_id}</span>{" "}
        </p>
        <p>
          Project Name:{" "}
          <span className={styles.boldText}>
            {claimDetail?.project?.project_name}
          </span>
        </p>
      </div>
      <div className={styles.containerRequest}>
        <div className={styles.timeDuration}>
          <p>Time Duration:</p>
          <h4>
            <span className={styles.boldText}>
              {formatDateToMonthDay(`${claimDetail?.start_date}`)}
            </span>{" "}
            <MoveRight size={20} className={styles.iconMoveRight} />{" "}
            <span className={styles.boldText}>
              {formatDateToMonthDay(`${claimDetail?.end_date}`)}
            </span>
          </h4>
        </div>
        <p>
          Submitted Date:{"   "}
          <span className={styles.boldText}>
            {formatDateToMonthDay(`${claimDetail?.submitted_date}`)}
          </span>
        </p>
        {/* <p>
          Approved Date:{"   "}
          <span className={styles.boldText}>
            {formatDateToMonthDay(`${claimDetail?.approved_date}`)}
          </span>
        </p> */}
        <p>
          Total Working Hours:{" "}
          <span className={styles.boldText}>
            {claimDetail?.total_hours} hours
          </span>
        </p>
        <p>
          Status:{" "}
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
    </Modal>
  );
};

export default UserClaimDetailsModal;
