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


export const ApprovedApproverComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAppovedClaim);
  const totalPages = useSelector(selectApprovedClaimTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchApprovedClaimsApproverAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const handleViewDetail = (id: string) => {
    navigate(`/approve-details?id=${id
      }`);
  };

  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  const columns: Column<DataRecord>[] = [
    {
      key: "user_name",
      dataIndex: "user_full_name",
      title: "Full Name",
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
    //       onClick={() => handleViewDetail(value as string)}
    //     />
    //   ),
    // },
  ];
  const dataSource: DataRecord[] = claimList.map((claim) => ({
    key: claim.request_id,
    ...claim,
    user_full_name: claim.user.full_name,
    user_salary: claim.user.salary,
    user_ot_rate: claim.user.ot_rate,
    claim_status: "approved",
  }));
  return (
    <div>
      <h1 className={styles.title}>Approved Claims</h1>
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

export default ApprovedApproverComponent;
