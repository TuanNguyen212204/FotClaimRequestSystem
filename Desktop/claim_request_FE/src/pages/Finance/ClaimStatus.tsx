<<<<<<< HEAD
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectClaims } from '../../redux/slices/Claim/claimsSlice';
import styles from "./ClaimStatus.module.css";
import { useTable } from "../../Hooks/useTable";
import { Column } from "../../components/ui/Table/Table";
=======
// src/pages/Finance/ClaimStatus.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectClaimStatuses, saveClaim } from '../../redux/paid/claimStatusSlice'; // Import selector và action
import styles from "./ClaimStatus.module.css";
import Pagination from '../../components/common/Pagination/Pagination';
>>>>>>> feature/common-components-Duyanh

const ClaimStatus: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { id } = useParams<{ id: string }>();
<<<<<<< HEAD
  const claims = useSelector(selectClaims);
  const currentClaim = claims.find(claim => claim.claimId === id);

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

  const tableData = [
    {
      id: '001',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      date: '1/5/2025',
      hours: '100 hours',
      paid: '250.000.000 VND',
      status: 'Paid'
    },
    {
      id: '002',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      date: '1/6/2025',
      hours: '100 hours',
      paid: '250.000.000 VND',
      status: 'Paid'
    },
    {
      id: '003',
      duration: 'From: 2/1/2025 To: 2/28/2025',
      date: '2/15/2025',
      hours: '160 hours',
      paid: '400.000.000 VND',
      status: 'Paid'
    },
    {
      id: '004',
      duration: 'From: 3/1/2025 To: 3/15/2025',
      date: '3/7/2025',
      hours: '80 hours',
      paid: '200.000.000 VND',
      status: 'Paid'
    },
    {
      id: '005',
      duration: 'From: 4/1/2025 To: 4/30/2025',
      date: '4/15/2025',
      hours: '200 hours',
      paid: '500.000.000 VND',
      status: 'Paid'
    }
  ];
=======
  const claimStatuses = useSelector(selectClaimStatuses); 
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const currentClaimStatus = claimStatuses.find(claim => claim.claimId === id);
>>>>>>> feature/common-components-Duyanh

  const {
    paginatedData,
    totalPages,
    currentPage,
    handlePageChange,
    sortOrder,
    sortColumn,
    handleSort
  } = useTable({
    dataSource: tableData,
    pageLength: 5,
    pagination: true,
    sortConfig: {
      columnKey: 'id',
      order: 'asc'
    }
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSaveClaim = () => {
    if (currentClaimStatus) {
      dispatch(saveClaim(currentClaimStatus)); 
    }
  };

  if (!currentClaimStatus) {
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
          <p>Claim ID : {currentClaimStatus.claimId}</p>
          <p>Project Name : {currentClaimStatus.projectName}</p>
          <p>Project Duration : {currentClaimStatus.duration}</p>
        </div>
        <div>
          <p>Staff Name : {currentClaimStatus.staffName}</p>
          <p>Project ID : {currentClaimStatus.projectId}</p>
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
                  onClick={() => handleSort(column.dataIndex)}
                  style={{ cursor: 'pointer' }}
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
            {paginatedData.map((record) => (
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
=======
            {}
            <tr>
              <td className={styles.style_td}>001</td>
              <td className={styles.style_td}>From: 1/1/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/5/2025</td>
              <td className={styles.style_td}>100 hours</td>
              <td className={styles.style_td}>250.000.000 VND</td>
              <td className={styles.style_td_Status}>Paid</td>
            </tr>
            {/* Thêm các hàng khác nếu cần */}
>>>>>>> feature/common-components-Duyanh
          </tbody>
        </table>
      </div>
      
      <div className={styles.pagination_container}>
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
          total={claimStatuses.length} 
          defaultPageSize={itemsPerPage}
          defaultCurrent={1}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={handlePageChange}
        />
>>>>>>> feature/common-components-Duyanh
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
