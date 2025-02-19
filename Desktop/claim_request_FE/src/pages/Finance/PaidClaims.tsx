import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectClaims } from '../../redux/slices/claimsSlice'; // Import selector
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const claims = useSelector(selectClaims); // Get claims from Redux

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
            {claims.map(claim => (
              <tr key={claim.claimId}>
                <td className={styles.style_td}>{claim.claimId}</td>
                <td className={styles.style_td}>{claim.staffName}</td>
                <td className={styles.style_td}>{claim.projectName}</td>
                <td className={styles.style_td}>{claim.duration}</td>
                <td className={styles.style_td}>100 hours</td>
                <td className={styles.style_td}>Marco</td>
                <td className={styles.style_td}>
                  <button 
                    onClick={() => navigate(`${PATH.claimStatus}/${claim.claimId}`)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button onClick={() => navigate(-1)}>&laquo;</button>
        <button className={styles.active}>1</button>
        <button>2</button>
        <button>3</button>
        <button>&raquo;</button>
      </div>
    </div>
  );
};

export default PaidClaims;
