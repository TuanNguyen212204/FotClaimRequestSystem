import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ClaimStatus.module.css";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";
import httpClient from "../../constant/apiInstance";

interface ClaimDetail {
  id: string;
  duration: string;
  date: string;
  hours: number;
  paid: number;
  status: string;
}

interface ClaimInfo {
  claim_id: string;
  user_id: string;
  project: {
    project_id: string;
    project_name: string;
    time_durations: string;
  };
  total_working_hours: number;
  claim_status: string;
}

const ClaimStatus: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [claimInfo, setClaimInfo] = useState<ClaimInfo | null>(null);

  const {
    data: claimDetails,
    loading,
    pagination,
    setPage,
    fetchData
  } = useTable<ClaimDetail>({
    initialPageSize: 5
  });

  useEffect(() => {
    const fetchClaimInfo = async () => {
      try {
        const response = await httpClient.get<ClaimInfo>(`https://claimsystem.info.vn/api/v1/finance/claims/paid/{claimID}`);
        setClaimInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch claim info:', error);
      }
    };

    void fetchClaimInfo();
    void fetchData(`https://claimsystem.info.vn/api/v1/finance/claims/paid/{claimID}`);
  }, [id, fetchData]);

  const columns: Column[] = [
    { key: 'id', dataIndex: 'id', title: 'No.' },
    { key: 'duration', dataIndex: 'duration', title: 'Overtime Duration' },
    { key: 'date', dataIndex: 'date', title: 'Overtime Date' },
    { 
      key: 'hours', 
      dataIndex: 'hours', 
      title: 'Total Hours',
      cell: ({ value }) => <span>{value} hours</span>
    },
    { 
      key: 'paid', 
      dataIndex: 'paid', 
      title: 'Overtime Paid',
      cell: ({ value }) => <span>${value}</span>
    },
    { 
      key: 'status', 
      dataIndex: 'status', 
      title: 'Status',
      cell: () => <span className={styles.style_td_Status}>Paid</span>
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  if (loading || !claimInfo) {
    return (
      <div className={styles.container}>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
        <p>{loading ? "Loading..." : `No claim information found for ID: ${id}`}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
      </div>
      <div className={styles.box}>
        <div style={{ marginLeft: "50px" }}>
          <p>Claim ID: {claimInfo?.claim_id || 'N/A'}</p>
          <p>Project Name: {claimInfo?.project?.project_name || 'N/A'}</p>
          <p>Project Duration: {claimInfo?.project?.time_durations || 'N/A'}</p>
        </div>
        <div>
          <p>User ID: {claimInfo?.user_id || 'N/A'}</p>
          <p>Project ID: {claimInfo?.project?.project_id || 'N/A'}</p>
          <p>Total Working Hours: {claimInfo?.total_working_hours || 'N/A'}</p>
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
            {claimDetails.map((record) => (
              <tr key={record.id}>
                {columns.map((column) => (
                  <td 
                    key={`${record.id}-${column.key}`} 
                    className={column.key === 'status' ? styles.style_td_Status : styles.style_td}
                  >
                    {column.cell ? 
                      column.cell({ 
                        value: record[column.dataIndex as keyof typeof record], 
                        record 
                      }) 
                      : record[column.dataIndex as keyof typeof record]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={styles.pagination_container}>
        <div className={styles.pagination}>
          <button 
            onClick={() => setPage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={styles.pageButton}
          >
            Previous
          </button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`${styles.pageNumber} ${pagination.currentPage === page ? styles.activePage : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setPage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
        <button 
          className={styles.print_button}
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default ClaimStatus;
