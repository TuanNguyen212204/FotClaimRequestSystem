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
export const DraftApproval: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAllDraft);
  const totalPages = useSelector(selectAllDraftTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);
  const {t} = useTranslation("draft");

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllDraftClaimAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePageChange = (newPage: number) => {
    console.log("New Page: ", newPage);
    setCurrentPage(newPage);
  };

  const columns: Column<DataRecord>[] = [
    {
      key: "user_name",
      dataIndex: "user_full_name",
      title: t("fullName"),
    },
    {
      key: "email",
      dataIndex: "user_email",
      title: t("email"),
    },
    {
      key: "start_date",
      dataIndex: "start_date",
      title: t("startDate"),
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "end_date",
      dataIndex: "end_date",
      title: t("endDate"),
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("totalHours"),
    },
    {
      key: "project_id",
      dataIndex: "project_id",
      title: t("projectId"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("projectName"),
    },
    // {
    //   key: "submitted_date",
    //   dataIndex: "submitted_date",
    //   title: "Submitted Date",
    //   cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    // },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("claimStatus"),
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
        <p className={styles.title2}>
          {t("message")}
        </p>
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
