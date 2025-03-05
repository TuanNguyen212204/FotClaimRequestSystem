import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClaims } from "../../../redux/slices/Approver/claimsSlice";
import styles from "./ApproverdApproverComponent.module.css";
import { ArrowLeftSquare, ArrowRightSquare, EyeIcon } from "lucide-react";
import { RootState, AppDispatch } from "../../../redux/index";

export const ApprovedApproverComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listClaims = useSelector(
    (state: RootState) => state.approver.listClaims
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    dispatch(fetchAllClaims());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    } as const;
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const totalPages = Math.ceil(listClaims.length / itemsPerPage);

  const currentData = listClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.table_header}>Approved Claims</h1>
      <div className={styles.container_table}>
        <table className={styles.table_body}>
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
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.claimId}</td>
                <td>{item.staffName}</td>
                <td>{item.projectName}</td>
                <td>
                  {formatDate(item.startAt)} to {formatDate(item.finishAt)}
                </td>
                <td>{item.hour} hours</td>
                <td>{item.approverName}</td>
                <td>
                  <EyeIcon className={styles.icon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <span
            className={styles.pageIcon}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ArrowLeftSquare />
          </span>

          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={`${styles.pageNumber} ${
                currentPage === index + 1 ? styles.active : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}

          <span
            className={styles.pageIcon}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ArrowRightSquare />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApprovedApproverComponent;
