import { selectMyClaim, selectTotalPage } from "@/redux/selector/claimSelector";
import { useEffect, useState } from "react";
import styles from "./UserClaims.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import {
  fetchClaimByUserAsync,
  fetchTotalClaimByUserAsync,
} from "@redux/thunk/Claim/claimThunk";
import { EyeIcon } from "lucide-react";
import TableComponent, { Column, DataRecord } from "../Table/Table";
import UserClaimDetailsModal from "./UserClaimDetails";
import StatusTag from "../StatusTag/StatusTag";
import { useTranslation } from "react-i18next";
import { Claim } from "@/types/Claim";
import { C } from "node_modules/framer-motion/dist/types.d-B50aGbjN";

const UserClaims = () => {
  const { t } = useTranslation("userClaims");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userClaim = useSelector(selectMyClaim);
  const totalPage = useSelector(selectTotalPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  const [limit] = useState(5);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await dispatch(fetchClaimByUserAsync({ page: currentPage }));
      await dispatch(fetchTotalClaimByUserAsync({}));
      setLoading(false);
    };
    fetchData();
    console.log(totalPage);
  }, [currentPage, dispatch, totalPage]);

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
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return t("language") === "en"
      ? `${month}/${day}/${year}`
      : `${day}/${month}/${year}`;
  };

  const formatDateRange = (dateRange: any) => {
    return dateRange.replace(
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/g,
      (match: string, day: string, month: string, year: string) => {
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      },
    );
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
      cell: ({ value }) => {
        const formattedValue = formatDateRange(value as string);
        return <span>{formattedValue}</span>;
      },
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("total_working_hours_label"),
      cell: ({ value }) => `${value} ${t("hours_suffix")}`,
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: t("submitted_date_label"),
      cell: ({ value }) =>
        formatDateRange(formatDateToDDMMYYYY(value as string)),
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
      cell: ({ value }) => (
        <div className="flex items-center justify-center gap-2">
          <EyeIcon
            className="cursor-pointer"
            onClick={() => handleViewDetail(value as string)}
          />
          <UserClaimDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            requestID={selectedClaim}
            currentPage={currentPage.toString()}
            limit={limit.toString()}
          />
        </div>
      ),
    },
  ];

  const dataSource: DataRecord[] = userClaim.map((claim, index) => ({
    ...claim,
    key: index,
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

  return (
    <>
      <div className="mt-2 p-0">
        <div className="mb-10 ml-5">
          <h1 className="m-0 p-0">My Claims</h1>
          <p className="m-0 p-0">
            Here you can view all your claims and their statuses.
          </p>
        </div>
        <div className={`${styles.tableContainer}`}>
          <TableComponent
            isHaveCheckbox={false}
            columns={columns as Column<DataRecord>[]}
            dataSource={dataSource}
            loading={loading}
            pagination={true}
            name="My Claims"
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default UserClaims;
