import { selectPendingClaimByUserID, selectTotalPage } from "@/redux/selector/claimSelector";
import { useEffect, useState, useCallback } from "react";
import styles from "@components/ui/claimer/UserClaims.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import {
  fetchClaimByUserWithPendingStatusAsync,
  fetchTotalClaimByUserAsync,
} from "@redux/thunk/Claim/claimThunk";
import { EyeIcon } from "lucide-react";
import TableComponent, { Column, DataRecord } from "@components/ui/Table/Table";
import UserClaimDetailsModal from "@components/ui/claimer/UserClaimDetails";
import StatusTag from "@components/ui/StatusTag/StatusTag";
import { useTranslation } from "react-i18next";

const PendingClaimByUserID = () => {
  const { t } = useTranslation("pendingClaim");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userClaim = useSelector(selectPendingClaimByUserID);
  const totalPage = useSelector(selectTotalPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  const [limit] = useState(5);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchClaimByUserWithPendingStatusAsync({ page: currentPage })).unwrap(),
          dispatch(fetchTotalClaimByUserAsync({ status: "PENDING" })).unwrap(),
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, dispatch]);

  const handleViewDetail = (id: string) => {
    setSelectedClaim(id);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  const formatDateToDDMMYYYY = useCallback((date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return t("language") === "en"
      ? `${month}/${day}/${year}` // Tiếng Anh: MM/DD/YYYY
      : `${day}/${month}/${year}`; // Tiếng Việt: DD/MM/YYYY
  }, [t]);

  const columns: Column[] = [
    {
      key: "project_id",
      dataIndex: "project_id",
      title: t("project_id_label"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("project_name_label"),
    },
    {
      key: "time_duration",
      dataIndex: "time_duration",
      title: t("time_duration_label"),
      cell: ({ value }) => <span>{value as string}</span>,
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("total_working_hours_label"),
      cell: ({ value }) => `${value} ${t("hours_suffix")}`,
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: t("submitted_date_label"),
      cell: ({ value }) => <span>{formatDateToDDMMYYYY(value as string)}</span>,
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("claim_status_label"),
      cell: ({ value }: { value: unknown }) => {
        const stringValue = value as string;
        return (
          <div>
            <StatusTag
              status={value as "PENDING" | "APPROVED" | "REJECTED" | "PAID"}
            />
          </div>
        );
      },
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: t("action_label"),
      cell: ({ value }) => (
        <>
          <EyeIcon
            className="cursor-pointer"
            onClick={() => handleViewDetail(value as string)}
          />
          <UserClaimDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            requestID={selectedClaim}
            currentPage={currentPage.toString()}
            limit={limit.toString()}
          />
        </>
      ),
    },
  ];

  const dataSource: DataRecord[] = userClaim.map((claim, index) => ({
    ...claim,
    key: index,
    id: claim.claim_id ? claim.claim_id.toString() : "",
    project_name: claim.project_name || "",
    start_date: claim.start_date || null,
    end_date: claim.end_date || null,
    status: claim.claim_status ? claim.claim_status : "",
    time_duration:
      claim.start_date && claim.end_date
        ? `${formatDateToDDMMYYYY(claim.start_date)} - ${formatDateToDDMMYYYY(
            claim.end_date
          )}`
        : t("no_data"),
  }));

  return (
    <div className={styles.container}>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={true}
        name={t("pending_claims_title")}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PendingClaimByUserID;