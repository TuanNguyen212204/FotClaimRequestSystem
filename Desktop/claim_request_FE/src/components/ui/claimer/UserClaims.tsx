import { selectMyClaim } from "@/redux/selector/claimSelector";
import { useEffect, useState } from "react";
import styles from "./UserClaims.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import { fetchClaimByUserAsync } from "@redux/thunk/Claim/claimThunk";
import { EyeIcon } from "lucide-react";
import TableComponent, { Column, DataRecord } from "../Table/Table";
import UserClaimDetailsModal from "./UserClaimDetails";

const UserClaims = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userClaim = useSelector(selectMyClaim);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  const [limit] = useState(5);

  useEffect(() => {
    // dispatch(fetchClaimByUserAsync());
    const fetchData = async () => {
      await dispatch(fetchClaimByUserAsync());
      setLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);
  // useEffect(() => {
  // }, [userClaim]);

  const handleViewDetail = (id: string) => {
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
          <span
            style={{
              color:
                stringValue === "APPROVED"
                  ? "green"
                  : stringValue === "REJECTED"
                  ? "red"
                  : stringValue === "PENDING"
                  ? "orange"
                  : "inherit",
            }}
          >
            {stringValue}
          </span>
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
        loading={true}
        pagination={true}
        name="My Claims"
        totalPage={1}
      />
    </div>
  );
};
export default UserClaims;
