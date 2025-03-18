import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import TableComponent, { Column, DataRecord } from "../../components/ui/Table/Table";
import { fetchPaidClaimsAsync } from "../../redux/slices/Claim/paidClaimsSlice";
import { AppDispatch } from "@/redux";

interface ClaimData extends DataRecord {
  request_id: string;
  user_id: string;
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  submitted_date: string;
  approved_date: string;
  paid_date: string;
  claim_status: string;
  full_name: string;
  salary_overtime: string;
  claim_details: { date: string; working_hours: number; }[];
}

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: claims, loading, totalPages, currentPage } = useSelector((state: any) => state.paidClaims);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPaidClaimsAsync("1"));
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const columns: Column<ClaimData>[] = [
    { 
      key: 'no', 
      dataIndex: 'no',
      title: 'No',
      width: '80px'
    },
    { key: 'full_name', dataIndex: 'full_name', title: 'Staff Name' },
    { key: 'project_name', dataIndex: 'project_name', title: 'Project Name' },
    { 
      key: 'date_range', 
      dataIndex: 'start_date', 
      title: 'Project Duration',
      cell: ({ record }) => (
        <div>
          <div>From: {formatDate(record.start_date)}</div>
          <div>To: {formatDate(record.end_date)}</div>
        </div>
      )
    },
    { 
      key: 'total_hours', 
      dataIndex: 'total_hours', 
      title: 'Total Hours Working',
      cell: ({ value }) => `${value} hours`
    },
    {
      key: 'action',
      dataIndex: 'request_id',
      title: 'Action',
      cell: ({ value }) => (
        <button 
          className={styles.detailButton}
          onClick={() => navigate(`${PATH.claimStatus}/${value}`)}
        >
          Details
        </button>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Paid Claims</h1>
        <hr />
      </div>

      <TableComponent
        columns={columns as Column<DataRecord>[]}
        dataSource={claims.map((claim: ClaimData, idx) => ({
          ...claim,
          key: claim.request_id,
          no: String(idx + 1).padStart(3, '0')
        }))}
        loading={loading}
        pagination={true}
        pageLength={10}
        totalPage={totalPages}
        name="Paid Claims"
        onPageChange={(page) => dispatch(fetchPaidClaimsAsync(page.toString()))}
      />
    </div>
  );
};

export default PaidClaims;
