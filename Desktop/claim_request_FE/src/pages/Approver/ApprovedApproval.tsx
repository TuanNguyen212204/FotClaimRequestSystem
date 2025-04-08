import React, { useEffect, useState } from "react";
import styles from "./ApprovadApproval.module.css";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TableComponent, { Column, DataRecord } from "@ui/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedClaimsApproverAsync } from "@redux/thunk/Claim/claimThunk";
import { AppDispatch } from "@/redux";
import StatusTag, { StatusType } from "@/components/ui/StatusTag/StatusTag";
import {
  selectAppovedClaim,
  selectApprovedClaimTotalPages,
} from "@redux/selector/claimSelector";
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

export const ApprovedApproval: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAppovedClaim);
  const totalPages = useSelector(selectApprovedClaimTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);
  const { t, i18n } = useTranslation("approve");

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchApprovedClaimsApproverAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      }),
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const handleViewDetail = (id: string) => {
    navigate(`/approve-details?id=${id}`);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  const columns: Column<DataRecord>[] = [
    {
      key: "user_name",
      dataIndex: "user_full_name",
      title: t("columns.full_name"),
    },
    {
      key: "email",
      dataIndex: "user_email",
      title: t("columns.email"),
    },
    {
      key: "start_date",
      dataIndex: "start_date",
      title: t("columns.start_date"),
      cell: ({ value }) => formatDateByLanguage(value as string, i18n.language),
    },
    {
      key: "end_date",
      dataIndex: "end_date",
      title: t("columns.end_date"),
      cell: ({ value }) => formatDateByLanguage(value as string, i18n.language),
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("columns.total_hours"),
    },
    {
      key: "project_id",
      dataIndex: "project_id",
      title: t("columns.project_id"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("columns.project_name"),
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: t("columns.submitted_date"),
      cell: ({ value }) => formatDateByLanguage(value as string, i18n.language),
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("columns.claim_status"),
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
  ];

  const dataSource: DataRecord[] = claimList.map((claim) => ({
    key: claim.request_id,
    ...claim,
    user_full_name: claim.user.full_name,
    user_email: claim.user.email,
    user_salary: claim.user.salary,
    user_ot_rate: claim.user.ot_rate,
    claim_status: "APPROVED",
  }));

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.title2}>{t("message")}</p>
      </div>
      <div className={styles.containerTable}>
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          totalPage={totalPages}
          pagination={true}
          name="Claims"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ApprovedApproval;
