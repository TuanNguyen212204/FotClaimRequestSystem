import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import ApprovedDetailFinanceModal from "@ui/finance/ApprovedDetailFinanceModal";
import StatusTag, { StatusType } from "../StatusTag/StatusTag";

// interface claimList {
//   claim_id?: string;
//   user_id?: string;
//   project_id?: string;
//   total_working_hours?: number;
//   submitted_date?: Date;
//   claim_status?: string;
//   project_name?: string;
// }
const formatDateToDDMMYYYY = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

export const ApprovedFinanceComponent: React.FC = () => {
  const { t } = useTranslation("finance");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectApprovedClaimFinance);
  const totalPages = useSelector(selectApprovedClaimTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchApprovedClaimsFinanceAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      }),
    ).finally(() => setLoading(false));
  }, [currentPage]);

  const handleViewDetail = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setSelectedRequestId(value);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const formatDateRange = (dateRange: any) => {
    return dateRange.replace(
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/g,
      (match, day, month, year) => {
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      },
    );
  };
  const columns: Column[] = [
    // {
    //   key: "request_id",
    //   dataIndex: "request_id",
    //   title: "Request ID",
    // },
    {
      key: "full_name",
      dataIndex: "full_name",
      title: t("finance.table.userName"),
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: t("finance.table.projectName"),
    },
    {
      key: "time_duration",
      dataIndex: "time_duration",
      title: t("finance.table.timeDuration"),
      cell: ({ value }) => formatDateRange(value as string),
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: t("finance.table.totalHours"),
      cell: ({ value }) => {
        return `${value} ${t("finance.table.hours")}`;
      },
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Claim Status",
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: "Action",
      cell: ({ value }) => (
        <>
          <EyeIcon
            className={styles.icon}
            onClick={() => handleViewDetail(value as string)}
          />

          <ApprovedDetailFinanceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            requestId={selectedRequestId}
            currentPage={currentPage.toString()}
            limit={limit.toString()}
          />
        </>
      ),
    },
  ];
  const dataSource: DataRecord[] = claimList.map((claim, index) => {
    return {
      ...claim,
      key: index,
      id: claim.request_id || "",
      project_name: claim.project_name || "",
      start_date: claim.start_date || null,
      end_date: claim.end_date || null,
      full_name: claim.full_name || "",
      status: claim.claim_status || "",
      time_duration:
        claim.start_date && claim.end_date
          ? `${formatDateToDDMMYYYY(claim.start_date)} - ${formatDateToDDMMYYYY(
              claim.end_date,
            )}`
          : "N/A",
    };
  });
  return (
    <div>
      <div className={styles.header}>
        <h1>{t("finance.title")}</h1>
      </div>
      <div className={styles.containerTable}>
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
    </div>
  );
};

export default ApprovedFinanceComponent;
