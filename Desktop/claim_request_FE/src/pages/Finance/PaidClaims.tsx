import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, MoveRight, ChevronDown } from "lucide-react";
import styles from "./PaidClaims.module.css";
import TableComponent, {
  Column,
  DataRecord,
} from "../../components/ui/Table/Table";
import { fetchPaidClaimsAsync } from "../../redux/slices/Claim/paidClaimsSlice";
import { AppDispatch } from "@/redux";
import CustomModal from "@/components/ui/CustomModal/CustomModal";
import StatusTag, { StatusType } from "@/components/ui/StatusTag/StatusTag";
import { useTranslation } from "react-i18next";


const formatDateByLanguage = (
  date: string,
  language: string,
  includeMonthName: boolean = false,
) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0"); 
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); 
  const year = dateObj.getFullYear();
  const monthName = dateObj.toLocaleString(
    language === "vi" ? "vi-VN" : "en-US",
    { month: "long" },
  );

  if (includeMonthName) {
    return language === "vi"
      ? `${monthName} ${day}` 
      : `${monthName} ${day}`; 
  }

  return language === "vi"
    ? `${day}/${month}/${year}` 
    : `${month}/${day}/${year}`; 
};

const PaidClaims: React.FC = () => {
  const { t, i18n } = useTranslation("paidclaims");
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: claims,
    loading,
    totalPages,
  } = useSelector((state: any) => state.paidClaims);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");

  useEffect(() => {
    dispatch(fetchPaidClaimsAsync(currentPage.toString()));
  }, [currentPage, dispatch]);

  const handleViewDetail = (value: string) => {
    setSelectedRequestId(value);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId("");
  };

  const columns: Column[] = [
    {
      key: "index",
      dataIndex: "index",
      title: t("paidclaims.table.no"),
      width: "80px",
      cell: ({ value }) => String(value).padStart(3, "0"),
    },
    {
      key: "full_name",
      dataIndex: "full_name",
      title: t("paidclaims.table.userName"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("paidclaims.table.projectName"),
    },
    {
      key: "time_duration",
      dataIndex: "time_duration",
      title: t("paidclaims.table.projectDuration"),
      cell: ({ value }) => value as string, 
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("paidclaims.table.totalHours"),
      cell: ({ value }) => `${value} ${t("paidclaims.table.hours")}`,
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: t("paidclaims.table.action"),
      cell: ({ value }) => (
        <EyeIcon
          className={styles.icon}
          onClick={() => handleViewDetail(value as string)}
        />
      ),
    },
  ];

  const dataSource: DataRecord[] = claims.map((claim: any, index: number) => ({
    ...claim,
    key: claim.request_id,
    index: (currentPage - 1) * limit + index + 1,
    time_duration: `${formatDateByLanguage(claim.start_date, i18n.language)} - ${formatDateByLanguage(claim.end_date, i18n.language)}`,
  }));

  const selectedClaim = claims.find(
    (claim: any) => claim.request_id === selectedRequestId,
  );

  const renderClaimDetail = () => {
    if (!selectedClaim?.claim_details?.length) {
      return (
        <div className={styles.loading}>{t("paidclaims.modal.noData")}</div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.containerUser}>
          <div className={styles.infoUser1}>
            <img
              src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="avatar"
              className={styles.avatar}
            />
            <div className={styles.infoUser1Row}>
              <span>{selectedClaim.full_name}</span>
              <div className={styles.infoUser1Row2}>
                <span>{selectedClaim.job_rank_name}</span>
                <span className={styles.separator}>|</span>
                <span>{selectedClaim.department_name}</span>
              </div>
            </div>
          </div>
          <div className={styles.infoUser2}>
            <p>
              {t("paidclaims.user.userId")}: {selectedClaim.user_id}
            </p>
          </div>
        </div>
        <hr />
        <div className={styles.containerProject}>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>
              {t("paidclaims.project.projectId")}:
            </span>
            <span className={styles.projectValue}>
              {selectedClaim.project_id}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Project Name:</span>
            <span className={styles.projectValue}>
              {selectedClaim.project_name}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Time Duration:</span>
            <span className={styles.projectValue}>
              {formatDateByLanguage(
                selectedClaim.start_date,
                i18n.language,
                true,
              )}
              <MoveRight size={20} className={styles.iconMoveRight} />
              {formatDateByLanguage(
                selectedClaim.end_date,
                i18n.language,
                true,
              )}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Submitted Date:</span>
            <span className={styles.projectValue}>
              {formatDateByLanguage(
                selectedClaim.submitted_date,
                i18n.language,
                true,
              )}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Approved Date:</span>
            <span className={styles.projectValue}>
              {formatDateByLanguage(
                selectedClaim.approved_date,
                i18n.language,
                true,
              )}
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Status:</span>
            <span className={styles.projectValue}>
              <StatusTag status="PAID" />
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Total Working Hours:</span>
            <span className={styles.projectValue}>
              {selectedClaim.total_hours} hours
            </span>
          </div>
          <div className={styles.projectRow}>
            <span className={styles.projectLabel}>Salary Overtime:</span>
            <span className={styles.projectValue}>
              ${selectedClaim.salary_overtime}
            </span>
          </div>
        </div>
        <div className={styles.containerHistory}>
          <div className={styles.history}>
            <div className={styles.historyHeader}>
              <p>History</p>
              <ChevronDown className={styles.historyIcon} />
            </div>
            {selectedClaim.claim_details.map((detail: any, index: number) => (
              <div key={index} className={styles.historyItem}>
                <span className={styles.historyItemDate}>
                  {formatDateByLanguage(detail.date, i18n.language, true)}
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
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("paidclaims.title")}</h1>
      </div>

      <div className={styles.containerTable}>
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={true}
          pageLength={limit}
          totalPage={totalPages}
          name={t("paidclaims.title")}
          onPageChange={setCurrentPage}
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t("paidclaims.modal.title")}
        onPrint={() => window.print()}
        width={600}
        height="95%"
        centered={false}
        position={{ right: 20, top: 23 }}
        backgroundColor="#E9ECEF"
        data={selectedClaim}
      >
        {loading ? (
          <div className={styles.loading}>{t("paidclaims.modal.loading")}</div>
        ) : (
          renderClaimDetail()
        )}
      </CustomModal>
    </>
  );
};

export default PaidClaims;
