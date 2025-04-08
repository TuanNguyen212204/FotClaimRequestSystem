import { useDispatch, useSelector } from "react-redux";
import styles from "./UserClaimDetail.module.css";
import { AppDispatch } from "@/redux";
import { selectMyClaimDetail } from "@/redux/selector/claimSelector";
import { useEffect } from "react";
import { fetchMyClaimDetailAsync } from "@/redux/thunk/Claim/claimThunk";
import Modal from "../modal/Modal";
import { MoveRight } from "lucide-react";
import StatusTag from "../StatusTag/StatusTag";
import { useTranslation } from "react-i18next";

const formatDateByLanguage = (date: string, language: string) => {
  console.log("Current language in formatDateByLanguage:", language); 
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0"); 
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); 
  const year = dateObj.getFullYear();

  return language === "vi"
    ? `${day}/${month}/${year}` 
    : `${month}/${day}/${year}`; 
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
  const { t, i18n } = useTranslation("userClaims");
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectMyClaimDetail);

  useEffect(() => {
    if (isOpen && requestID) {
      dispatch(fetchMyClaimDetailAsync(requestID));
    }
  }, [isOpen, requestID, dispatch]);

  console.log("i18n.language in component:", i18n.language);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={t("claim_details_title")}
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      backgroundColor="#E9ECEF"
    >
      <hr />
      <div className={styles.containerProject}>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>
            {t("project_id_detail_label")}
          </span>
          <span className={styles.projectValue}>
            {claimDetail?.project?.project_id || t("no_data")}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>
            {t("project_name_detail_label")}
          </span>
          <span className={styles.projectValue}>
            {claimDetail?.project?.project_name || t("no_data")}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>
            {t("time_duration_detail_label")}
          </span>
          <span className={styles.projectValue}>
            {claimDetail?.start_date && claimDetail?.end_date ? (
              <>
                {formatDateByLanguage(claimDetail.start_date, i18n.language)}
                <MoveRight size={20} className={styles.iconMoveRight} />
                {formatDateByLanguage(claimDetail.end_date, i18n.language)}
              </>
            ) : (
              t("no_data")
            )}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>
            {t("submitted_date_detail_label")}
          </span>
          <span className={styles.projectValue}>
            {claimDetail?.submitted_date
              ? formatDateByLanguage(claimDetail.submitted_date, i18n.language)
              : t("no_data")}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>
            {t("status_detail_label")}
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
            {t("total_working_hours_detail_label")}
          </span>
          <span className={styles.projectValue}>
            {claimDetail?.total_hours
              ? `${claimDetail.total_hours} ${t("hours_suffix")}`
              : t("no_data")}
          </span>
        </div>
      </div>
      <div className={styles.containerHistory}>
        {claimDetail?.claimDetailsWithSalaryOvertimePerDay &&
        claimDetail?.claimDetailsWithSalaryOvertimePerDay.length > 0 ? (
          <div className={styles.history}>
            <p>{t("history_title")}</p>
            {claimDetail?.claimDetailsWithSalaryOvertimePerDay.map(
              (detail, index) => (
                <div key={index} className={styles.historyItem}>
                  <span className={styles.historyItemDate}>
                    {formatDateByLanguage(detail.date, i18n.language)}
                  </span>
                  <div className={styles.historyItemInfo}>
                    <div className={styles.historyItemRow}>
                      <span className={styles.historyItemLabel}>
                        {t("working_hours_label")}
                      </span>
                      <span className={styles.historyItemValue}>
                        {detail.working_hours} {t("hours_suffix")}
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default UserClaimDetailsModal;
