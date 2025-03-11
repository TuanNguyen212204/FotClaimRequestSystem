import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";

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

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Pending';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const { data: claims, loading, pagination, setPage, fetchData } = useTable<ClaimData>({
    initialPageSize: 5
  });

  useEffect(() => {
    void fetchData('https://claimsystem.info.vn/api/v1/finance/claims/paid');
  }, [fetchData]);

  const columns: Column[] = [
    { key: 'claim_id', dataIndex: 'claim_id', title: 'Claim ID' },
    { key: 'full_name', dataIndex: 'full_name', title: 'Employee Name' },
    { key: 'project_name', dataIndex: ['project', 'project_name'], title: 'Project Name' },
    { 
      key: 'submitted_date', 
      dataIndex: 'submitted_date', 
      title: 'Submitted Date',
      cell: ({ value }) => <span>{formatDate(value)}</span>
    },
    { 
      key: 'approved_date', 
      dataIndex: 'approved_date', 
      title: 'Approved Date',
      cell: ({ value }) => <span>{formatDate(value)}</span>
    },
    { 
      key: 'total_working_hours', 
      dataIndex: 'total_working_hours', 
      title: 'Total Hours',
      cell: ({ value }) => <span>{value} hours</span>
    },
    {
      key: 'action',
      dataIndex: 'claim_id',
      title: 'Action',
      cell: ({ value }) => (
        <button 
          onClick={() => navigate(`${PATH.claimStatus}/${value}`)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          👁
        </button>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.claimStatus_h1}>Paid Claims</h1>
        <hr style={{ width: "100%" }} />
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.style_tr}>
              {columns.map((column) => (
                <th key={column.key} className={styles.style_th}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className={styles.style_td}>
                  Loading...
                </td>
              </tr>
            ) : !claims?.length ? (
              <tr>
                <td colSpan={columns.length} className={styles.style_td}>
                  No data available
                </td>
              </tr>
            ) : (
              claims.map((claim) => (
                <tr key={claim.claim_id}>
                  {columns.map((column) => (
                    <td key={`${claim.claim_id}-${column.key}`} className={styles.style_td}>
                      {column.cell ? 
                        column.cell({ 
                          value: Array.isArray(column.dataIndex) ? 
                            claim[column.dataIndex[0]]?.[column.dataIndex[1]] : 
                            claim[column.dataIndex],
                          record: claim 
                        }) 
                        : Array.isArray(column.dataIndex) ? 
                          claim[column.dataIndex[0]]?.[column.dataIndex[1]] : 
                          claim[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className={styles.pagination}>
          <button 
            onClick={() => setPage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button 
            onClick={() => setPage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaidClaims;
