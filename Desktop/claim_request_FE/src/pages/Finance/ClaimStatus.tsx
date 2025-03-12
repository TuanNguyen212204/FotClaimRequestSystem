import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ClaimStatus.module.css";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";
import { ArrowDown, ArrowUp } from "lucide-react";

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
  
  const columns: Column[] = [
    { 
      key: 'claim_id', 
      dataIndex: 'claim_id', 
      title: 'Claim ID',
      cell: ({ value }) => <span>{value}</span>
    },
    { 
      key: 'overtime_duration', 
      dataIndex: 'submitted_date', 
      title: 'Overtime Duration',
      cell: ({ record }) => (
        <div>
          <div>From: {formatDate(record.submitted_date)}</div>
          <div>To: {formatDate(record.approved_date)}</div>
        </div>
      )
    },
    { 
      key: 'overtime_date', 
      dataIndex: 'submitted_date', 
      title: 'Overtime Date',
      cell: ({ value }) => <span>{formatDate(value)}</span>
    },
    { 
      key: 'total_hours', 
      dataIndex: 'total_working_hours', 
      title: 'Total No. Hours',
      cell: ({ value }) => <span>{value} hours</span>
    },
    { 
      key: 'overtime_paid', 
      dataIndex: 'total_working_hours', 
      title: 'Overtime Paid',
      cell: ({ value }) => <span>{(value * 25000).toLocaleString('vi-VN')}vnd</span>
    },
    { 
      key: 'status', 
      dataIndex: 'claim_status', 
      title: 'Status',
      cell: () => <span className={styles.style_td_Status}>Paid</span>
    }
  ];

  const { 
    data: claims, 
    loading, 
    sortConfig,
    handleSort,
    fetchData 
  } = useTable<ClaimData>({
    initialPageSize: 5,
    defaultSortConfig: { columnKey: 'overtime_date', order: 'desc' },
    columns,
    name: 'claim-status'
  });

  useEffect(() => {
    void fetchData('/finance/claims/paid');
  }, [fetchData]);

  if (loading || !claims.length) {
    return (
      <div className={styles.container}>
        <div className={styles.header}></div>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
        <p>{loading ? "Loading..." : `No claim information found for ID: ${id}`}</p>
      </div>
    );
  }

  const claimInfo = claims.find(claim => claim.claim_id === id) || claims[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
      </div>
      
      <div className={styles.box}>
        <div>
          <p className={styles.infoLabel}>User ID: <span>{claimInfo.user_id}</span></p>
          <p className={styles.infoLabel}>Project Name: <span>{claimInfo.project.project_name}</span></p>
          <p className={styles.infoLabel}>Project Duration: <span>
            {claimInfo.project.time_durations.split(' - ').map((date, index) => (
              <span key={index}>{index === 0 ? 'From: ' : 'To: '}{date}{index === 0 ? '': ''}</span>
            ))}
          </span></p>
        </div>
        <div className={styles.rightAligned}>
          <p className={styles.infoLabel}>Staff Name: <span>{claimInfo.full_name}</span></p>
          <p className={styles.infoLabel}>Project ID: <span>{claimInfo.project.project_id}</span></p>
          
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={column.key === 'status' ? styles.style_th_Status : styles.style_th}
                  onClick={() => column.key && handleSort(column.key)}
                >
                  <div className={styles.thContent}>
                    {column.title}
                    {sortConfig.columnKey === column.key && (
                      sortConfig.order === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
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
