import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ClaimStatus.module.css";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";
import httpClient from "../../constant/apiInstance";

interface ClaimData {
  claim_id: string;
  user_id: string;
  full_name: string;
  submitted_date: string;
  approved_date: string | null;
  total_working_hours: number;
  claim_status: string;
  project: {
    project_id: string;
    project_name: string;
    time_durations: string;
  };
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Pending';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const ClaimStatus: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: claims, loading, pagination, setPage, fetchData } = useTable<ClaimData>({
    initialPageSize: 5
  });

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchClaimData = async () => {
      try {
        await fetchData('https://claimsystem.info.vn/api/v1/finance/claims/paid');
      } catch (error) {
        console.error('Failed to fetch claims:', error);
      }
    };
    void fetchClaimData();
  }, [fetchData]);

  if (loading || !claims.length) {
    return (
      <div className={styles.container}>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
        <p>{loading ? "Loading..." : `No claim information found for ID: ${id}`}</p>
      </div>
    );
  }

  const claimInfo = claims.find(claim => claim.claim_id === id) || claims[0];

  const columns: Column[] = [
    { 
      key: 'no', 
      dataIndex: 'claim_id', 
      title: 'No.',
    },
    { 
      key: 'overtime_duration', 
      dataIndex: 'submitted_date', 
      title: 'Overtime Duration',
      cell: ({ record }) => (
        <>
          From: {formatDate(record.submitted_date)}<br />
          To: {formatDate(record.approved_date)}
        </>
      )
    },
    { 
      key: 'overtime_date', 
      dataIndex: 'submitted_date', 
      title: 'Overtime Date',
      cell: ({ value }) => formatDate(value)
    },
    { 
      key: 'total_hours', 
      dataIndex: 'total_working_hours', 
      title: 'Total No. Hours',
      cell: ({ value }) => `${value} hours`
    },
    { 
      key: 'overtime_paid', 
      dataIndex: 'total_working_hours', 
      title: 'Overtime Paid',
      cell: ({ value }) => `${(value * 25000).toLocaleString('vi-VN')}vnd`
    },
    { 
      key: 'status', 
      dataIndex: 'claim_status', 
      title: 'Status',
      cell: () => <span className={styles.style_td_Status}>Paid</span>
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.claimStatus_h1}>Claim Status</h1>
      
      <div className={styles.box}>
        <div>
          <p>Claim ID: {claimInfo.claim_id}</p>
          <p>Project Name: {claimInfo.project.project_name}</p>
        </div>
        <div>
          <p>Staff Name: {claimInfo.full_name}</p>
          <p>Project Duration: {claimInfo.project.time_durations}</p>
        </div>
      </div>

      <div className={styles["table-container"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={column.key === 'status' ? styles.style_th_Status : styles.style_th}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {columns.map((column) => (
                <td 
                  key={column.key}
                  className={column.key === 'status' ? styles.style_td_Status : styles.style_td}
                >
                  {column.cell ? 
                    column.cell({ 
                      value: claimInfo[column.dataIndex as keyof typeof claimInfo],
                      record: claimInfo 
                    }) 
                    : claimInfo[column.dataIndex as keyof typeof claimInfo]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.pagination_container}>
        <button className={styles.print_button} onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default ClaimStatus;
