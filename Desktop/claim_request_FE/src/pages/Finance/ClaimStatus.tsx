import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ClaimStatus.module.css";

const ClaimStatus: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const claimData = {
    '001': {
      claimId: '001',
      projectName: 'A Night To Remember',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      staffName: 'Ben',
      projectId: 'P001'
    },
    '002': {
      claimId: '002',
      projectName: 'Dreamer',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      staffName: 'Tyler',
      projectId: 'P002'
    },
    '003': {
      claimId: '003',
      projectName: 'Sunshine Project',
      duration: 'From: 2/1/2025 To: 2/28/2025',
      staffName: 'Emma',
      projectId: 'P003'
    },
    '004': {
      claimId: '004',
      projectName: 'Digital Transform',
      duration: 'From: 3/1/2025 To: 3/15/2025',
      staffName: 'Michael',
      projectId: 'P004'
    },
    '005': {
      claimId: '005',
      projectName: 'Cloud Migration',
      duration: 'From: 4/1/2025 To: 4/30/2025',
      staffName: 'Sophie',
      projectId: 'P005'
    }
  };

  const currentClaim = claimData[id as keyof typeof claimData];

  if (!currentClaim) {
    return (
      <div className={styles.container}>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
        <p>Không tìm thấy thông tin claim với ID: {id}</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.claimStatus_h1}>Claim Status</h1>
        <hr style={{ width: "100%" }} />
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

export default ClaimStatus;

