import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import styles from "./DetailsApproval.module.css";
import { useState } from "react";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Adjust this number to change the number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = claims.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(claims.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          {currentItems.map((claim) => (
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
        <span className={styles.pageIcon} onClick={handlePreviousPage}>
          <ArrowLeftSquare />
        </span>
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            className={`${styles.pageNumber} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span className={styles.pageIcon} onClick={handleNextPage}>
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
