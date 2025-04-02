import React, { useEffect, useState } from "react";
import styles from "./RejectedApproval.module.css";
import { EyeIcon, EyeOffIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import TableComponent, { Column, DataRecord } from "@ui/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRejectedClaimAsync } from "@redux/thunk/Claim/claimThunk";
import { AppDispatch } from "@/redux";
import StatusTag, { StatusType } from "@/components/ui/StatusTag/StatusTag";
import {
  selectAllRejected,
  selectAllRejectedTotalPages,
} from "@/redux/selector/rejectedSelector.ts";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date.ts";


export const RejectedComponent: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAllRejected);
  const totalPages = useSelector(selectAllRejectedTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);
  const { t } = useTranslation("reject");

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllRejectedClaimAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  // const handleViewDetail = (id: string) => {
  //   navigate(`/reject-details?id=${id}`);
  // };

  // const formatDateToDDMMYYYY = (date: string) => {
  //   const dateObj = new Date(date);
  //   const day = dateObj.getDate();
  //   const month = dateObj.getMonth() + 1;
  //   const year = dateObj.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  const handlePageChange = (newPage: number) => {
    console.log("New Page: ", newPage);
    setCurrentPage(newPage);
  };

  const toggleSalaryVisibility = () => {
    setIsSalaryVisible(!isSalaryVisible);
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
      cell: ({ value }) => formatDate(value as string),
    },
    {
      key: "end_date",
      dataIndex: "end_date",
      title: t("endDate"),
      cell: ({ value }) => formatDate(value as string),
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
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: t("submittedDate"),
      cell: ({ value }) => formatDate(value as string),
    },
    // {
    //   key: "salary",
    //   dataIndex: "user_salary",
    //   title: t("salary"),
    //   cell: ({ value }) => <div>{isSalaryVisible ? value : "******"}</div>,
    // },
    // {
    //   key: "ot_rate",
    //   dataIndex: "user_ot_rate",
    //   title: t("otRate"),
    // },
    // {
    //   key: "salary_overtime",
    //   dataIndex: "salary_overtime",
    //   title: t("salaryOvertime"),
    //   cell: ({ value }) => (
    //     <div>{isSalaryVisible ? value : "*****************"}</div>
    //   ),
    // },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("claimStatus"),
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
  ].filter((column) => !column.hidden);

  const dataSource: DataRecord[] = claimList.map((claim) => ({
    key: claim.request_id,
    ...claim,
    user_full_name: claim.user.full_name,
    user_email: claim.user.email,
    user_salary: claim.user.salary,
    user_ot_rate: claim.user.ot_rate,
    claim_status: "REJECTED", // Ensure this is correctly set
  }));

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {t("rejectedClaims")}
        </h1>
        <p className={styles.title2}>
          {t("rejectedMessage")}
        </p>
      </div>
      {/* <button onClick={toggleSalaryVisibility}>
        {isSalaryVisible ? t("hideSalary") : t("showSalary")}
      </button> */}
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        totalPage={totalPages}
        pagination={true}
        name={t("claims")}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RejectedComponent;
