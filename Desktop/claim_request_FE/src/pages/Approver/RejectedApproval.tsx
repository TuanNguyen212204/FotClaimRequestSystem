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

export const RejectedComponent: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAllRejected);
  const totalPages = useSelector(selectAllRejectedTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);

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

  const toggleSalaryVisibility = () => {
    setIsSalaryVisible(!isSalaryVisible);
  };

  const columns: Column<DataRecord>[] = [
    {
      key: "user_name",
      dataIndex: "user_full_name",
      title: "Full Name",
    },
    {
      key: "email",
      dataIndex: "user_email",
      title: "Email",
    },
    {
      key: "start_date",
      dataIndex: "start_date",
      title: "Start Date",
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "end_date",
      dataIndex: "end_date",
      title: "End Date",
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: "Total Hours",
    },
    {
      key: "project_id",
      dataIndex: "project_id",
      title: "Project ID",
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "salary",
      dataIndex: "user_salary",
      title: "Salary",
      cell: ({ value }) => <div>{isSalaryVisible ? value : "******"}</div>,
    },
    {
      key: "ot_rate",
      dataIndex: "user_ot_rate",
      title: "OT Rate",
    },
    {
      key: "salary_overtime",
      dataIndex: "salary_overtime",
      title: "Salary Overtime",
      cell: ({ value }) => (
        <div>{isSalaryVisible ? value : "*****************"}</div>
      ),
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Claim Status",
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
    // {
    //   key: "action",
    //   dataIndex: "claim_id",
    //   title: "",
    //   cell: ({ value }) => (
    //     <EyeIcon
    //       className={styles.icon}
    //       // onClick={() => handleViewDetail(value as string)}
    //     />
    //   ),
    // },
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
          {loading ? "Loading..." : "Rejected Claims"}
        </h1>
        <p className={styles.title2}>
          {loading ? "Please wait..." : "Bummer, your claim got the boot."}
        </p>
      </div>
      {/* <button onClick={toggleSalaryVisibility}>
        {isSalaryVisible ? "Hide Salary" : "Show Salary"}
      </button> */}
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

export default RejectedComponent;
