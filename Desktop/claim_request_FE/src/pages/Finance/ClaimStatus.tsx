import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ClaimStatus.module.css";
import { Column } from "../../components/ui/Table/Table";
import { Printer } from "lucide-react";
import { AppDispatch } from "@/redux";
import { fetchPaidClaimsAsync } from "../../redux/slices/Claim/paidClaimsSlice";
import { ArrowLeft } from "lucide-react"; 

interface Project {
  project_id: string;
  project_name: string;
  time_durations: string;
}

interface ClaimData {
  claim_id: string;
  user_id: string;
  full_name: string;
  submitted_date: string;
  approved_date: string | null;
  total_working_hours: number;
  claim_status: string;
  project: Project;
}

const ClaimStatus: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: claims, loading } = useSelector((state: any) => state.paidClaims);

  useEffect(() => {
    dispatch(fetchPaidClaimsAsync("1"));
  }, [dispatch]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: Column[] = [
    { 
      key: 'claim_id', 
      dataIndex: 'claim_id', 
      title: 'Claim ID'
    },
    { 
      key: 'overtime_duration', 
      dataIndex: 'submitted_date', 
      title: 'Overtime Duration',
      cell: ({ record }) => (
        <div className={styles.dateRange}>
          <div>From: {formatDate((record as ClaimData).submitted_date)}</div>
          <div>To: {formatDate((record as ClaimData).approved_date)}</div>
        </div>
      )
    },
    { 
      key: 'overtime_date', 
      dataIndex: 'submitted_date', 
      title: 'Overtime Date',
      cell: ({ value }) => formatDate(value as string)
    },
    { 
      key: 'total_hours', 
      dataIndex: 'total_working_hours', 
      title: 'Total Hours',
      cell: ({ value }) => `${value} hours`
    },
    { 
      key: 'overtime_paid', 
      dataIndex: 'total_working_hours', 
      title: 'Overtime Paid',
      cell: ({ value }) => `${((value as number) * 25000).toLocaleString('vi-VN')} VND`
    },
    { 
      key: 'status', 
      dataIndex: 'claim_status', 
      title: 'Status',
      cell: () => <span className={styles.statusPaid}>Paid</span>
    }
  ];

  if (loading || !claims.length) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Claim Status</h1>
        </div>
        <div className={styles.loading}>
          {loading ? "Loading..." : `No claim information found for ID: ${id}`}
        </div>
      </div>
    );
  }

  const claimDetail = claims.find((claim: ClaimData) => claim.claim_id === id) || claims[0];
  const [startDate, endDate] = claimDetail.project.time_durations.split(' - ');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.title}>Claim Details</h1>
        <hr />
      </div>
      
      <div className={styles.infoBox}>
        <div className={styles.infoColumn}>
          <div className={styles.infoItem}>
            <label>User ID:</label>
            <span>{claimDetail.user_id}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Project Name:</label>
            <span>{claimDetail.project.project_name}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Project Duration:</label>
            <span>From: {startDate} To: {endDate}</span>
          </div>
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.infoItem}>
            <label>Staff Name:</label>
            <span>{claimDetail.full_name}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Project ID:</label>
            <span>{claimDetail.project.project_id}</span>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={column.key === 'status' ? styles.statusHeader : styles.tableHeader}
                >
                  <div className={styles.headerContent}>
                    {column.title}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {columns.map((column) => (
                <td 
                  key={column.key}
                  className={column.key === 'status' ? styles.statusCell : styles.tableCell}
                >
                  {column.cell ? 
                    column.cell({ 
                      value: claimDetail[column.dataIndex as keyof typeof claimDetail],
                      record: claimDetail 
                    }) 
                    : claimDetail[column.dataIndex as keyof typeof claimDetail]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.actions}>
        <button className={styles.printButton} onClick={() => window.print()}>
          <Printer size={16} />
          Print
        </button>
      </div>
    </div>
  );
};

export default ClaimStatus;
