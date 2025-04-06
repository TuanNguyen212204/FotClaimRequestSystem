import { selectMyClaim, selectTotalPage } from "@/redux/selector/claimSelector";
import { useEffect, useState } from "react";
import styles from "@components/ui/claimer/UserClaims.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import {
  fetchClaimByUserAsync,
  fetchTotalClaimByUserAsync,
} from "@redux/thunk/Claim/claimThunk";
import { EyeIcon } from "lucide-react";
import TableComponent, { Column, DataRecord } from "@components/ui/Table/Table";
import UserClaimDetailsModal from "@components/ui/claimer/UserClaimDetails";
import StatusTag from "@components/ui/StatusTag/StatusTag";
import { title } from "process";
import { Claim } from "@/types/Claim";
const RejectedClaimByUserID = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userClaim = useSelector(selectMyClaim);
  const totalPage = useSelector(selectTotalPage);
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

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     await dispatch(
  //       fetchClaimByUserAsync({ page: currentPage, status: "REJECTED" }),
  //     );
  //     setLoading(false);
  //     dispatch(fetchTotalClaimByUserAsync({ status: "REJECTED" }));
  //   };
  //   fetchData();
  //   console.log(totalPage);
  // }, [currentPage, dispatch, totalPage]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await dispatch(
        fetchClaimByUserAsync({ page: currentPage, status: "REJECTED" }),
      );
      await dispatch(fetchTotalClaimByUserAsync({ status: "REJECTED" }));
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

  const columns: Column<Claim>[] = [
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
      cell: ({ value }: { value: string }) => {
        const formattedValue = formatDateRange(value as string);
        return <span>{formattedValue}</span>;
      },
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
      title: "Total Working Hours",
      cell: ({ value }: { value: string }) => `${value} hours`,
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",

      cell: ({ value }: { value: string }) => {
        const formattedValue = formatDateRange(
          formatDateToDDMMYYYY(value as string),
        );
        return <span>{formattedValue}</span>;
      },
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Claim Status",
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
            claim.end_date,
          )}`
        : "N/A",
  }));
  return (
    // <div className={styles.container}>
    //   <TableComponent
    //     columns={columns}
    //     dataSource={dataSource}
    //     loading={loading}
    //     pagination={true}
    //     name="My Claims"
    //     totalPage={totalPage}
    //     onPageChange={handlePageChange}
    //   />
    // </div>
    <>
      <div className="mt-2 p-0">
        <div className="mb-10 ml-5">
          <h1 className="m-0 p-0">Rejected Claims</h1>
          <p className="m-0 p-0">
            Here you can view your rejected claims and their statuses.
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
export default RejectedClaimByUserID;
