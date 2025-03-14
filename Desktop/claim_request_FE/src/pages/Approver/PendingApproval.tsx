import TableComponent, {
  Column,
  DataRecord,
} from "@/components/ui/Table/Table";
import { useEffect, useState } from "react";
import {
  selectAllPending,
  selectAllPendingTotalPages,
} from "@/redux/selector/pendingSelector";
import httpClient from "@/constant/apiInstance.ts";
import { CheckIcon, X, CheckCircle2, XCircle } from "lucide-react";
import styles from "@/pages/Approver/PendingApproval.module.css";
import { Link } from "react-router-dom";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { AppDispatch } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPendingClaimAsync } from "@/redux/thunk/Claim/claimThunk";
import { toast } from "react-toastify";

// interface claimList {
//   claim_id?: string;
//   user_id?: string;
//   project_id?: string;
//   total_working_hours?: number;
//   submitted_date?: Date;
//   claim_status?: string;
//   project_name?: string;
// }

export const PendingComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const [claimList, setClaimList] = useState<claimList[]>([]);
  const claimList = useSelector(selectAllPending);
  const totalPages = useSelector(selectAllPendingTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(7);

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllPendingClaimAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const handleApproveClaim = async (claimId: string) => {
    try {
      await httpClient.post(`/approvers/${claimId}/approve-claim`, {});
      dispatch(
        fetchAllPendingClaimAsync({
          page: currentPage.toString(),
          limit: limit.toString(),
        })
      );
      toast.success("Claim approved successfully!");
      window.confirm("Are you sure you want to approve this claim?");
    } catch (error) {
      console.log("Error approving claim: ", error);
      toast.error("Failed to approve claim.");
    }
  };

  const handleRejectClaim = async (claimId: string) => {
    try {
      await httpClient.post(`/approvers/${claimId}/reject-claim`, {});
      dispatch(
        fetchAllPendingClaimAsync({
          page: currentPage.toString(),
          limit: limit.toString(),
        })
      );
      toast.success("Claim rejected successfully!");
      window.confirm("Are you sure you want to reject this claim?");
    } catch (error) {
      console.log("Error rejecting claim: ", error);
      toast.error("Failed to reject claim.");
    }
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
      title: "Project ID",
    },
    {
      key: "total_working_hours",
      dataIndex: "total_working_hours",
      title: "Total Working Hours",
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Claim Status",
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
    },
    {
      key: "action",
      dataIndex: "claim_id",
      title: "",
      cell: ({ value }) => (
        <div className={styles.actions}>
          <Tooltip text="Approve" position="top">
            <CheckCircle2
              className={styles.iconApprove}
              onClick={() => handleApproveClaim(value as string)}
            />
          </Tooltip>
          <Tooltip text="Reject" position="top">
            <XCircle
              className={styles.iconReject}
              onClick={() => handleRejectClaim(value as string)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  // const dataSource = pending.map((item, index) => ({
  //   key: index,
  //   ...item,
  // }));

  const dataSource: DataRecord[] = claimList.map((a, index) => ({
    ...a,
    key: index,
    id: a.claim_id ? a.claim_id.toString() : "",
    status: a.project_name ? a.project_name : "",
  }));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pending Approval Claims</h1>
      <nav className={styles.breadcrumb}>
        <Link to="/">My Claims</Link> &gt;{" "}
        <Link to="/pending-claim">Pending Approval</Link>
      </nav>
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
