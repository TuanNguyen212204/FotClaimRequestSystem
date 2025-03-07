import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
<<<<<<< HEAD
import { selectClaims } from '../../redux/slices/Claim/claimsSlice';
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const claims = useSelector(selectClaims);

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

  const {
    paginatedData,
    totalPages,
    currentPage,
    handlePageChange,
    sortOrder,
    sortColumn,
    handleSort
  } = useTable({
    dataSource: claims.map(claim => ({
      ...claim,
      status: 'paid' // Add required status property
    })),
    pageLength: 5,
    pagination: true,
    sortConfig: {
      columnKey: 'claimId',
      order: 'asc'
    }
  });
=======
import { selectClaims } from '../../redux/paid/claimsSlice'; 
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import Pagination from '../../components/common/Pagination/Pagination';
import useTable from '../../Hooks/useTable';

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const claims = useSelector(selectClaims); 
  const pageSize = 5;
  const { tableData, currentPage, setCurrentPage } = useTable(claims, pageSize);
>>>>>>> feature/common-components-Duyanh

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
                  onClick={() => column.key !== 'action' && handleSort(column.dataIndex)}
                  style={{ cursor: column.key !== 'action' ? 'pointer' : 'default' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    {column.title}
                    {sortColumn === column.dataIndex && (
                      <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            {paginatedData.map((claim) => (
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
=======
            {claims.length === 0 ? (
              <tr>
                <td colSpan={7}>No claims available.</td>
>>>>>>> feature/common-components-Duyanh
              </tr>
            ) : (
              tableData.map(claim => (
                <tr key={claim.claimId}>
                  <td className={styles.style_td}>{claim.claimId ?? 'N/A'}</td>
                  <td className={styles.style_td}>{claim.staffName ?? 'N/A'}</td>
                  <td className={styles.style_td}>{claim.projectName ?? 'N/A'}</td>
                  <td className={styles.style_td}>{claim.duration ?? 'N/A'}</td>
                  <td className={styles.style_td}>100 hours</td>
                  <td className={styles.style_td}>Marco</td>
                  <td className={styles.style_td}>
                    <button 
                      onClick={() => navigate(`${PATH.claimStatus}/${claim.claimId}`)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
<<<<<<< HEAD
      <div className={styles.pagination}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
=======
      <Pagination
        total={claims.length}
        defaultPageSize={pageSize}
        defaultCurrent={currentPage}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        onChange={setCurrentPage}
      />
>>>>>>> feature/common-components-Duyanh
    </div>
  );
};

export default PaidClaims;
