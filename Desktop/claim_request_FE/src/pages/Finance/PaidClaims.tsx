import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";
import httpClient from "../../constant/apiInstance";

interface ClaimData {
  id: string;
  claimId: string;
  staffName: string;
  projectName: string;
  duration: string;
  totalHours: number;
  approverName: string;
  status: string;
}

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();

  const fetchPaidClaims = async () => {
    try {
      const response = await httpClient.get<ClaimData[]>('/paidclaims');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch paid claims:', error);
      return [];
    }
  };

  const {
    data: claims,
    loading,
    pagination,
    setPage,
    fetchData
  } = useTable<ClaimData>({
    initialPageSize: 5
  });

  useEffect(() => {
    void fetchData('/paidclaims');
  }, []);

  const columns: Column[] = [
    { key: 'claimId', dataIndex: 'claimId', title: 'Claim ID' },
    { key: 'staffName', dataIndex: 'staffName', title: 'Staff Name' },
    { key: 'projectName', dataIndex: 'projectName', title: 'Project Name' },
    { key: 'duration', dataIndex: 'duration', title: 'Project Duration' },
    { 
      key: 'totalHours', 
      dataIndex: 'totalHours', 
      title: 'Total Hours Working',
      cell: () => <span>100 hours</span>
    },
    { 
      key: 'approverName', 
      dataIndex: 'approverName', 
      title: 'Approver Name',
      cell: () => <span>Marco</span>
    },
    {
      key: 'action',
      dataIndex: 'claimId',
      title: 'Action',
      cell: ({ value }) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => navigate(`${PATH.claimStatus}/${value}`)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            👁
          </button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.claimStatus_h1}>Paid Claims</h1>
        <hr style={{ width: "100%" }} />
      </div>
      
      <div
        style={{
          overflow: "hidden",
          borderRadius: "10px",
          border: "2px solid black",
          marginBottom: "20px"
        }}
      >
        <table className={styles.table}>
          <thead>
            <tr className={styles.style_tr}>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={styles.style_th}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            {currentClaims.map((claim) => (
              <tr key={claim.claimId}>
                <td className={styles.style_td}>{claim.claimId}</td>
                <td className={styles.style_td}>{claim.staffName}</td>
                <td className={styles.style_td}>{claim.projectName}</td>
                <td className={styles.style_td}>{claim.duration}</td>
                <td className={styles.style_td}>100 hours</td>
                <td className={styles.style_td}>Marco</td>
                <td className={styles.style_td}>
                  <button
                    onClick={() =>
                      navigate(`${PATH.claimStatus}/${claim.claimId}`)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    👁
                  </button>
=======
            {loading ? (
              <tr>
                <td colSpan={columns.length} className={styles.style_td}>
                  Loading...
>>>>>>> ae97e2172896a83fd03e33eaf84c7d413adf2aa2
                </td>
              </tr>
            ) : claims.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.style_td}>
                  No data available
                </td>
              </tr>
            ) : (
              claims.map((claim) => (
                <tr key={claim.claimId}>
                  {columns.map((column) => (
                    <td key={`${claim.claimId}-${column.key}`} className={styles.style_td}>
                      {column.cell ? 
                        column.cell({ 
                          value: claim[column.dataIndex as keyof typeof claim], 
                          record: claim 
                        }) 
                        : claim[column.dataIndex as keyof typeof claim]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
<<<<<<< HEAD

      <Pagination
        total={claims.length}
        defaultPageSize={5}
        defaultCurrent={1}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={handlePageChange}
      />
=======
      
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
>>>>>>> ae97e2172896a83fd03e33eaf84c7d413adf2aa2
    </div>
  );
};

export default PaidClaims;
