import React, { useEffect, useState } from "react";
import styles from "@ui/approver/ApprovedApprover.module.css";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TableComponent, { Column, DataRecord } from "@ui/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedClaimsApproverAsync } from "@redux/thunk/Claim/claimThunk";
import { AppDispatch } from "@redux";
import {
  selectAppovedClaimApprover,
  selectApprovedClaimTotalPages,
} from "@redux/selector/claimSelector";
import ApprovedDetailApproverModal from "./ApprovedDetailApproverModal";
import ClaimDetail from "@/pages/ClaimDetail";

const formatDateToDDMMYYYY = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

export const ApprovedApproverComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const claimList = useSelector(selectAppovedClaimApprover);
  const totalPages = useSelector(selectApprovedClaimTotalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(7);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchApprovedClaimsApproverAsync({
        page: currentPage.toString(),
        limit: limit.toString(),
      })
    ).finally(() => setLoading(false));
  }, [currentPage]);

  // const handleViewDetail = (id: string) => {
  //   navigate(`/approve-details?id=${id}`);
  // };

  const handleViewDetail = (value: string, user_id: string) => {
    console.log("Selected Request ID:", value);
    console.log("Selected User ID:", user_id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setSelectedRequestId(value);
    setSelectedUserId(user_id);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới: ", newPage);
    setCurrentPage(newPage);
  };

  const columns: Column[] = [
    {
      key: "full_name",
      dataIndex: "full_name",
      title: "User Name",
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
    },
    {
      key: "time_duration",
      dataIndex: "time_duration",
      title: "Time Duration",
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: "Total Working Hours",
      cell: ({ value }) => `${value} hours`,
    },
    {
      key: "action",
      dataIndex: "request_id",
      title: "Action",
      cell: ({ value, record }) => (
        <>
          <EyeIcon
            className={styles.icon}
            onClick={() =>
              handleViewDetail(value as string, record.user_id as string)
            }
          />

          <ApprovedDetailApproverModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            requestId={selectedRequestId}
            userId={selectedUserId}
          />
        </>
      ),
    },
  ];
  const dataSource: DataRecord[] = claimList.map((claim, index) => ({
    ...claim,
    key: index,
    full_name: claim.user ? claim.user.full_name.toString() : "",
    time_duration:
      claim.start_date && claim.end_date
        ? `${formatDateToDDMMYYYY(claim.start_date)} - ${formatDateToDDMMYYYY(
            claim.end_date
          )}`
        : "N/A",
    user_id: claim.user_id ? claim.user_id.toString() : "",
  }));
  return (
    <div>
      <div>
        <h1>Approved Claims</h1>
      </div>
      <div>
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

export default ApprovedApproverComponent;
