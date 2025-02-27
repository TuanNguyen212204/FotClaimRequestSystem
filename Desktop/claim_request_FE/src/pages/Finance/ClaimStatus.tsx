// src/pages/Finance/ClaimStatus.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectClaimStatuses, saveClaim } from '../../redux/paid/claimStatusSlice'; // Import selector và action
import styles from "./ClaimStatus.module.css";
import Pagination from '../../components/common/Pagination/Pagination';

const ClaimStatus: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { id } = useParams<{ id: string }>();
  const claimStatuses = useSelector(selectClaimStatuses); 
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const currentClaimStatus = claimStatuses.find(claim => claim.claimId === id);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

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
              <th className={styles.style_th}>No.</th>
              <th className={styles.style_th}>Overtime Duration</th>
              <th className={styles.style_th}>Overtime Date</th>
              <th className={styles.style_th}>Total No.Hours</th>
              <th className={styles.style_th}>Overtime Paid</th>
              <th className={styles.style_th_Status}>Status</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
      
      <div className={styles.pagination_container}>
        <Pagination
          total={claimStatuses.length} 
          defaultPageSize={itemsPerPage}
          defaultCurrent={1}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={handlePageChange}
        />
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
