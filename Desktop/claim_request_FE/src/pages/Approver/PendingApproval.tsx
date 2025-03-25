import TableComponent, {
  Column,
  DataRecord,
} from "@/components/ui/Table/Table";
import { useEffect, useState, useRef } from "react";
import {
  selectAllPending,
  selectAllPendingTotalPages,
} from "@/redux/selector/pendingSelector";
import httpClient from "@/constant/apiInstance.ts";
import {
  FileSearchIcon,
  CheckCircle2,
  XCircle,
  // ArrowLeftCircle,
  Undo2,
} from "lucide-react";
import styles from "@/pages/Approver/PendingApproval.module.css";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { AppDispatch } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPendingClaimAsync } from "@/redux/thunk/Claim/claimThunk";
import { toast } from "react-toastify";
import Modal from "@/components/ui/modal/Modal";
import StatusTag, { StatusType } from "@/components/ui/StatusTag/StatusTag";
import { DetailsApproval } from "./DetailsApproval";

export const PendingComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAllPending);
  const totalPages = useSelector(selectAllPendingTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(8);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    onOk: () => void;
  } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllPendingClaimAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const tableRef = useRef<{ getSelectionData: () => DataRecord[] }>(null);
  const [selectedData, setSelectedData] = useState<DataRecord[]>([]);

  const handleGetSelectedData = () => {
    if (tableRef.current) {
      const a = tableRef.current.getSelectionData();
      setSelectedData(a);
    }
  };

  const handleApproveClaim = async (request_id: string) => {
    handleGetSelectedData();
    setModalContent({
      title: "Are you sure you want to approve this claim?",
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${request_id}/approve-claim`, {});
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            })
          );
          toast.success("Claim approved successfully!");
        } catch (error) {
          console.log("Error approving claim: ", error);
          toast.error("Failed to approve claim.");
        }
      },
    });
    setModalVisible(true);
    console.log("Selected data:", selectedData);
  };

  const handleRejectClaim = async (request_id: string) => {
    handleGetSelectedData();
    setModalContent({
      title: "Are you sure you want to reject this claim?",
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${request_id}/reject-claim`, {});
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            })
          );
          toast.success("Claim rejected successfully!");
        } catch (error) {
          console.log("Error rejecting claim: ", error);
          toast.error("Failed to reject claim.");
        }
      },
    });
    setModalVisible(true);
    console.log("Selected data:", selectedData);
  };

  const handleReturnClaim = async (request_id: string) => {
    handleGetSelectedData();
    setModalContent({
      title: "Are you sure you want to return this claim?",
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${request_id}/return-claim`, {});
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            })
          );
          toast.success("Claim returned successfully!");
        } catch (error) {
          console.log("Error returning claim: ", error);
          toast.error("Failed to return claim.");
        }
      },
    });
    setModalVisible(true);
    console.log("Selected data:", selectedData);
  };

  const handleViewDetail = (value: string) => {
    setSelectedRequestId(value);
    setOpenModal(true);
  };

  // const handleViewDetail = (request_id: string) => {
  //   const selectedClaim = claimList.find(claim => claim.request_id === request_id);
  //   if (selectedClaim) {
  //     setDetailData(selectedClaim);
  //     setDetailModalVisible(true);
  //   }
  // };

  // const closeDetailModal = () => {
  //   setDetailModalVisible(false);
  // };

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

  const columns: Column<DataRecord>[] = [
    // {
    //   key: "request_id",
    //   dataIndex: "request_id",
    //   title: "Request ID",
    // },
    // {
    //   key: "user_id",
    //   dataIndex: "user_id",
    //   title: "User ID",
    // },
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
      cell: ({ value }) => <div>{isSalaryVisible ? value : "******"}</div>,
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Claim Status",
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: "",
      cell: ({ value }) => (
        <div className={styles.actions}>
          <Tooltip text="View Details" position="top">
            <FileSearchIcon
              className={styles.iconSearch}
              onClick={() => handleViewDetail(value as string)}
            />
            <DetailsApproval
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              requestId={selectedRequestId}
              currentPage={currentPage.toString()}
              limit={limit.toString()}
            />
          </Tooltip>
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
          <Tooltip text="Return" position="top">
            <Undo2
              className={styles.iconReturn}
              onClick={() => handleReturnClaim(value as string)}
            />
          </Tooltip>
          {/* <button
            className={styles.deleteButton}
            onClick={() => handleReturnClaim(value as string)}
          >
            Return
          </button> */}
        </div>
      ),
    },
  ];

  const dataSource: DataRecord[] = claimList.map((claim) => ({
    key: claim.request_id,
    ...claim,
    user_full_name: claim.user.full_name,
    user_salary: claim.user.salary,
    user_ot_rate: claim.user.ot_rate,
    claim_status: "pending",
  }));

  return (
    <div>
      <h1 className={styles.title}>Pending Claims</h1>
      {/* <nav className={styles.breadcrumb}>
        <Link to="/">My Claims</Link> &gt;{" "}
        <Link to="/pending-claim">Pending Approval</Link>
      </nav> */}
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        totalPage={totalPages}
        pagination={true}
        name="Claims"
        onPageChange={handlePageChange}
        isHaveCheckbox={false}
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
      {/* <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        {selectedRequestId && (
          <DetailsApproval
            request_id={selectedRequestId}
            setOpenModal={setOpenModal}
          />
        )}
      </Modal> */}
    </div>
  );
};
export default PendingComponent;
