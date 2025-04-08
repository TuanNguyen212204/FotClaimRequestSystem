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
  Undo2,
  Check,
  X,
  RotateCcw,
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
  const [limit] = useState(6);
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

  const username = localStorage.getItem("username");
  const count = localStorage.getItem("count");
  useEffect(() => {
    if (count === "0" && username) {
      toast.success(t("welcome_message", { username }));
      localStorage.setItem("count", "1");
    }
  }, [username, t]);

  const handleApproveClaim = async (request_id: string) => {
    handleGetSelectedData();
    setModalContent({
      title: t("modal.approve_title"),
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${request_id}/approve-claim`, {});
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            }),
          );
          toast.success(t("modal.approve_success"));
        } catch (error) {
          console.log("Error approving claim: ", error);
          toast.error(t("modal.approve_error"));
        }
      },
    });
    setModalVisible(true);
    console.log("Selected data:", selectedData);
  };

  const handleRejectClaim = async (request_id: string) => {
    handleGetSelectedData();
    setModalContent({
      title: t("modal.reject_title"),
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${request_id}/reject-claim`, {});
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            }),
          );
          toast.success(t("modal.reject_success"));
        } catch (error) {
          console.log("Error rejecting claim: ", error);
          toast.error(t("modal.reject_error"));
        }
      },
    });
    setModalVisible(true);
    console.log("Selected data:", selectedData);
  };

  const handleReturnClaim = async (request_id: string) => {
    handleGetSelectedData();
    setModalContent({
      title: t("modal.return_title"),
      onOk: async () => {
        try {
          await httpClient.post(`/approvers/${request_id}/return-claim`, {});
          dispatch(
            fetchAllPendingClaimAsync({
              page: currentPage.toString(),
              limit: limit.toString(),
            }),
          );
          toast.success(t("modal.return_success"));
        } catch (error) {
          console.log("Error returning claim: ", error);
          toast.error(t("modal.return_error"));
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
      toast.warn(t("modal.select_at_least_one_to_approve"));
      return;
    }
    setModalContent({
      title: t("modal.approve_multiple_title", { count: requestIds.length }),
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
          toast.success(t("modal.approve_multiple_success"));
        } catch (error) {
          console.log("Error approving claims: ", error);
          toast.error(t("modal.approve_multiple_error"));
        }
      },
    });
    setModalVisible(true);
  };

  const handleRejectSelect = async () => {
    const selectedClaims = handleGetSelectedData();
    const requestIds = selectedClaims.map((claim) => claim.id as string);
    if (requestIds.length === 0) {
      toast.warn(t("modal.select_at_least_one_to_reject"));
      return;
    }
    setModalContent({
      title: t("modal.reject_multiple_title", { count: requestIds.length }),
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
          toast.success(t("modal.reject_multiple_success"));
        } catch (error) {
          console.log("Error approving claims: ", error);
          toast.error(t("modal.reject_multiple_error"));
        }
      },
    });
    setModalVisible(true);
  };

  const handleReturnSelect = async () => {
    const selectedClaims = handleGetSelectedData();
    const requestIds = selectedClaims.map((claim) => claim.id as string);
    if (requestIds.length === 0) {
      toast.warn(t("modal.select_at_least_one_to_return"));
      return;
    }
    setModalContent({
      title: t("modal.return_multiple_title", { count: requestIds.length }),
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
          toast.success(t("modal.return_multiple_success"));
        } catch (error) {
          console.log("Error approving claims: ", error);
          toast.error(t("modal.return_multiple_error"));
        }
      },
    });
    setModalVisible(true);
  };

  const handleViewDetail = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    setSelectedRequestId(value);
    setOpenModal(true);
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

  const formatDateRange = (dateRange: any) => {
    return dateRange.replace(
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/g,
      (match, day, month, year) => {
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      },
    );
  };

  const columns: Column<DataRecord>[] = [
    {
      key: "user_name",
      dataIndex: "user_full_name",
      title: t("columns.full_name"),
    },
    {
      key: "email",
      dataIndex: "email",
      title: t("columns.email"),
    },
    {
      key: "start_date",
      dataIndex: "start_date",
      title: t("columns.start_date"),
      cell: ({ value }) =>
        formatDateRange(formatDateToDDMMYYYY(value as string)),
    },
    {
      key: "end_date",
      dataIndex: "end_date",
      title: t("columns.end_date"),
      cell: ({ value }) =>
        formatDateRange(formatDateToDDMMYYYY(value as string)),
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("columns.total_hours"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("columns.project_name"),
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: t("columns.submitted_date"),
      cell: ({ value }) =>
        formatDateRange(formatDateToDDMMYYYY(value as string)),
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("columns.claim_status"),
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: t("columns.action"),
      cell: ({ value }) => (
        <div className={styles.actions}>
          <Tooltip text={t("tooltip.details")} position="top">
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
          <Tooltip text={t("tooltip.approve")} position="top">
            <CheckCircle2
              className={styles.iconApprove}
              onClick={() => handleApproveClaim(value as string)}
            />
          </Tooltip>
          <Tooltip text={t("tooltip.reject")} position="top">
            <XCircle
              className={styles.iconReject}
              onClick={() => handleRejectClaim(value as string)}
            />
          </Tooltip>
          <Tooltip text={t("tooltip.return")} position="top">
            <RotateCcw
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
        <div className="flex">
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.title2}>{t("subtitle")}</p>
        </div>
      </div>
      <div className={styles.containerTable}>
        <div className={styles.buttonContainer}>
          {!loading && (
            <>
              <Button
                color="white"
                size="large"
                style={{
                  borderRadius: "10px",
                  background: "linear-gradient(90deg, #89AC46, #6B8E23)",
                }}
                onClick={handleApproveSelect}
                icon={<Check />}
              >
                {t("approve_selected")}
              </Button>
              <Button
                danger
                size="large"
                onClick={handleRejectSelect}
                style={{
                  borderRadius: "10px",
                  background: "linear-gradient(90deg, #FF6347, #FF4500)",
                  color: "white",
                }}
                icon={<X />}
              >
                {t("reject_selected")}
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleReturnSelect}
                style={{
                  borderRadius: "10px",
                  background: "linear-gradient(90deg, #4682B4, #1E90FF)",
                  color: "white",
                }}
                icon={<RotateCcw />}
              >
                {t("return_selected")}
              </Button>
            </>
          )}
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
      </div>
      <Modal
        open={modalVisible}
        title={modalContent?.title}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          modalContent?.onOk();
          setModalVisible(false);
        }}
        buttonCancel={t("modal.cancel_button")}
        buttonOk={t("modal.confirm_button")}
      >
        <p>{t("modal.confirm_message")}</p>
      </Modal>
    </div>
  );
};

export default PendingComponent;
