import React, { useEffect, useState } from "react";
import styles from "@ui/approver/ApproverdApprover.module.css";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TableComponent, { Column, DataRecord } from "@ui/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedClaimsApproverAsync } from "@redux/thunk/Claim/claimThunk";
import { AppDispatch } from "@redux";
import {
  selectAppovedClaim,
  selectApprovedClaimTotalPages,
} from "@redux/selector/claimSelector";

// interface claimList {
//   claim_id?: string;
//   user_id?: string;
//   project_id?: string;
//   total_working_hours?: number;
//   submitted_date?: Date;
//   claim_status?: string;
//   project_name?: string;
// }

export const ApprovedApproverComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAppovedClaim);
  const totalPages = useSelector(selectApprovedClaimTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(7);

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
    navigate(`/approve-details?id=${id}`);
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

  const columns: Column[] = [
    // {
    //   key: "claim_id",
    //   dataIndex: "claim_id",
    //   title: "Claim ID",
    // },
    // {
    //   key: "user_id",
    //   dataIndex: "user_id",
    //   title: "User ID",
    // },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
    },
    {
      key: "total_working_hours",
      dataIndex: "total_working_hours",
      title: "Total Working Hours",
      cell: ({ value }) => `${value} hours`,
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "action",
      dataIndex: "claim_id",
      title: "Action",
      cell: ({ value }) => (
        <EyeIcon
          className={styles.icon}
          onClick={() => handleViewDetail(value as string)}
        />
      ),
    },
  ];
  const dataSource: DataRecord[] = claimList.map((claim, index) => ({
    ...claim,
    key: index,
    id: claim.claim_id ? claim.claim_id.toString() : "",
    status: claim.claim_id ? claim.claim_id : "",
  }));
  return (
    <div>
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
