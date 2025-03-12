import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import { useTable } from "../../Hooks/useTable";
import { ArrowDown, ArrowUp } from "lucide-react";
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
  id?: string;
  status?: string;
}

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();

  const columns: Column[] = [
    { 
      key: 'claim_id', 
      dataIndex: 'claim_id', 
      title: 'Claim ID',
      cell: ({ value }) => <span>{value}</span>
    },
    { 
      key: 'full_name', 
      dataIndex: 'full_name', 
      title: 'Employee Name',
      cell: ({ value }) => <span>{value}</span>
    },
    { 
      key: 'project_name', 
      dataIndex: ['project', 'project_name'], 
      title: 'Project Name' 
    },
    { 
      key: 'project_duration', 
      dataIndex: ['project', 'time_durations'], 
      title: 'Project Duration',
      cell: ({ value }) => {
        const [startDate, endDate] = value.split(' - ');
        return (
          <div>
            <div>From: {startDate}</div>
            <div>To: {endDate}</div>
          </div>
        );
      }
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
          className={styles.actionButton}
        >
          👁
        </button>
      )
    }
  ];

  const { 
    dataSource: claims, 
    loading, 
    pagination, 
    sortConfig,
    checkedItems,
    setPage,
    handleSort,
    handleCheck,
    handleSelectAll,
    fetchData 
  } = useTable<ClaimData>({
    initialPageSize: 5,
    defaultSortConfig: { columnKey: 'claim_id', order: 'desc' },
    columns,
    name: 'paid-claims'
  });

  useEffect(() => {
    void fetchData('/finance/claims/paid');
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.claimStatus_h1}>Paid Claims</h1>
        <hr />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.style_tr}>
              <th className={styles.style_th}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={checkedItems.size === claims.length && claims.length > 0}
                />
              </th>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={styles.style_th}
                  onClick={() => column.key && handleSort(column.key)}
                >
                  <div className={styles.thContent}>
                    {column.title}
                    {sortConfig.columnKey === column.key && (
                      sortConfig.order === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.style_td}>
                  Loading...
                </td>
              </tr>
            ) : !claims?.length ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.style_td}>
                  No data available
                </td>
              </tr>
            ) : (
              claims.map((claim) => (
                <tr 
                  key={claim.claim_id}
                  className={checkedItems.has(claim.claim_id) ? styles.selectedRow : ''}
                >
                  <td className={styles.style_td}>
                    <input
                      type="checkbox"
                      checked={checkedItems.has(claim.claim_id)}
                      onChange={() => handleCheck(claim.claim_id)}
                    />
                  </td>
                  {columns.map((column) => (
                    <td 
                      key={`${claim.claim_id}-${column.key}`} 
                      className={styles.style_td}
                    >
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
        <div className={styles.pagination_container}>
          <div className={styles.pagination}>
            <button 
              className={styles.pageButton}
              onClick={() => setPage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              ←
            </button>
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`${styles.pageNumber} ${pageNum === pagination.currentPage ? styles.activePage : ''}`}
              >
                {pageNum}
              </button>
            ))}

            <button 
              className={styles.pageButton}
              onClick={() => setPage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaidClaims;
