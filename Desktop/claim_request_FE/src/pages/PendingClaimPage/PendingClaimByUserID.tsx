import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/redux";
import {
  selectPendingClaimByUserID,
  selectTotalPage,
} from "@/redux/selector/claimSelector";
import {
  fetchClaimByUserWithPendingStatusAsync,
  fetchTotalClaimByUserAsync,
} from "@/redux/thunk/Claim/claimThunk";
import TableComponent, {
  DataRecord,
  Column,
} from "@/components/ui/Table/Table";
import { EyeIcon } from "lucide-react";
import styles from "@components/ui/claimer/UserClaims.module.css";
import UserClaimDetailsModal from "@components/ui/claimer/UserClaimDetails";
import StatusTag from "@components/ui/StatusTag/StatusTag";
import { useTranslation } from "react-i18next";

export const PendingClaimByUserID = () => {
  const { t } = useTranslation("pendingClaim");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const listApprovedClaim = useSelector(selectPendingClaimByUserID);
  const totalPage = useSelector(selectTotalPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  const [limit] = useState(5);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      dispatch(
        fetchClaimByUserWithPendingStatusAsync({ page: currentPage })
      ).finally(() => setLoading(false));
      dispatch(fetchTotalClaimByUserAsync());
    };
    fetchData();
  }, [currentPage, dispatch]);

  const handleViewDetail = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setSelectedClaim(id);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
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
            className={styles.icon}
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

  const dataSource: DataRecord[] = listApprovedClaim.map((claim, index) => ({
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
