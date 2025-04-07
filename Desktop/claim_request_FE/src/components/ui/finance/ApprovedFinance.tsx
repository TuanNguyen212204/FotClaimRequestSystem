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
import { Claim } from "@/types/Claim";
import { toast } from "react-toastify";

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
  }, [currentPage, dispatch]);

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

  const formatDateRange = (dateRange: string) => {
    return dateRange.replace(
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/g,
      (_: string, day: string, month: string, year: string) => {
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      },
    );
  };

  const username = localStorage.getItem("username");
  const count = localStorage.getItem("count");
  useEffect(() => {
    if (count === "0") {
      toast.success(
        t("finance.welcome_message", {
          username: username || "User",
        }),
      );
      localStorage.setItem("count", "1");
    }
  }, [username, t]);

  const columns: Column<Claim>[] = [
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
      title: t("finance.modal.status"),
      cell: ({ value }) => <StatusTag status={value as StatusType} />,
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: t("finance.table.action"),
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
          columns={columns as Column<DataRecord>[]}
          dataSource={dataSource}
          loading={loading}
          totalPage={totalPages}
          pagination={true}
          name={t("finance.table.name")}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ApprovedFinanceComponent;
