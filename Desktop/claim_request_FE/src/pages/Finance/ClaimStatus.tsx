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
  hours: string;
  paid: string;
  status: string;
}

interface ClaimInfo {
  claimId: string;
  projectName: string;
  duration: string;
  staffName: string;
  projectId: string;
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
        const response = await httpClient.get<ClaimInfo>(`/claims/${id}`);
        setClaimInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch claim info:', error);
      }
    };

    void fetchClaimInfo();
    void fetchData(`/claims/${id}/details`);
  }, [id, fetchData]);

  const columns: Column[] = [
    { key: 'id', dataIndex: 'id', title: 'No.' },
    { key: 'duration', dataIndex: 'duration', title: 'Overtime Duration' },
    { key: 'date', dataIndex: 'date', title: 'Overtime Date' },
    { key: 'hours', dataIndex: 'hours', title: 'Total No.Hours' },
    { key: 'paid', dataIndex: 'paid', title: 'Overtime Paid' },
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
  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
        <p>Loading...</p>
      </div>
    );
  }
  if (!claimInfo) {
    return (
      <div className={styles.container}>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
        <p>Không tìm thấy thông tin claim với ID: {id}</p>
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
          <p>Claim ID : {claimInfo.claimId}</p>
          <p>Project Name : {claimInfo.projectName}</p>
          <p>Project Duration : {claimInfo.duration}</p>
        </div>
        <div>
          <p>Staff Name : {claimInfo.staffName}</p>
          <p>Project ID : {claimInfo.projectId}</p>
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
