import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./DetailsApproval.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/index";
import { useParams } from "react-router-dom";

export const DetailsComponents: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const claims = useSelector((state: RootState) => state.claim.data);
  const pendingClaims = useSelector(
    (state: RootState) => state.claim.data
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAllDetails());
      dispatch(fetchAllClaims());
    }
  }, [dispatch, id]);

  const selectedClaim = pendingClaims.find((claim) => claim.id === id);

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
          {selectedClaim && (
            <>
              <h3>Claim ID: {selectedClaim.id}</h3>
              <h3>Project Name: {selectedClaim.projectName}</h3>
              <h3>Project Duration: {selectedClaim.duration}</h3>
            </>
          )}
        </div>
        <div className={styles.detailsRight}>
          {selectedClaim && (
            <>
              <h3>Staff Name: {selectedClaim.staffName}</h3>
              <h3>Project ID: {selectedClaim.id}</h3>
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
              <td>{claim.hours} hours</td>
              <td
                style={{
                  color:
                    claim.status === "Done"
                      ? "green"
                      : claim.status === "Rejected"
                      ? "red"
                      : "#B8D576",
                }}
              >
                {claim.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span className={styles.pageIcon} onClick={handlePreviousPage}>
          <ArrowLeft />
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
          <ArrowRight />
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonStyle}>
          {/* <button className={styles.rejectedButton}>Confirm</button> */}
          {/* <button className={styles.approvedButton}>Confirm</button> */}
        </div>
      </div>
    </div>
  );
};
