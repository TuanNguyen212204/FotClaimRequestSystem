import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux";
import { selectApprovedClaimByUserID } from "@/redux/selector/claimSelector";
import { fetchClaimByUserWithApprovedStatusAsync } from "@/redux/thunk/Claim/claimThunk";
import TableComponent, {
  DataRecord,
  Column,
} from "@/components/ui/Table/Table";
import { EyeIcon } from "lucide-react";
import styles from "@components/ui/claimer/UserClaims.module.css";
import { useNavigate } from "react-router-dom";
import UserClaimDetailsModal from "@components/ui/claimer/UserClaimDetails";
import StatusTag from "@/components/ui/StatusTag/StatusTag";

export const ApprovedClaimByUserID = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userClaim = useSelector(selectApprovedClaimByUserID);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  const [limit] = useState(5);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     await dispatch(fetchClaimByUserAsync());
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [dispatch, currentPage]);
  // useEffect(() => {
  //   console.log(userClaim);
  // }, [userClaim]);

  // const handleViewDetail = (id: string) => {
  //   setSelectedClaim(id);
  //   setIsModalOpen(true);
  // };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      dispatch(
        fetchClaimByUserWithApprovedStatusAsync({ page: currentPage })
      ).finally(() => setLoading(false));
    };
    fetchData();
  }, [currentPage, dispatch]);

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
    return `${day}/${month}/${year}`;
  };

  const columns: Column[] = [
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
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Claim Status",
      cell: ({ value }: { value: unknown }) => {
        const stringValue = value as string;
        return (
          // <span
          //   style={{
          //     color:
          //       stringValue === "APPROVED"
          //         ? "green"
          //         : stringValue === "REJECTED"
          //         ? "red"
          //         : stringValue === "PENDING"
          //         ? "orange"
          //         : "inherit",
          //   }}
          // >
          //   {stringValue}
          // </span>
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
      title: "Action",
      cell: ({ value }) => (
        <>
          <EyeIcon
            className={styles.icon}
            onClick={() => handleViewDetail(value as string)}
          />
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
            claim.end_date
          )}`
        : "N/A",
  }));
  return (
    <div className={styles.container}>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={true}
        name="My Claims"
        totalPage={1}
      />
    </div>
  );
};
export default ApprovedClaimByUserID;
