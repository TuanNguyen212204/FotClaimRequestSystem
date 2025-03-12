import TableComponent, { Column } from "@/components/ui/Table/Table";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/index";
// import { selectAllPending } from "@/redux/selector/pendingSelector";
import { useEffect, useState } from "react";
// import { fetchAllPendingClaimAsync } from "@/redux/thunk/Approver/pendingThunk";
import type { claimPending } from "@/types/Pending.d.ts";
import httpClient from "@/constant/apiInstance.ts";
import { EyeIcon, TrashIcon, CheckIcon } from "lucide-react";
import styles from "@/pages/Approver/PendingApproval.module.css";
import { Link } from "react-router-dom";
import { DataRecord } from "@/components/ui/Table/Table";
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
      console.log("data: ", res.data.data);
      setPending(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error at PendingApproval: ", error);
    }
  };

  // const handleViewDetail = (claimId: string) => {
  //   navigate(`/approve/detail/${claimId}`); //sửa lại url ở đây để truyền
  // };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!pending || pending.length === 0) {
    return <p>No data available</p>;
  }

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
      title: "Action",
      cell: ({ value }) => (
        <div className={styles.actions}>
          <EyeIcon
            className={styles.icon}
            // onClick={() => handleViewDetail(value as string)}
          />
          {/* &nbsp;&nbsp;&nbsp; */}
          <CheckIcon className={styles.icon} />
          {/* &nbsp;&nbsp;&nbsp; */}
          <TrashIcon className={styles.icon} />
        </div>
      ),
    },
  ];

  // const dataSource = pending.map((item, index) => ({
  //   key: index,
  //   ...item,
  // }));

  const dataSource: DataRecord[] = pending.map((a, index) => ({
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
        loading={false}
        pagination={true}
        name="Claims"
        pageLength={8}
      />
    </div>
  );
};
