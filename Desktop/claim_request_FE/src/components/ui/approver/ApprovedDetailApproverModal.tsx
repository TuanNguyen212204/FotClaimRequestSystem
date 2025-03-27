import Modal from "@ui/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchApprovedDetailApproverAsync } from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedDetailApprover } from "@/redux/selector/claimSelector";
import StatusTag from "@ui/StatusTag/StatusTag";
import styles from "@ui/finance/ApprovedDetailFinance.module.css";
import { ChevronDown, MoveRight } from "lucide-react";
import { fetchUserInformationAsync } from "@/redux/thunk/UserInfo/userInfoThunks";
import { selectUserInformation } from "@/redux/selector/UserInfoSelector";

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
  userId: string;
}

const ApprovedDetailApproverModal = ({
  isOpen,
  onClose,
  requestId,
  userId,
}: ApprovedDetailApproverModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectApprovedDetailApprover);
  const userInfo = useSelector(selectUserInformation);
  const [isChevronDown, setIsChevronDown] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (requestId) {
        dispatch(fetchApprovedDetailApproverAsync({ request_id: requestId }));
        console.log("req", requestId, userId);
      }

      if (userId) {
        dispatch(fetchUserInformationAsync({ user_id: userId }));
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, requestId]);

  const handleHistoryItems = () => {
    setIsChevronDown(!isChevronDown);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Claim Detail 123"
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      footer={<div></div>}
      backgroundColor="#E9ECEF"
      // className={styles.modal}
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
            <div className={styles.infoUser1Row}>
              <span>{userInfo?.full_name}</span>
              <div className={styles.infoUser1Row2}>
                <span>{userInfo?.job_rank}</span>
                <span className={styles.separator}>|</span>
                <span>{userInfo?.department}</span>
              </div>
            </div>
          </div>
          <div className={styles.infoUser2}>
            <p>User ID: {claimDetail?.user_id}</p>
          </div>
        </div>
        <hr />
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
              {claimDetail?.project.project_name}
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
            <span className={styles.projectLabel}>Approved Date:</span>
            <span className={styles.projectValue}>
              {formatDateToMonthDay(`${claimDetail?.approved_date}`)}
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
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Salary Overtime:</span>
            <span className={styles.projectValue}>
              {claimDetail?.totalOvertimeSalary}
            </span>
          </div>
        </div>
        <div className={styles.containerHistory}>
          {claimDetail?.claimDetailsWithSalaryOvertimePerDay &&
          claimDetail.claimDetailsWithSalaryOvertimePerDay.length > 0 ? (
            <div className={styles.history}>
              <div className={styles.historyHeader}>
                <p>History</p>
                <ChevronDown
                  className={styles.historyIcon}
                  onClick={handleHistoryItems}
                />
              </div>
              {isChevronDown
                ? claimDetail.claimDetailsWithSalaryOvertimePerDay.map(
                    (detail, index) => (
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
                          <div className={styles.historyItemRow}>
                            <span className={styles.historyItemLabel}>
                              Overtime Salary:
                            </span>
                            <span className={styles.historyItemValue}>
                              ${detail.salaryOvertimePerDay}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )
                : null}
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ApprovedDetailApproverModal;
