import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();

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
            <tr>
              <td className={styles.style_td}>001</td>
              <td className={styles.style_td}>Ben</td>
              <td className={styles.style_td}>A Night To Remember</td>
              <td className={styles.style_td}>From: 1/1/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>100 hours</td>
              <td className={styles.style_td}>Marco</td>
              <td className={styles.style_td}>
                <button 
                  onClick={() => navigate(`${PATH.claimStatus}/001`)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  👁️
                </button>
              </td>
            </tr>
            <tr>
              <td className={styles.style_td}>002</td>
              <td className={styles.style_td}>Tyler</td>
              <td className={styles.style_td}>Dreamer</td>
              <td className={styles.style_td}>From: 1/1/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>100 hours</td>
              <td className={styles.style_td}>Marco</td>
              <td className={styles.style_td}>
                <button 
                  onClick={() => navigate(`${PATH.claimStatus}/002`)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  👁️
                </button>
              </td>
            </tr>
            <tr>
              <td className={styles.style_td}>003</td>
              <td className={styles.style_td}>Emma</td>
              <td className={styles.style_td}>Sunshine Project</td>
              <td className={styles.style_td}>From: 2/1/2025 To: 2/28/2025</td>
              <td className={styles.style_td}>160 hours</td>
              <td className={styles.style_td}>Sarah</td>
              <td className={styles.style_td}>
                <button 
                  onClick={() => navigate(`${PATH.claimStatus}/003`)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  👁️
                </button>
              </td>
            </tr>
            <tr>
              <td className={styles.style_td}>004</td>
              <td className={styles.style_td}>Michael</td>
              <td className={styles.style_td}>Digital Transform</td>
              <td className={styles.style_td}>From: 3/1/2025 To: 3/15/2025</td>
              <td className={styles.style_td}>80 hours</td>
              <td className={styles.style_td}>John</td>
              <td className={styles.style_td}>
                <button 
                  onClick={() => navigate(`${PATH.claimStatus}/004`)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  👁️
                </button>
              </td>
            </tr>
            <tr>
              <td className={styles.style_td}>005</td>
              <td className={styles.style_td}>Sophie</td>
              <td className={styles.style_td}>Cloud Migration</td>
              <td className={styles.style_td}>From: 4/1/2025 To: 4/30/2025</td>
              <td className={styles.style_td}>200 hours</td>
              <td className={styles.style_td}>David</td>
              <td className={styles.style_td}>
                <button 
                  onClick={() => navigate(`${PATH.claimStatus}/005`)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  👁️
                </button>
              </td>
            </tr>
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
