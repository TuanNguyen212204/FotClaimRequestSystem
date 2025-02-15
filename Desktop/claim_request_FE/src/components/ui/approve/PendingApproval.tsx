import { EyeIcon, TrashIcon, CheckIcon } from "lucide-react";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import styles from "./PendingApproval.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this number to change the number of items per page

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
          {currentItems.map((claim) => (
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
    </div>
  );
};