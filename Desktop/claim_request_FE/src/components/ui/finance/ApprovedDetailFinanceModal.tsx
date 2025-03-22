import Modal, { confirmModal } from "@ui/modal/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import {
  fetchApprovedDetailFinanceAsync,
  fetchApprovedClaimsFinanceAsync,
} from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedDetailFinance } from "@/redux/selector/claimSelector";
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

interface ApprovedDetailFinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  currentPage: string;
  limit: string;
}

const ApprovedDetailFinanceModal = ({
  isOpen,
  onClose,
  requestId,
  currentPage,
  limit,
}: ApprovedDetailFinanceModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectApprovedDetailFinance);

  useEffect(() => {
    if (isOpen && requestId) {
      dispatch(fetchApprovedDetailFinanceAsync({ request_id: requestId }));
    }
  }, [isOpen, requestId]);

  const handleOnPrint = () => {
    // Xử lý logic in ở đây
    onClose();
  };

  const handleOnPay = async () => {
    try {
      const result = await confirmModal({
        title: "Confirm?",
        children: "Are you sure you want to proceed with the payment?",
        onOk() {
          return httpClient.put(`/finance/claims/paid/${requestId}`);
        },
        onCancel() {
          console.log("Payment cancelled");
        },
      });

      if (result) {
        await dispatch(
          fetchApprovedClaimsFinanceAsync({ page: currentPage, limit })
        );
        console.log("Payment successful");
        onClose();
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleOnPrint}
      onOk={handleOnPay}
      buttonCancel="Print"
      buttonOk="Pay"
      title="Claim Detail"
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
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
            <span className={styles.boldText}>{claimDetail?.project_name}</span>
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
          {claimDetail?.claim_details &&
          claimDetail.claim_details.length > 0 ? (
            <div className={styles.history}>
              <h4>Claim History</h4>
              {claimDetail.claim_details.map((detail, index) => (
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

export default ApprovedDetailFinanceModal;
