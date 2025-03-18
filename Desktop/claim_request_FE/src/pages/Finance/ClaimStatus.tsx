import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; 
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
  const navigate = useNavigate(); 
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
          <IoArrowBack size={20} />
        </button>
        <h1 className={styles.title}>Claim Status</h1>
      </div>
      <div className={styles.userInfo}>
        <p>User ID: {selectedClaim?.user_id}</p>
        <p>User Name: {selectedClaim?.full_name}</p>
      </div>

      <div className={styles.tableContainer}>
        <TableComponent
          columns={[
            { 
              key: 'claim_id', 
              dataIndex: 'claim_id', 
              title: 'Claim ID',
              cell: () => `C${String(selectedClaim?.request_id).padStart(3, '0')}`
            },
            { key: 'project_name', dataIndex: 'project_name', title: 'Project Name' },
            { 
              key: 'overtime_duration', 
              dataIndex: 'overtime_duration', 
              title: 'Overtime Duration',
              cell: () => (
                <div>
                  <div>From: {formatDate(selectedClaim?.start_date)}</div>
                  <div>To: {formatDate(selectedClaim?.end_date)}</div>
                </div>
              )
            },
            { 
              key: 'total_hours', 
              dataIndex: 'total_hours', 
              title: 'Total Working Hours',
              cell: () => `${selectedClaim?.total_hours} hours`
            },
            {
              key: 'overtime_paid',
              dataIndex: 'salary_overtime',
              title: 'Overtime Paid',
              cell: () => `${Number(selectedClaim?.salary_overtime).toLocaleString('vi-VN')} USD`
            },
            {
              key: 'status',
              dataIndex: 'claim_status',
              title: 'Status',
              cell: () => (
                <div className={styles.statusPaid}>
                  Paid
                </div>
              )
            },
            {
              key: 'action',
              title: 'Action',
              cell: () => (
                <button 
                  className={styles.printButton}
                  onClick={() => window.print()}
                >
                  Print
                </button>
              )
            }
          ]}
          dataSource={[{ ...selectedClaim, key: selectedClaim?.request_id }]}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ClaimStatus;
