import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import styles from "./DetailsApproval.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDetails } from "@redux/slice/detailsSlice";
import { RootState, AppDispatch } from "@redux/index";
import { fetchAllClaims } from "@redux/slice/pendingSlice.ts";

export const DetailsComponents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const claims = useSelector((state: RootState) => state.details.listClaims);
  const pendingClaims = useSelector((state: RootState) => state.pending.listClaims);

  useEffect(() => {
    dispatch(fetchAllDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllClaims());
  }, [dispatch]);

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Claims Status</h1>
      <hr />
      <div className={styles.detailsContainer}>
        <div className={styles.detailsLeft}>
          {pendingClaims.length > 0 && (
            <>
              <h3>Claim ID: {pendingClaims[0].id}</h3>
              <h3>Project Name: {pendingClaims[0].projectName}</h3>
              <h3>Project Duration: {pendingClaims[0].duration}</h3>
            </>
          )}
        </div>
        <div className={styles.detailsRight}>
          {pendingClaims.length > 0 && (
            <>
              <h3>Staff Name: {pendingClaims[0].staffName}</h3>
              <h3>Project ID: {pendingClaims[0].id}</h3>
            </>
          )}
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
              <td>{claim.otDuration}</td>
              <td>{claim.otDate}</td>
              <td>{claim.hours}{" "}hours</td>
              <td style={{ color: claim.status === "Done" ? "green" : claim.status === "Rejected" ? "red" : "#B8D576" }}>
                {claim.status}
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
            className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.activePage : ""
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
