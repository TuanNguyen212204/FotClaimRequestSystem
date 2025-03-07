import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectClaims } from "../../redux/Claim/store/claimsSlice"; // Import selector
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import Pagination from "../../components/common/Pagination";

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const claims = useSelector(selectClaims); // Get claims from Redux

  // Thêm state cho pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số items trên mỗi trang

  // Tính toán các items cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClaims = claims.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(claims.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    // Xử lý logic phân trang ở đây
  };

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
        }}
      >
        <table className={styles.table}>
          <thead>
            <tr className={styles.style_tr}>
              <th className={styles.style_th}>Claim ID</th>
              <th className={styles.style_th}>Staff Name</th>
              <th className={styles.style_th}>Project Name</th>
              <th className={styles.style_th}>Project Duration</th>
              <th className={styles.style_th}>Total Hours Working</th>
              <th className={styles.style_th}>Approver Name</th>
              <th className={styles.style_th}>Action</th>
            </tr>
          </thead>
          <tbody>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        total={claims.length}
        defaultPageSize={5}
        defaultCurrent={1}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaidClaims;
