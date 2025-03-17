import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ClaimStatus.module.css";
import TableComponent, { Column } from "../../components/ui/Table/Table";
import { AppDispatch } from "@/redux";
import { fetchPaidClaimsAsync } from "../../redux/slices/Claim/paidClaimsSlice";
import { useNavigate } from "react-router-dom"; // Add this import at the top

interface ClaimDetail {
  date: string;
  working_hours: number;
}

const ClaimStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: claims, loading } = useSelector((state: any) => state.paidClaims);
  const navigate = useNavigate(); // Add this hook
  useEffect(() => {
    dispatch(fetchPaidClaimsAsync("1"));
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: Column<ClaimDetail>[] = [
    { 
      key: 'date', 
      dataIndex: 'date', 
      title: 'Date',
      cell: ({ value }) => formatDate(value)
    },
    { 
      key: 'working_hours', 
      dataIndex: 'working_hours', 
      title: 'Working Hours',
      cell: ({ value }) => `${value} hours`
    },
    {
      key: 'hourly_rate',
      dataIndex: 'working_hours',
      title: 'Amount',
      cell: ({ value }) => {
        const hourlyRate = Number(selectedClaim.salary_overtime) / selectedClaim.total_hours;
        const amount = hourlyRate * value;
        return `${amount.toLocaleString('vi-VN')} USD`;
      }
    },
    {
      key: 'average_rate',
      dataIndex: 'working_hours',
      title: 'Hourly Rate',
      cell: () => {
        const hourlyRate = Number(selectedClaim.salary_overtime) / selectedClaim.total_hours;
        return `${hourlyRate.toLocaleString('vi-VN')} USD/hour`;
      }
    },
    {
      key: 'status',
      dataIndex: 'working_hours',
      title: 'Status',
      cell: () => (
        <div className={styles.statusPaid}>
          Paid
        </div>
      )
    }
  ];

  if (loading || !claims?.length) {
    return <div className={styles.loading}>Loading claim details...</div>;
  }

  const selectedClaim = claims.find((claim: any) => claim.request_id === id);
  
  if (!selectedClaim?.claim_details?.length) {
    return <div className={styles.loading}>No overtime details found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </button>
      </div>
      <div className={styles.tableContainer}>
        <TableComponent
          columns={columns}
          dataSource={selectedClaim.claim_details.map((detail: ClaimDetail, index: number) => ({
            ...detail,
            key: `${selectedClaim.request_id}-${index}`
          }))}
          loading={loading}
          pagination={false}
          name="Claim Details"
        />
      </div>
      <div className={styles.actions}>
        <button 
          className={styles.printButton}
          onClick={() => window.print()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
          </svg>
          Print
        </button>
      </div>
    </div>
  );
};

export default ClaimStatus;
