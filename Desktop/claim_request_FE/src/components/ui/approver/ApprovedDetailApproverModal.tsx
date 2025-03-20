import Modal from "@ui/modal/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchApprovedDetailApproverAsync } from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedDetailApprover } from "@/redux/selector/claimSelector";
import StatusTag from "@ui/StatusTag/StatusTag";
import styles from "@ui/finance/ApprovedDetailFinance.module.css";
import { MoveRight } from "lucide-react";
import httpClient from "@/constant/apiInstance";

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

interface ApprovedDetailApproverModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

const ApprovedDetailApproverModal = ({
  isOpen,
  onClose,
  requestId,
}: ApprovedDetailApproverModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectApprovedDetailApprover);

  useEffect(() => {
    if (isOpen && requestId) {
      console.log("Dispatching fetchApprovedDetailApproverAsync", requestId);
      dispatch(fetchApprovedDetailApproverAsync({ request_id: requestId }));
    }
  }, [isOpen, requestId]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Claim Detail 123"
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      footer={null}
      className={styles.modal}
    >
      <hr />
      <div className={styles.container}>
        <div className={styles.containerUser}>
          <div className={styles.infoUser1}>
            <img
              src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              title="avatar"
              className={styles.avatar}
            />
            <p>{claimDetail?.full_name}</p>
          </div>
          <div className={styles.infoUser2}>
            <p>User ID: {claimDetail?.user_id}</p>
            <p>Salary Overtime: {claimDetail?.salary_overtime}</p>
          </div>
        </div>
        <hr />
        <div className={styles.containerProject}>
          <p>
            Project ID:{" "}
            <span className={styles.boldText}> {claimDetail?.project_id}</span>{" "}
          </p>
          <p>
            Project Name:{" "}
            <span className={styles.boldText}>
              {claimDetail?.project.project_name}
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
          <p>
            Approved Date:{"   "}
            <span className={styles.boldText}>
              {formatDateToMonthDay(`${claimDetail?.approved_date}`)}
            </span>
          </p>
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
        <div>
          {claimDetail?.claimDetails && claimDetail.claimDetails.length > 0 ? (
            <div className={styles.history}>
              <h4>Claim History</h4>
              {claimDetail.claimDetails.map((detail, index) => (
                <div key={index} className={styles.historyItem}>
                  <span className={styles.boldText}>
                    {formatDateToMonthDay(detail.date)}
                  </span>
                  <p>
                    Working Hours:{" "}
                    <span className={styles.boldText}>
                      {detail.working_hours} hours
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ApprovedDetailApproverModal;
