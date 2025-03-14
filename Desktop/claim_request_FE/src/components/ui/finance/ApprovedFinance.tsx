import React, { useEffect, useState } from "react";
import styles from "@ui/finance/ApprovedFinance.module.css";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TableComponent, { Column, DataRecord } from "@ui/Table/Table";
import { fetchApprovedClaimsFinanceAsync } from "@/redux/thunk/Claim/claimThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import {
  selectApprovedClaimFinance,
  selectApprovedClaimTotalPages,
} from "@/redux/selector/claimSelector";

// interface claimList {
//   claim_id?: string;
//   user_id?: string;
//   project_id?: string;
//   total_working_hours?: number;
//   submitted_date?: Date;
//   claim_status?: string;
//   project_name?: string;
// }
// const formatDateToDDMMYYYY = (date: string) => {
//   const dateObj = new Date(date);
//   const day = dateObj.getDate();
//   const month = dateObj.getMonth() + 1;
//   const year = dateObj.getFullYear();
//   return `${day}/${month}/${year}`;
// };

export const ApprovedFinanceComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectApprovedClaimFinance);
  const totalPages = useSelector(selectApprovedClaimTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(7);

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchApprovedClaimsFinanceAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const handleViewDetail = (user_id: string) => {
    navigate(`/finance/approved/detail/${user_id}`); //sửa lại url ở đây để truyềnS
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  const columns: Column[] = [
    {
      key: "claim_id",
      dataIndex: "claim_id",
      title: "Claim ID",
    },
    {
      key: "full_name",
      dataIndex: "full_name",
      title: "User Name",
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
    },
    {
      key: "time_durations",
      dataIndex: "time_durations",
      title: "Time Durations",
      cell: ({ value }) => `${value}`,
    },
    {
      key: "action",
      dataIndex: "user_id",
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
    project_name: claim.project ? claim.project.project_name : "",
    time_durations: claim.project ? claim.project.time_durations : "",
  }));
  return (
    <div>
      <h1>Approved Claims</h1>
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

export default ApprovedFinanceComponent;
