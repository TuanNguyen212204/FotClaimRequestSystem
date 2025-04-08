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
import { useTranslation } from "react-i18next";


const formatDateByLanguage = (date: string, language: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0"); 
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); 
  const year = dateObj.getFullYear();

  return language === "vi"
    ? `${day}/${month}/${year}` 
    : `${month}/${day}/${year}`; 
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
  const { t, i18n } = useTranslation("approvedetail"); 
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
        title: t("approvedetail.modal.confirmTitle"),
        children: t("approvedetail.modal.confirmPay"),
        onOk() {
          return httpClient.put(`/finance/claims/paid/${requestId}`);
        },
        onCancel() {
          console.log("Payment cancelled");
        },
      });

      if (result) {
        await dispatch(
          fetchApprovedClaimsFinanceAsync({ page: currentPage, limit }),
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
      buttonOk={t("approvedetail.modal.pay")}
      title={t("approvedetail.title")}
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      backgroundColor="#E9ECEF"
      footerPosition="right"
      footer={
        <div className={styles.payButton}>
          <button onClick={handleOnPay}>{t("approvedetail.modal.pay")}</button>
        </div>
      }
    >
      <hr />
      <div className={styles.container}>
        <div className={styles.containerUser}>
          <div className={styles.infoUser1}>
            <img
              src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              title={t("approvedetail.user.avatar")}
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
            <p>
              {t("approvedetail.user.userId")}: {claimDetail?.user_id}
            </p>
          </div>
        </div>
        <hr />
        <div className={styles.containerProject}>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.project.projectId")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.project_id}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.project.projectName")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.project_name}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.claim.timeDuration")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.start_date
                ? formatDateByLanguage(claimDetail.start_date, i18n.language)
                : "N/A"}
              <MoveRight size={20} className={styles.iconMoveRight} />
              {claimDetail?.end_date
                ? formatDateByLanguage(claimDetail.end_date, i18n.language)
                : "N/A"}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.claim.submittedDate")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.submitted_date
                ? formatDateByLanguage(
                    claimDetail.submitted_date,
                    i18n.language,
                  )
                : "N/A"}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.claim.approvedDate")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.approved_date
                ? formatDateByLanguage(claimDetail.approved_date, i18n.language)
                : "N/A"}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.claim.status")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.claim_status ? (
                <StatusTag
                  status={
                    claimDetail.claim_status as
                      | "PENDING"
                      | "APPROVED"
                      | "REJECTED"
                      | "PAID"
                      | "DRAFT"
                  }
                />
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.claim.totalHours")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.total_hours} {t("approvedetail.claim.hours")}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("approvedetail.claim.salaryOvertime")}:
            </span>
            <span className={styles.projectValue}>
              {claimDetail?.salary_overtime}
            </span>
          </div>
        </div>
        <div className={styles.containerHistory}>
          {claimDetail?.claim_details &&
            claimDetail.claim_details.length > 0 && (
              <div className={styles.history}>
                <div className={styles.historyHeader}>
                  <p>{t("approvedetail.history.title")}</p>
                  <ChevronDown
                    className={styles.historyIcon}
                    onClick={handleHistoryItems}
                  />
                </div>
                {isChevronDown &&
                  claimDetail.claim_details.map((detail, index) => (
                    <div key={index} className={styles.historyItem}>
                      <span className={styles.historyItemDate}>
                        {formatDateByLanguage(detail.date, i18n.language)}
                      </span>
                      <div className={styles.historyItemInfo}>
                        <div className={styles.historyItemRow}>
                          <span className={styles.historyItemLabel}>
                            {t("approvedetail.history.workingHours")}:
                          </span>
                          <span className={styles.historyItemValue}>
                            {detail.working_hours}{" "}
                            {t("approvedetail.claim.hours")}
                          </span>
                        </div>
                        <div className={styles.historyItemRow}>
                          <span className={styles.historyItemLabel}>
                            {t("approvedetail.history.overtimeSalary")}:
                          </span>
                          <span className={styles.historyItemValue}>
                            ${detail.salaryOvertimePerDay}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </Modal>
  );
};

export default ApprovedDetailFinanceModal;
