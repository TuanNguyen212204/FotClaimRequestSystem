import { selectMyClaim } from "@/redux/selector/claimSelector";
import { useEffect, useState } from "react";
import styles from "./UserClaims.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import { fetchClaimByUserAsync } from "@redux/thunk/Claim/claimThunk";
import { EyeIcon } from "lucide-react";
import TableComponent, { Column, DataRecord } from "../Table/Table";

interface userClaims {
  claim_id?: string;
  project_name?: string;
  total_working_hours?: number;
  submitted_date?: Date;
  claim_status?: string;
}

const UserClaims = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userClaim = useSelector(selectMyClaim);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // dispatch(fetchClaimByUserAsync());
    const fetchData = async () => {
      await dispatch(fetchClaimByUserAsync(currentPage.toString()));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);
  useEffect(() => {
    console.log(userClaim);
  }, [userClaim]);

  const handleViewDetail = (id: string) => {
    navigate(`/claim-detail?id=${id}`);
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
      key: "total_working_hours",
      dataIndex: "total_working_hours",
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
    },
    {
      key: "action",
      dataIndex: "claim_id",
      title: "Action",
      cell: ({ value }) => (
        <EyeIcon
          className={styles.icon}
          onClick={() => handleViewDetail(value as string)}
        />
      ),
    },
  ];
  const dataSource: DataRecord[] = userClaim.map((claim, index) => ({
    ...claim,
    key: index,
    id: claim.claim_id ? claim.claim_id.toString() : "",
    status: claim.claim_id ? claim.claim_id : "",
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
