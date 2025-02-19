import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClaims } from "../../../redux/slices/financeSlice";
import styles from "./ApprovedFinanceComponent.module.css";
import { ArrowLeftSquare, ArrowRightSquare, EyeIcon } from "lucide-react";

export const ApprovedFinanceComponent: React.FC = () => {
  const dispatch = useDispatch();
  const listClaims = useSelector((state: any) => state.finance.listClaims);

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Approved Claims</h1>
      <hr />
      <table className={styles.claimsTable}>
        <thead>
          <th>Claim ID</th>
          <th>Staff Name</th>
          <th>Project Name</th>
          <th>Project Duration</th>
          <th>Total Hours Working</th>
          <th>Approver Name</th>
          <th>Action</th>
        </thead>
        <tbody>
          {listClaims.length > 0 &&
            listClaims.map((item, index) => {
              return (
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
              );
            })}
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
};

export default ApprovedFinanceComponent;
