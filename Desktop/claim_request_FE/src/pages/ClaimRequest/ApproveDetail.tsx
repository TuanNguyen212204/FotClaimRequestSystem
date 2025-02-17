import React from "react";
import styles from "./ApproveDetail.module.css";
import { ArrowLeftSquare, ArrowRightSquare, EyeIcon } from "lucide-react";
const ApproveDetail = () => {
  return (
    <div>
      <div className={styles.container}>
        <div>
          <h1 className={styles.claimStatus_h1}>Claim Status</h1>
          <hr style={{ width: "100%" }} />
        </div>
        <div className={styles.box}>
          <div style={{ marginLeft: "50px" }}>
            <p>Claim ID : 001</p>
            <p>Project Name : project name</p>
            <p>Project Duration : (based on selected pi ) </p>
          </div>
          <div>
            <p>Staff Name : Ben </p>
            <p>Project ID : ( based on selected pi )</p>
          </div>
        </div>
        <div
          style={{
            overflow: "hidden",
            borderRadius: "10px",
            border: "1px solid black",
          }}
        >
          <table className={styles.table1}>
            <tr>
              <th className={styles.style_th}>No.</th>
              <th className={styles.style_th}>Overtime Duration</th>
              <th className={styles.style_th}>Overtime Date</th>
              <th className={styles.style_th}>Total No.Hours</th>
              <th className={styles.style_th}>Overtime Paid</th>
              <th className={styles.style_th_Status}>Status</th>
            </tr>
            <tr>
              <td className={styles.style_td}>001</td>
              <td className={styles.style_td}>From 1/5/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/5/2025</td>
              <td className={styles.style_td}>5 hours</td>
              <td className={styles.style_td}>250.000.000vnd</td>
              <td className={styles.style_td_Status}>Approve</td>
            </tr>
            <tr>
              <td className={styles.style_td}>002</td>
              <td className={styles.style_td}>From 1/5/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/6/2025</td>
              <td className={styles.style_td}>5 hours</td>
              <td className={styles.style_td}>250.000.000vnd</td>
              <td className={styles.style_td_Status}>Approve</td>
            </tr>
            <tr>
              <td className={styles.style_td}>003</td>
              <td className={styles.style_td}>From 1/5/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/5/2025</td>
              <td className={styles.style_td}>5 hours</td>
              <td className={styles.style_td}>250.000.000vnd</td>
              <td className={styles.style_td_Status}>Approve</td>
            </tr>
            <tr>
              <td className={styles.style_td}>004</td>
              <td className={styles.style_td}>From 1/5/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/5/2025</td>
              <td className={styles.style_td}>5 hours</td>
              <td className={styles.style_td}>250.000.000vnd</td>
              <td className={styles.style_td_Status}>Approve</td>
            </tr>
            <tr>
              <td className={styles.style_td}>005</td>
              <td className={styles.style_td}>From 1/5/2025 To: 1/15/2025</td>
              <td className={styles.style_td}>1/5/2025</td>
              <td className={styles.style_td}>5 hours</td>
              <td className={styles.style_td}>250.000.000vnd</td>
              <td className={styles.style_td_Status}>Approve</td>
            </tr>
          </table>
        </div>
        <div>
          <div className={styles.pagination}>
            <button
              style={{ paddingTop: "5px", paddingLeft: "4px", border: "0" }}
            >
              <ArrowLeftSquare />
            </button>
            <button className={styles.active}>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button
              style={{ paddingTop: "5px", paddingLeft: "4px", border: "0" }}
            >
              <ArrowRightSquare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveDetail;
