import { selectMyClaim, selectTotalPage } from "@/redux/selector/claimSelector";
import { useEffect, useState } from "react";
import styles from "@pages/DraftClaimPage/DraftClaimByUserID.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import {
  fetchClaimByUserAsync,
  fetchTotalClaimByUserAsync,
} from "@redux/thunk/Claim/claimThunk";
import { EyeIcon, SquarePen } from "lucide-react";
import TableComponent, { Column, DataRecord } from "@components/ui/Table/Table";
import UserClaimDetailsModal from "@components/ui/claimer/UserClaimDetails";
import StatusTag from "@components/ui/StatusTag/StatusTag";
import { useTranslation } from "react-i18next";
import { Claim } from "@/types/Claim";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { selectInitialValues } from "@/redux/slices/UpdateDraft";
import CreateClaimPage from "../CreateClaim";
import fetchClaims from "@/redux/thunk/Draft";

const DraftClaimByUserID = () => {
  const { t } = useTranslation("draftClaim");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userClaim = useSelector(selectMyClaim);
  const totalPage = useSelector(selectTotalPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  const [limit] = useState(5);
  const initValue = useSelector(selectInitialValues);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [recordToEdit, setRecordToEdit] = useState<any>(null);

  useEffect(() => {
    if (!isEditing) {
      setLoading(true);
      const fetchData = async () => {
        await dispatch(
          fetchClaimByUserAsync({ page: currentPage, status: "DRAFT" }),
        );
        setLoading(false);
        dispatch(fetchTotalClaimByUserAsync({ status: "DRAFT" }));
      };
      fetchData();
      console.log(totalPage);
    }
  }, [currentPage, dispatch, totalPage, isEditing]);

  const handleViewDetail = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setSelectedClaim(id);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  const formatDateToDDMMYYYY = (date: string) => {
    if (!date) return t("no_data");
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return t("no_data");
      const day = dateObj.getDate().toString().padStart(2, "0");
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
      const year = dateObj.getFullYear();
      return t("language") === "en"
        ? `${month}/${day}/${year}`
        : `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", date, error);
      return t("no_data");
    }
  };

  const formatDateRange = (dateRange: any) => {
    if (typeof dateRange !== "string") return t("no_data");
    return dateRange.replace(
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/g,
      (match, day, month, year) => {
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      },
    );
  };

  const handleEditClick = async (record: any) => {
    console.log("Editing record:", record);
    setRecordToEdit(record);
    await dispatch(fetchClaims(record.request_id));
    setIsEditing(true);
  };

  const handleReturnToTable = () => {
    setIsEditing(false);
    setRecordToEdit(null);
  };

  const columns: Column<Claim>[] = [
    {
      key: "project_id",
      dataIndex: "project_id",
      title: t("project_id_label"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("project_name_label"),
    },
    {
      key: "time_duration",
      dataIndex: "time_duration",
      title: t("time_duration_label"),
      cell: ({ value }: { value: string }) => {
        const formattedValue = formatDateRange(value as string);
        return <span>{formattedValue}</span>;
      },
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("total_working_hours_label"),
      cell: ({ value }: { value: string }) => `${value} ${t("hours_suffix")}`,
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: t("submitted_date_label"),
      cell: ({ value }) => {
        const formattedValue = formatDateToDDMMYYYY(value as string);
        return <span>{formattedValue}</span>;
      },
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: t("claim_status_label"),
      cell: ({ value }: { value: unknown }) => {
        return (
          <div>
            <StatusTag
              status={value as "PENDING" | "APPROVED" | "REJECTED" | "PAID"}
            />
          </div>
        );
      },
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: t("action_label"),
      cell: ({ value }: { value: string }) => (
        <>
          <Tooltip text={t("view_detail_tooltip")} placement="top">
            <EyeIcon
              className="cursor-pointer"
              onClick={() => handleViewDetail(value as string)}
            />
          </Tooltip>
          <UserClaimDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            requestID={selectedClaim}
            currentPage={currentPage.toString()}
            limit={limit.toString()}
          />
        </>
      ),
    },
    {
      key: "Submit",
      dataIndex: "submit",
      title: t("submit_label"),
      cell: ({ record }: { record: any }) => {
        return (
          <Tooltip text={t("submit_tooltip")} placement="top">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
              onClick={() => {}}
            >
              {t("submit_label")}
            </button>
          </Tooltip>
        );
      },
    },
    {
      key: "update",
      dataIndex: "update",
      title: t("update_label"),
      cell: ({ record }: { record: any }) => (
        <Tooltip text={t("edit_tooltip")} placement="top">
          <SquarePen
            className="cursor-pointer"
            onClick={() => handleEditClick(record)}
          />
        </Tooltip>
      ),
    },
  ];

  const dataSource: DataRecord[] = userClaim.map((claim, index) => ({
    ...claim,
    key: claim.request_id || index.toString(),
    id: claim.claim_id ? claim.claim_id.toString() : "",
    project_name: claim.project_name || "",
    start_date: claim.start_date || null,
    end_date: claim.end_date || null,
    status: claim.claim_status ? claim.claim_status : "",
    time_duration:
      claim.start_date && claim.end_date
        ? `${formatDateToDDMMYYYY(claim.start_date)} - ${formatDateToDDMMYYYY(
            claim.end_date,
          )}`
        : t("no_data"),
  }));

  if (isEditing) {
    if (!initValue) {
      return <div>{t("loading_editor")}</div>;
    }
    return (
      <CreateClaimPage
        initialValues={initValue}
        mode="update"
        formStatus="Draft"
        requestID={recordToEdit?.request_id}
        onReturn={handleReturnToTable}
      />
    );
  } else {
    return (
      <>
        <div className="mt-2 p-0">
          <div className="mb-10 ml-5">
            <h1 className="m-0 p-0">{t("draft_claims_title")}</h1>
            <p className="m-0 p-0">{t("description")}</p>
          </div>
          <div className={styles.tableContainer}>
            <TableComponent
              isHaveCheckbox={false}
              columns={columns as Column<DataRecord>[]}
              dataSource={dataSource}
              loading={loading}
              pagination={true}
              name={t("draft_claims_title")}
              totalPage={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
};

export default DraftClaimByUserID;
