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

// Mảng ánh xạ các tháng bằng tiếng Việt
const monthsVi = [
  "Tháng Một",
  "Tháng Hai",
  "Tháng Ba",
  "Tháng Tư",
  "Tháng Năm",
  "Tháng Sáu",
  "Tháng Bảy",
  "Tháng Tám",
  "Tháng Chín",
  "Tháng Mười",
  "Tháng Mười Một",
  "Tháng Mười Hai",
];

const formatDateToMonthDay = (date: string) => {
  const { i18n } = useTranslation("userClaims");
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();

  const month =
    i18n.language === "vi"
      ? monthsVi[monthIndex]
      : dateObj.toLocaleString("en-US", { month: "long" });

  const getDayWithSuffix = (day: number) => {
    if (i18n.language === "vi") {
      return day;
    }
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

  const formattedDay = getDayWithSuffix(day);
  return i18n.language === "vi"
    ? `${formattedDay} ${month}`
    : `${month} ${formattedDay}`;
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
  const { t } = useTranslation("userClaims");
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
                {formatDateToMonthDay(claimDetail.start_date)}
                <MoveRight size={20} className={styles.iconMoveRight} />
                {formatDateToMonthDay(claimDetail.end_date)}
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
            {claimDetail?.submitted_date || t("no_data")}
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
                    {formatDateToMonthDay(detail.date)}
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
              )
            )}
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default UserClaimDetailsModal;
