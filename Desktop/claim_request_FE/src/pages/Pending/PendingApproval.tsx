import { EyeIcon, TrashIcon, CheckIcon } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./PendingApproval.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllClaims, deleteClaim } from "@/redux/Claim/store/pendingSlice";
import { useAppDispatch } from "@redux/index";
import type { RootState } from "@redux/index";

export const PendingComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const claims = useSelector((state: RootState) => state.pending.listClaims);

  useEffect(() => {
    dispatch(fetchAllClaims());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

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

  function details(id: string) {
    navigator(`/details/${id}`);
  }

  const handleDelete = (id: string) => {
    dispatch(deleteClaim(id));
  };

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
              <td>{claim.staffName}</td>
              <td>{claim.projectName}</td>
              <td>{claim.duration}</td>
              <td>{claim.hours}{" "}hours</td>
              <td>{claim.approveName}</td>
              <td className={styles.actions}>
                <EyeIcon onClick={() => details(claim.id)} className={styles.icon} />
                <TrashIcon onClick={() => handleDelete(claim.id)} className={styles.icon} />
                <CheckIcon className={styles.icon} />
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
    </div>
  );
};