import TableComponent, { Column } from "@/components/ui/Table/Table";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/index";
// import { selectAllPending } from "@/redux/selector/pendingSelector";
import { useEffect, useState } from "react";
// import { fetchAllPendingClaimAsync } from "@/redux/thunk/Approver/pendingThunk";
import type { claimPending } from "@/types/Pending.d.ts";
import httpClient from "@/constant/apiInstance.ts";
import { CheckIcon, X, CheckCircle2, XCircle } from "lucide-react";
import styles from "@/pages/Approver/PendingApproval.module.css";
import { Link } from "react-router-dom";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";



export const PendingComponent: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const pending = useSelector(selectAllPending);
  const [pending, setPending] = useState<claimPending[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPendingClaimAsync();
  }, []);

  const fetchAllPendingClaimAsync = async () => {
    try {
      const res = await httpClient.get<{ data: claimPending[] }>(
        `/approvers/pending-claim`
      );
      console.log("data: ", res.data.data)
      setPending(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error at PendingApproval: ", error);
    }
  };

  // const handleViewDetail = (claimId: string) => {
  //   navigate(`/approve/detail/${claimId}`); //sửa lại url ở đây để truyền
  // };

  const handleApproveClaim = async (claimId: string) => {
    try {
      await httpClient.post(`/approvers/${claimId}/approve-claim`, {});
      setPending((prevPending) =>
        prevPending.map((claim) =>
          claim.claim_id === claimId ? { ...claim, claim_status: "Approved" } : claim
        )
      );
    } catch (error) {
      console.log("Error approving claim: ", error);
    }
  };

  const handleRejectClaim = async (claimId: string) => {
    try {
      await httpClient.post(`/approvers/${claimId}/rejected-claim`, {});
      setPending((prevPending) =>
        prevPending.map((claim) =>
          claim.claim_id === claimId ? { ...claim, claim_status: "Rejected" } : claim
        )
      );
    } catch (error) {
      console.log("Error rejecting claim: ", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!pending || pending.length === 0) {
    return <p>No claim!</p>;
  }

  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: Column[] = [
    // {
    //   key: "claim_id",
    //   dataIndex: "claim_id",
    //   title: "Claim ID",
    // },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "User ID",
    },
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
          {/* <Tooltip text="Approve" position="top">
            <CheckIcon className={styles.icon} />
          </Tooltip>
          <Tooltip text="Reject" position="top">
            <X className={styles.icon} />
          </Tooltip> */}
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

  const dataSource = pending.map((item, index) => ({
    key: index,
    ...item,
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
        loading={false}
        pagination={true}
        name="Claims"
        pageLength={2}
      />
    </div>
  );
};
