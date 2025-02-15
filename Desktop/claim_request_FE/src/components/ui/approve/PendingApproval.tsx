import { EyeIcon, TrashIcon, CheckIcon } from "lucide-react";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import styles from "./PendingApproval.module.css";
import { useNavigate } from "react-router-dom";

export const PendingComponent: React.FC = () => {
      const claims = [
    {
      id: "001",
      staff: "Ben",
      project: "A Night To Remember",
      duration: "From: 1/1/2025 To: 1/15/2025",
      hours: "100 hours",
      approver: "Marco",
    },
    {
      id: "002",
      staff: "Tyler",
      project: "Dreamer",
      duration: "From: 1/1/2025 To: 1/15/2025",
      hours: "100 hours",
      approver: "Marco",
    },
    {
      id: "003",
      staff: "Doran",
      project: "From The Start",
      duration: "From: 1/1/2025 To: 1/15/2025",
      hours: "100 hours",
      approver: "Marco",
    },
    {
      id: "004",
      staff: "Faker",
      project: "Bored",
      duration: "From: 1/1/2025 To: 1/15/2025",
      hours: "100 hours",
      approver: "Marco",
    },
    {
      id: "005",
      staff: "Nichole",
      project: "Fragile",
      duration: "From: 1/1/2025 To: 1/15/2025",
      hours: "100 hours",
      approver: "Marco",
    },
  ];

  const navigator = useNavigate();

  function details() {
    navigator("/details");
  }
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Pending Approval Claims</h1>
        <hr />
        <table className={styles.claimsTable}>
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Staff Name</th>
              <th>Project Name</th>
              <th>Project Duration</th>
              <th>Total Hours Working</th>
              <th>Approver Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.staff}</td>
                <td>{claim.project}</td>
                <td>{claim.duration}</td>
                <td>{claim.hours}</td>
                <td>{claim.approver}</td>
                <td className={styles.actions}>
                  <EyeIcon onClick={details} className={styles.icon} />
                  <TrashIcon className={styles.icon} />
                  <CheckIcon className={styles.icon} />
                </td>
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
      </div>
    );
}