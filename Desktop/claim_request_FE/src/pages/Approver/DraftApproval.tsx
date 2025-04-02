import React, { useEffect, useState } from "react";
import styles from "./DraftApproval.module.css";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
import TableComponent, { Column, DataRecord } from "@ui/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDraftClaimAsync } from "@redux/thunk/Claim/claimThunk";
import StatusTag, { StatusType } from "@/components/ui/StatusTag/StatusTag";
import { AppDispatch } from "@/redux";
import {
  selectAllDraft,
  selectAllDraftTotalPages,
} from "@/redux/selector/draftSelector.ts";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date";
export const DraftApproval: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAllDraft);
  const totalPages = useSelector(selectAllDraftTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);
  const { t } = useTranslation("draft");

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllDraftClaimAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      }),
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    console.log("New Page: ", newPage);
    setCurrentPage(newPage);
  };
  const formatDateRange = (dateRange: any) => {
    return dateRange.replace(
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/g,
      (match, day, month, year) => {
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      },
    );
  };

  const columns: Column<DataRecord>[] = [
    {
      key: "user_name",
      dataIndex: "user_full_name",
      title: t("full_name"),
    },
    {
      key: "email",
      dataIndex: "user_email",
      title: t("email"),
    },
    {
      key: "start_date",
      dataIndex: "start_date",
      title: t("start_date"),
      cell: ({ value }) => formatDateRange(formatDate(value as string)),
    },
    {
      key: "end_date",
      dataIndex: "end_date",
      title: t("end_date"),
      cell: ({ value }) => formatDateRange(formatDate(value as string)),
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("total_hours"),
    },
    {
      key: "project_id",
      dataIndex: "project_id",
      title: t("project_id"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("project_name"),
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",
      cell: ({ value }) => formatDateRange(formatDate(value as string)),
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("claims_status"),
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
    claim_status: "DRAFT",
  }));

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.title2}>{t("message")}</p>
      </div>
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
  );
};

export default DraftApproval;
