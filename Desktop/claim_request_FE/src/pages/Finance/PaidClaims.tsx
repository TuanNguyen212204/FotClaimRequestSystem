import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";
import httpClient from "../../constant/apiInstance";

interface Project {
  project_id: string;
  project_name: string;
  time_durations: string;
}

interface ClaimData {
  claim_id: string;
  user_id: string;
  total_working_hours: number;
  claim_status: string;
  project: Project;
}

interface ApiResponse {
  success: boolean;
  claims: ClaimData[];
}

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const { data: claims, loading, fetchData } = useTable<ClaimData>({
    initialPageSize: 5
  });

  useEffect(() => {
    // Gọi fetchData trực tiếp với URL
    void fetchData('finance/claims/paid');
  }, [fetchData]);

  const columns: Column[] = [
    { key: 'claim_id', dataIndex: 'claim_id', title: 'Claim ID' },
    { key: 'user_id', dataIndex: 'user_id', title: 'User ID' },
    { key: 'project_name', dataIndex: ['project', 'project_name'], title: 'Project Name' },
    { key: 'time_durations', dataIndex: ['project', 'time_durations'], title: 'Project Duration' },
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
    </div>
  );
};

export default PaidClaims;
