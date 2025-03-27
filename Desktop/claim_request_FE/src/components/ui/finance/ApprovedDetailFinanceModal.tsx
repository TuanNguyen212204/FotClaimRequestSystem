import Modal, { confirmModal } from "@ui/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import {
  fetchApprovedDetailFinanceAsync,
  fetchApprovedClaimsFinanceAsync,
} from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedDetailFinance } from "@/redux/selector/claimSelector";
import StatusTag from "@ui/StatusTag/StatusTag";
import styles from "@ui/finance/ApprovedDetailFinance.module.css";
import { MoveRight, ChevronDown } from "lucide-react";
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
  const [isChevronDown, setIsChevronDown] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (requestId) {
        dispatch(fetchApprovedDetailFinanceAsync({ request_id: requestId }));
        console.log("req", requestId);
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, requestId]);

  const handleOnPrint = async () => {
    const res = await httpClient.get(`/claims/export`);
    console.log("data nekkk: ", res.data);
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

  const handleHistoryItems = () => {
    setIsChevronDown(!isChevronDown);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      // onOk={handleOnPay}
      // buttonCancel="Print"
      buttonOk="Pay"
      title="Claim Detail"
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      backgroundColor="#E9ECEF"
      footerPosition="right"
      footer={
        <div className={styles.payButton}>
          <button onClick={handleOnPay}>Pay</button>
        </div>
      }
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
              <span>{claimDetail?.full_name}</span>
              <div className={styles.infoUser1Row2}>
                <span>{claimDetail?.job_rank_name}</span>
                <span className={styles.separator}>|</span>
                <span>{claimDetail?.department_name}</span>
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
              {claimDetail?.salary_overtime}
            </span>
          </div>
        </div>
        <div className={styles.containerHistory}>
          {claimDetail?.claim_details &&
          claimDetail.claim_details.length > 0 ? (
            <div className={styles.history}>
              <div className={styles.historyHeader}>
                <p>History</p>
                <ChevronDown
                  className={styles.historyIcon}
                  onClick={handleHistoryItems}
                />
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
                  ))
                : null}
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ApprovedDetailFinanceModal;
