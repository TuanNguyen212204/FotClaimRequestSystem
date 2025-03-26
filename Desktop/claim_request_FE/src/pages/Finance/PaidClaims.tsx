import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, MoveRight } from "lucide-react";
import styles from "./PaidClaims.module.css";
import TableComponent, { Column, DataRecord } from "../../components/ui/Table/Table";
import { fetchPaidClaimsAsync } from "../../redux/slices/Claim/paidClaimsSlice";
import { AppDispatch } from "@/redux";
import CustomModal from "@/components/ui/CustomModal/CustomModal";
import ClaimStatus from './ClaimStatus';

const formatDateToDDMMYYYY = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateToMonthDay = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  return `${month} ${day}`;
};

const PaidClaims: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: claims, loading, totalPages } = useSelector((state: any) => state.paidClaims);
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
      title: "No",
      width: "80px",
      cell: ({ value }) => String(value).padStart(3, '0')
    },
    {
      key: "full_name",
      dataIndex: "full_name",
      title: "User Name"
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name"
    },
    {
      key: "time_duration",
      dataIndex: "time_duration",
      title: "Project Duration"
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: "Total Working Hours",
      cell: ({ value }) => `${value} hours`
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: "Action",
      cell: ({ value }) => (
        <EyeIcon
          className={styles.icon}
          onClick={() => handleViewDetail(value as string)}
        />
      )
    }
  ];

  const dataSource: DataRecord[] = claims.map((claim: any, index: number) => ({
    ...claim,
    key: claim.request_id,
    index: ((currentPage - 1) * limit) + index + 1,
    time_duration: `${formatDateToDDMMYYYY(claim.start_date)} - ${formatDateToDDMMYYYY(claim.end_date)}`
  }));

  const selectedClaim = claims.find((claim: any) => claim.request_id === selectedRequestId);

  const renderClaimDetail = () => {
    if (!selectedClaim?.claim_details?.length) {
      return <div className={styles.loading}>No overtime details found</div>;
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
            <div>
              <p>{selectedClaim.full_name}</p>
              <p className={styles.department}>Department | {selectedClaim.department_name}</p>
            </div>
          </div>
          <div className={styles.infoUser2}>
            <p>📧 {selectedClaim.email}</p>
          </div>
        </div>

        <div className={styles.claimInfo}>
          <div className={styles.infoRow}>
            <p>Project Name:</p>
            <p>{selectedClaim.project_name}</p>
          </div>
          <div className={styles.infoRow}>
            <p>Project ID:</p>
            <p>{selectedClaim.project_id}</p>
          </div>
          <div className={styles.infoRow}>
            <p>Over Time Duration:</p>
            <p>{formatDateToMonthDay(selectedClaim.start_date)} - {formatDateToMonthDay(selectedClaim.end_date)} ({selectedClaim.total_days} days)</p>
          </div>
          <div className={styles.infoRow}>
            <p>Submitted Date:</p>
            <p>{formatDateToMonthDay(selectedClaim.submitted_date)}</p>
          </div>
          <div className={styles.infoRow}>
            <p>Approved Date:</p>
            <p>{formatDateToMonthDay(selectedClaim.approved_date)}</p>
          </div>
          <div className={styles.infoRow}>
            <p>Status:</p>
            <div className={styles.statusPaid}>Paid</div>
          </div>
          <div className={styles.infoRow}>
            <p>Total Overtime Salary:</p>
            <p>${selectedClaim.salary_overtime}</p>
          </div>
        </div>

        <div className={styles.history}>
          <div className={styles.historyHeader}>
            <h4>History</h4>
            <MoveRight size={16} />
          </div>
          {selectedClaim.claim_details.map((detail: any, index: number) => (
            <div key={index} className={styles.historyItem}>
              <p>{formatDateToMonthDay(detail.date)}</p>
              <div className={styles.historyDetails}>
                <p>Working Hours: <span>{detail.working_hours} hours</span></p>
                <p>Overtime Salary: <span>${detail.salaryOvertimePerDay}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Paid Claims</h1>
      </div>

      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={true}
        pageLength={limit}
        totalPage={totalPages}
        name="Paid Claims"
        onPageChange={setCurrentPage}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Claim Detail"
        onPrint={() => window.print()}
      >
        {loading ? (
          <div className={styles.loading}>Loading claim details...</div>
        ) : (
          <ClaimStatus requestId={selectedRequestId} />
        )}
      </CustomModal>
    </div>
  );
};

export default PaidClaims;
