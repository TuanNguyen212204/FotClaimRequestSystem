import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import styles from "./DetailsApproval.module.css";
export const DetailsComponents: React.FC = () => {
  const claims = [
    {
      id: "001",
      duration: "From: 1/1/2025 To: 1/15/2025",
      date: "1/5/2025",
      hours: "5 hours",
      status: "Done",
    },
    {
      id: "002",
      duration: "From: 1/1/2025 To: 1/15/2025",
      date: "1/6/2025",
      hours: "5 hours",
      status: "Done",
    },
    {
      id: "003",
      duration: "From: 1/1/2025 To: 1/15/2025",
      date: "1/7/2025",
      hours: "5 hours",
      status: "Done",
    },
    {
      id: "004",
      duration: "From: 1/1/2025 To: 1/15/2025",
      date: "1/8/2025",
      hours: "5 hours",
      status: "Done",
    },
    {
      id: "005",
      duration: "From: 1/1/2025 To: 1/15/2025",
      date: "1/9/2025",
      hours: "5 hours",
      status: "Done",
    },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Claims Status</h1>
      <hr />
      <div className={styles.detailsContainer}>
        <div className={styles.detailsLeft}>
          <h3>Claim ID: 001</h3>
          <h3>Project Name: Kimochi</h3>
          <h3>Project Duration: (based on selected pj)</h3>
        </div>
        <div className={styles.detailsRight}>
          <h3>Staff Name: Ben</h3>
          <h3>Project ID: (based on selected pj)</h3>
        </div>
      </div>

      <table className={styles.claimsTable}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Overtime Duration</th>
            <th>Overtime Date</th>
            <th>Total No. Hours</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.duration}</td>
              <td>{claim.date}</td>
              <td>{claim.hours}</td>
              <td style={{ color: "#B8D576" }}>{claim.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span className={styles.pageIcon}>
          <ArrowLeftSquare />
        </span>
        <span className={styles.pageNumber}>1</span>
        <span className={styles.pageNumber}>2</span>
        <span className={styles.pageNumber}>3</span>
        <span className={styles.pageIcon}>
          <ArrowRightSquare />
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonStyle}>
          <button className={styles.rejectedButton}>Rejected</button>
          <button className={styles.approvedButton}>Approved</button>
        </div>
      </div>
    </div>
  );
};
