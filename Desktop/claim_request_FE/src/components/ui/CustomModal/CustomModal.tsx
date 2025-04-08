import Modal, { confirmModal } from "@ui/modal/Modal";
import { useEffect, useState } from "react";
import styles from './CustomModal.module.css';
import { MoveRight, ChevronDown, Printer } from 'lucide-react';
import StatusTag from '../StatusTag/StatusTag';
import { useTranslation } from 'react-i18next';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  width?: number;
  height?: string;
  centered?: boolean;
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  backgroundColor?: string;
  data?: any;
  onPrint?: () => void;
}

const formatDateToMonthDay = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "long" });

  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  return `${month} ${getDayWithSuffix(day)}`;
};

const CustomModal = ({
  isOpen,
  onClose,
  onPrint,  
  data
}: CustomModalProps) => {
  const { t } = useTranslation('claimstatus');
  const [isChevronDown, setIsChevronDown] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleHistoryItems = () => {
    setIsChevronDown(!isChevronDown);
  };

  if (!isOpen || !data) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={t('title')}
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      backgroundColor="#E9ECEF"
      footerPosition="right"
      footer={
        <div className={styles.footer}>
          
          {onPrint && (
            <button onClick={onPrint} className={styles.printButton}>
              <Printer size={16} />
              <span>{t('print')}</span>
            </button>
          )}
        </div>
      }
    >
      <hr />
      <div className={styles.container}>
        <div className={styles.containerUser}>
          <div className={styles.infoUser1}>
            <img
              src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt={t('claimstatus.user.avatar')}
              className={styles.avatar}
            />
            <div className={styles.infoUser1Row}>
              <span>{data?.full_name}</span>
              <div className={styles.infoUser1Row2}>
                <span>{data?.job_rank_name}</span>
                <span className={styles.separator}>|</span>
                <span>{data?.department_name}</span>
              </div>
            </div>
          </div>
          <div className={styles.infoUser2}>
            <p>{t('user.userId')}: {data?.user_id}</p>
          </div>
        </div>
        <hr />
        <div className={styles.containerProject}>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('project.projectId')}:</span>
            <span className={styles.projectValue}>{data?.project_id}</span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('project.projectName')}:</span>
            <span className={styles.projectValue}>{data?.project_name}</span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('claim.timeDuration')}:</span>
            <span className={styles.projectValue}>
              {formatDateToMonthDay(`${data?.start_date}`)}
              <MoveRight size={20} className={styles.iconMoveRight} />
              {formatDateToMonthDay(`${data?.end_date}`)}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('claim.submittedDate')}:</span>
            <span className={styles.projectValue}>
              {formatDateToMonthDay(`${data?.submitted_date}`)}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('claim.approvedDate')}:</span>
            <span className={styles.projectValue}>
              {formatDateToMonthDay(`${data?.approved_date}`)}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('claim.status')}:</span>
            <span className={styles.projectValue}>
              {data?.claim_status ? (
                <StatusTag
                  status={data.claim_status as "PENDING" | "APPROVED" | "REJECTED" | "PAID" | "DRAFT"}
                />
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('claim.totalHours')}:</span>
            <span className={styles.projectValue}>
              {data?.total_hours} {t('claim.hours')}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>{t('claim.salaryOvertime')}:</span>
            <span className={styles.projectValue}>
              ${data?.salary_overtime}
            </span>
          </div>
        </div>
        <div className={styles.containerHistory}>
          {data?.claim_details && data.claim_details.length > 0 && (
            <div className={styles.history}>
              <div className={styles.historyHeader}>
                <p>{t('history.title')}</p>
                <ChevronDown
                  className={styles.historyIcon}
                  onClick={handleHistoryItems}
                />
              </div>
              {isChevronDown && data.claim_details.map((detail: any, index: number) => (
                <div key={index} className={styles.historyItem}>
                  <span className={styles.historyItemDate}>
                    {formatDateToMonthDay(detail.date)}
                  </span>
                  <div className={styles.historyItemInfo}>
                    <div className={styles.historyItemRow}>
                      <span className={styles.historyItemLabel}>
                        {t('history.workingHours')}:
                      </span>
                      <span className={styles.historyItemValue}>
                        {detail.working_hours} {t('claim.hours')}
                      </span>
                    </div>
                    <div className={styles.historyItemRow}>
                      <span className={styles.historyItemLabel}>
                        {t('history.overtimeSalary')}:
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

export default CustomModal;