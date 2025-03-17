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
import { Link, Navigate } from "react-router-dom";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { AppDispatch } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPendingClaimAsync } from "@/redux/thunk/Claim/claimThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/ui/modal/Modal";
import StatusTag, { StatusType } from "@/components/ui/StatusTag/StatusTag";

export const PendingComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const [claimList, setClaimList] = useState<claimList[]>([]);
  const claimList = useSelector(selectAllPending);
  const totalPages = useSelector(selectAllPendingTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(7);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    onOk: () => void;
  } | null>(null);


  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllPendingClaimAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const handleReturn = () => {
    navigate(`/claim`);
  };


  const handleApproveClaim = async (claimId: string) => {
    setModalContent({
      title: "Are you sure you want to approve this claim?",
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${claimId}/approve-claim`, {});
          dispatch(fetchAllPendingClaimAsync({
            page: currentPage.toString(),
            limit: limit.toString(),
          }));
          toast.success("Claim approved successfully!");
        } catch (error) {
          console.log("Error approving claim: ", error);
          toast.error("Failed to approve claim.");
        }
      },
    });
    setModalVisible(true);
  };


  const handleRejectClaim = async (claimId: string) => {
    setModalContent({
      title: "Are you sure you want to reject this claim?",
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${claimId}/reject-claim`, {});
          dispatch(fetchAllPendingClaimAsync({
            page: currentPage.toString(),
            limit: limit.toString(),
          }));
          toast.success("Claim rejected successfully!");
        } catch (error) {
          console.log("Error rejecting claim: ", error);
          toast.error("Failed to reject claim.");
        }
      },
    });
    setModalVisible(true);
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
      key: "claim_id",
      dataIndex: "claim_id",
      title: "Claim ID",
    },
    {
      key: "username",
      dataIndex: "username",
      title: "Username",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
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
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
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

  const dataSource: DataRecord[] = claimList.map((a, index) => ({
    ...a,
    key: index,
    id: a.claim_id ? a.claim_id.toString() : "",
    claim_status: "pending",
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
        isHaveCheckbox={true}
      />
      <Modal
        open={modalVisible}
        title={modalContent?.title}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          modalContent?.onOk();
          setModalVisible(false);
        }}
      >
        <p>Do you want to proceed?</p>
      </Modal>
    </div>
  );
};
