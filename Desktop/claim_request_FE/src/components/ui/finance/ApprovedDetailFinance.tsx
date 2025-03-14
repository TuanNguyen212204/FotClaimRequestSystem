import styles from "@ui/finance/ApprovedDetailFinance.module.css";
import TableComponent from "../Table/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchApprovedDetailFinanceAsync } from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedDetailFinance } from "@/redux/selector/claimSelector";

function ApprovedDetailFinance() {
  const { user_id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState(7);

  useEffect(() => {
    fetchApprovedDetailFinance();
  }, [user_id, currentPage, dispatch]);

  const claimList = useSelector(selectApprovedDetailFinance);

  const fetchApprovedDetailFinance = () => {
    if (user_id) {
      dispatch(
        fetchApprovedDetailFinanceAsync({
          user_id: user_id,
          page: currentPage.toString(),
          limit: limit.toString(),
        })
      );
    }
  };

  return (
    <div>
      <h1> Claim Status</h1>
      <div className={styles.info}>
        <div className={styles.info1}>
          <h3>User ID: </h3>
          <h3>Project Name: </h3>
          <h3>Project Duration: </h3>
        </div>
        <div className={styles.info2}>
          <h3>Staff Name: </h3>
          <h3>Project ID: </h3>
        </div>
      </div>
    </div>
  );
}

export default ApprovedDetailFinance;
