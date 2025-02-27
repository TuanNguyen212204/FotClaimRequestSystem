import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
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
            {claims.length === 0 ? (
              <tr>
                <td colSpan={7}>No claims available.</td>
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
      
      <Pagination
        total={claims.length}
        defaultPageSize={pageSize}
        defaultCurrent={currentPage}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default PaidClaims;
