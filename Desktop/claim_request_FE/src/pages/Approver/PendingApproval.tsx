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
import { Button } from "@/components/ui/button/Button";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date.ts";

export const PendingComponent: React.FC = () => {
  const { t } = useTranslation("pending");
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
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllPendingClaimAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      }),
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const checkboxRef = useRef<{
    getSelectedData: () => DataRecord[];
    getSortedData: () => DataRecord[];
    indeterminate?: boolean;
  }>(null);
  const [selectedData, setSelectedData] = useState<DataRecord[]>([]);

  // const handleSelectAll = () => {
  //   const allChecked = checkedItems.size === dataSource.length;
  //   if (allChecked) {
  //     setCheckedItems(new Set());
  //   } else {
  //     setCheckedItems(new Set(dataSource.map((record) => record.id || "")));
  //   }
  // };

  // const handleCheckboxChange = (requestId: string, checked: boolean) => {
  //   setCheckedItems((prev) => {
  //     const newCheckedItems = new Set(prev);
  //     if (checked) {
  //       newCheckedItems.add(requestId);
  //     } else {
  //       newCheckedItems.delete(requestId);
  //     }
  //     return newCheckedItems;
  //   });
  // };

  // const handleGetSelectedData = () => {
  //   const selectedClaims = dataSource.filter((record) =>
  //     checkedItems.has(record.request_id)
  //   );
  //   setSelectedData(selectedClaims);
  //   console.log("Selected claims:", selectedClaims);
  // };

  const handleGetSelectedData = () => {
    if (checkboxRef.current) {
      const selected = checkboxRef.current.getSelectedData();
      setSelectedData(selected);
      return selected;
    }
    return [];
  };

  useEffect(() => {
    if (checkboxRef.current) {
      const someChecked = checkedItems.size > 0;
      const allChecked = checkedItems.size === dataSource.length;
      checkboxRef.current.indeterminate = someChecked && !allChecked;
    }
  }, [checkedItems]);

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
            }),
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
            }),
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
            }),
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

  const handleApproveSelect = async () => {
    const selectedClaims = handleGetSelectedData();
    const requestIds = selectedClaims.map((claim) => claim.id as string);
    if (requestIds.length === 0) {
      toast.warn("Please select at least one claim to approve.");
      return;
    }
    setModalContent({
      title: `Are you sure you want to approve ${requestIds.length} claim(s)?`,
      onOk: async () => {
        try {
          await httpClient.post("/approvers/approve-multiple-claims", {
            request_ids: requestIds,
          });
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            }),
          );
          toast.success("Selected claims approved successfully!");
        } catch (error) {
          console.log("Error approving claims: ", error);
          toast.error("Failed to approve selected claims.");
        }
      },
    });
    setModalVisible(true);
  };

  const handleRejectSelect = async () => {
    const selectedClaims = handleGetSelectedData();
    const requestIds = selectedClaims.map((claim) => claim.id as string);
    if (requestIds.length === 0) {
      toast.warn("Please select at least one claim to reject.");
      return;
    }
    setModalContent({
      title: `Are you sure you want to reject ${requestIds.length} claim(s)?`,
      onOk: async () => {
        try {
          await httpClient.post("/approvers/reject-multiple-claims", {
            request_ids: requestIds,
          });
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            }),
          );
          toast.success("Selected claims reject successfully!");
        } catch (error) {
          console.log("Error approving claims: ", error);
          toast.error("Failed to reject selected claims.");
        }
      },
    });
    setModalVisible(true);
  };

  const handleReturnSelect = async () => {
    const selectedClaims = handleGetSelectedData();
    const requestIds = selectedClaims.map((claim) => claim.id as string);
    if (requestIds.length === 0) {
      toast.warn("Please select at least one claim to return.");
      return;
    }
    setModalContent({
      title: `Are you sure you want to return ${requestIds.length} claim(s)?`,
      onOk: async () => {
        try {
          await httpClient.post("/approvers/return-multiple-claims", {
            request_ids: requestIds,
          });
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            }),
          );
          toast.success("Selected claims return successfully!");
        } catch (error) {
          console.log("Error approving claims: ", error);
          toast.error("Failed to return selected claims.");
        }
      },
    });
    setModalVisible(true);
  };

  const handleViewDetail = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setSelectedRequestId(value);
    setOpenModal(true);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  // const formatDateToDDMMYYYY = (date: string) => {
  //   const dateObj = new Date(date);
  //   const day = dateObj.getDate();
  //   const month = dateObj.getMonth() + 1;
  //   const year = dateObj.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  const columns: Column<DataRecord>[] = [
    {
      key: "user_name",
      dataIndex: "user_full_name",
      title: t("columns.fullName"),
    },
    {
      key: "email",
      dataIndex: "email",
      title: t("columns.email"),
    },
    {
      key: "start_date",
      dataIndex: "start_date",
      title: t("columns.startDate"),
      cell: ({ value }) => formatDate(value as string),
    },
    {
      key: "end_date",
      dataIndex: "end_date",
      title: t("columns.endDate"),
      cell: ({ value }) => formatDate(value as string),
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("columns.totalHours"),
    },
    // {
    //   key: "project_id",
    //   dataIndex: "project_id",
    //   title: t("columns.projectId"),
    // },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("columns.projectName"),
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: t("columns.submittedDate"),
      cell: ({ value }) => formatDate(value as string),
    },
    // {
    //   key: "salary",
    //   dataIndex: "user_salary",
    //   title: t("columns.salary"),
    //   cell: ({ value }) => <div>{isSalaryVisible ? value : "******"}</div>,
    // },
    // {
    //   key: "ot_rate",
    //   dataIndex: "user_ot_rate",
    //   title: t("columns.otRate"),
    // },
    // {
    //   key: "salary_overtime",
    //   dataIndex: "salary_overtime",
    //   title: t("columns.salaryOvertime"),
    //   cell: ({ value }) => (
    //     <div>{isSalaryVisible ? value : "*****************"}</div>
    //   ),
    // },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("columns.claimStatus"),
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: "Action",
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
        </div>
      ),
    },
  ];

  const dataSource: DataRecord[] = claimList.map((claim) => ({
    key: claim.request_id,
    ...claim,
    user_full_name: claim.user.full_name,
    email: claim.user.email,
    user_salary: claim.user.salary,
    user_ot_rate: claim.user.ot_rate,
    claim_status: "PENDING",
    id: claim.request_id,
  }));

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.title2}>
          {t("subtitle")}
        </p>
        <div className={styles.buttonContainer}>
          {!loading && (
            <>
              <Button
                color="white"
                backgroundColor="#89AC46"
                size="small"
                style={{ borderRadius: "10px" }}
                onClick={handleApproveSelect}
              >
                {t("approveSelected")}
              </Button>
              <Button
                danger
                size="small"
                onClick={handleRejectSelect}
                style={{ borderRadius: "10px" }}
              >
                {t("rejectSelected")}
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={handleReturnSelect}
                style={{ borderRadius: "10px" }}
              >
                {t("returnSelected")}
              </Button>
            </>
          )}
        </div>
      </div>
      <TableComponent
        ref={checkboxRef}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        totalPage={totalPages}
        pagination={true}
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
export default PendingComponent;
