import React, { useEffect, useState, useRef, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomModal.module.css';
import { X, Printer, MoveRight, ChevronDown } from 'lucide-react';
import StatusTag from '../StatusTag/StatusTag';

interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface CustomModalProps {
  isOpen: boolean;
  onClose: (e?: React.MouseEvent | KeyboardEvent) => void;
  title?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  maskClosable?: boolean;
  centered?: boolean;
  position?: Position;
  onPrint?: () => void;
  onPay?: () => void;
  backgroundColor?: string;
  data?: any;
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

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title = 'Claim Detail',
  width = 600,
  height = '95%',
  maskClosable = true,
  centered = false,
  position,
  onPrint,
  onPay,
  backgroundColor = '#E9ECEF',
  data
}) => {
  const [visible, setVisible] = useState(isOpen);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && maskClosable) {
      onClose();
    }
  };

  const handleHistoryToggle = () => {
    setIsHistoryExpanded(!isHistoryExpanded);
  };

  if (!visible || !data) return null;

  const containerStyle: CSSProperties = {
    width: width || 'auto',
    minWidth: width || '600px',
    height: height || 'auto',
    maxHeight: '95vh',
    position: position || centered ? 'fixed' : 'relative',
    ...(position ? {
      top: position.top,
      bottom: position.bottom,
      left: position.left,
      right: position.right,
    } : {}),
    ...(centered ? { 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)' 
    } : {}),
    background: backgroundColor,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const modalContent = (
    <div className={styles.container}>
      <div className={styles.containerUser}>
        <div className={styles.infoUser1}>
          <img
            src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.infoUser1Row}>
            <span>{data.full_name}</span>
            <div className={styles.infoUser1Row2}>
              <span>{data.job_rank_name}</span>
              <span className={styles.separator}>|</span>
              <span>{data.department_name}</span>
            </div>
          </div>
        </div>
        <div className={styles.infoUser2}>
          <p>User ID: {data.user_id}</p>
        </div>
      </div>
      <hr />
      <div className={styles.containerProject}>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Project ID:</span>
          <span className={styles.projectValue}>{data.project_id}</span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Project Name:</span>
          <span className={styles.projectValue}>{data.project_name}</span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Time Duration:</span>
          <span className={styles.projectValue}>
            {formatDateToMonthDay(data.start_date)}
            <MoveRight size={20} className={styles.iconMoveRight} />
            {formatDateToMonthDay(data.end_date)}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Submitted Date:</span>
          <span className={styles.projectValue}>
            {formatDateToMonthDay(data.submitted_date)}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Approved Date:</span>
          <span className={styles.projectValue}>
            {formatDateToMonthDay(data.approved_date)}
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Status:</span>
          <span className={styles.projectValue}>
            <StatusTag status={data.claim_status || "PAID"} />
          </span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Total Working Hours:</span>
          <span className={styles.projectValue}>{data.total_hours} hours</span>
        </div>
        <div className={styles.projectRow}>
          <span className={styles.projectLabel}>Salary Overtime:</span>
          <span className={styles.projectValue}>${data.salary_overtime}</span>
        </div>
      </div>
      <div className={styles.containerHistory}>
        {data.claim_details?.length > 0 && (
          <div className={styles.history}>
            <div className={styles.historyHeader}>
              <p>History</p>
              <ChevronDown
                className={styles.historyIcon}
                onClick={handleHistoryToggle}
              />
            </div>
            {isHistoryExpanded && data.claim_details.map((detail: any, index: number) => (
              <div key={index} className={styles.historyItem}>
                <span className={styles.historyItemDate}>
                  {formatDateToMonthDay(detail.date)}
                </span>
                <div className={styles.historyItemInfo}>
                  <div className={styles.historyItemRow}>
                    <span className={styles.historyItemLabel}>Working Hours:</span>
                    <span className={styles.historyItemValue}>
                      {detail.working_hours} hours
                    </span>
                  </div>
                  <div className={styles.historyItemRow}>
                    <span className={styles.historyItemLabel}>Overtime Salary:</span>
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
  );

  const modalNode = (
    <div 
      className={styles.overlay}
      onClick={(e) => {
        if (maskClosable && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef} 
        className={styles.modal} 
        style={containerStyle}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>{title}</h2>
          <button 
            onClick={() => onClose()} 
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.content}>
          {modalContent}
        </div>
        <div className={styles.footer}>
          {onPay && (
            <button 
              onClick={onPay}
              className={styles.payButton}
              aria-label="Pay claim"
            >
              Pay
            </button>
          )}
          {onPrint && (
            <button 
              onClick={onPrint}
              className={styles.printButton}
              aria-label="Print details"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalNode, document.body);
};

export default CustomModal;