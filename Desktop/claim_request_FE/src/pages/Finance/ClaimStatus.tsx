import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ClaimStatus.module.css";
import TableComponent, { Column } from "../../components/ui/Table/Table";
import { AppDispatch } from "@/redux";
import { fetchPaidClaimsAsync } from "../../redux/slices/Claim/paidClaimsSlice";

interface ClaimDetail {
  date: string;
  working_hours: number;
}

const ClaimStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: claims, loading } = useSelector((state: any) => state.paidClaims);

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
  );
};

export default ClaimStatus;
