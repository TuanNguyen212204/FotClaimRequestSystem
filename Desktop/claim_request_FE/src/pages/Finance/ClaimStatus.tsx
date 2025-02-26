import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectClaims } from '../../redux/slices/claimsSlice'; // Import selector
import styles from "./ClaimStatus.module.css";
import Pagination from '../../components/common/Pagination/Pagination'; // Thêm import

const ClaimStatus: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const claims = useSelector(selectClaims); // Get claims from Redux
  
  // Thêm state cho pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const currentClaim = claims.find(claim => claim.claimId === id);

  // Data mẫu cho bảng (thay thế bằng data thật sau)
  const tableData = [
    {
      id: '001',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      date: '1/5/2025',
      hours: '100 hours',
      paid: '250.000.000 VND',
      status: 'Paid'
    },
    // ... các dữ liệu khác
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!currentClaim) {
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
          <p>Claim ID : {currentClaim.claimId}</p>
          <p>Project Name : {currentClaim.projectName}</p>
          <p>Project Duration : {currentClaim.duration}</p>
        </div>
        <div>
          <p>Staff Name : {currentClaim.staffName}</p>
          <p>Project ID : {currentClaim.projectId}</p>
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
            <tr>
              <td className={styles.style_td}>001</td>
              <td className={styles.style_td}>From: 1/1/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/5/2025</td>
              <td className={styles.style_td}>100 hours</td>
              <td className={styles.style_td}>250.000.000 VND</td>
              <td className={styles.style_td_Status}>Paid</td>
            </tr>
            <tr>
              <td className={styles.style_td}>002</td>
              <td className={styles.style_td}>From: 1/1/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/6/2025</td>
              <td className={styles.style_td}>100 hours</td>
              <td className={styles.style_td}>250.000.000 VND</td>
              <td className={styles.style_td_Status}>Paid</td>
            </tr>
            <tr>
              <td className={styles.style_td}>003</td>
              <td className={styles.style_td}>From: 2/1/2025 To: 2/28/2025</td>
              <td className={styles.style_td}>2/15/2025</td>
              <td className={styles.style_td}>160 hours</td>
              <td className={styles.style_td}>400.000.000 VND</td>
              <td className={styles.style_td_Status}>Paid</td>
            </tr>
            <tr>
              <td className={styles.style_td}>004</td>
              <td className={styles.style_td}>From: 3/1/2025 To: 3/15/2025</td>
              <td className={styles.style_td}>3/7/2025</td>
              <td className={styles.style_td}>80 hours</td>
              <td className={styles.style_td}>200.000.000 VND</td>
              <td className={styles.style_td_Status}>Paid</td>
            </tr>
            <tr>
              <td className={styles.style_td}>005</td>
              <td className={styles.style_td}>From: 4/1/2025 To: 4/30/2025</td>
              <td className={styles.style_td}>4/15/2025</td>
              <td className={styles.style_td}>200 hours</td>
              <td className={styles.style_td}>500.000.000 VND</td>
              <td className={styles.style_td_Status}>Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className={styles.pagination_container}>
        <Pagination
          total={tableData.length}
          defaultPageSize={pageSize}
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

