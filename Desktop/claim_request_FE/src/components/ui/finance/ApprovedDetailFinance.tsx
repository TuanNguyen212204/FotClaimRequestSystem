import styles from "@ui/finance/ApprovedDetailFinance.module.css";
import TableComponent, { Column, DataRecord } from "../Table/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchApprovedDetailFinanceAsync } from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedDetailFinance } from "@/redux/selector/claimSelector";
import { Button } from "../button/Button";

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

  const columns: Column[] = [
    {
      key: "claim_id",
      dataIndex: "claim_id",
      title: "Claim ID",
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
    },
    {
      key: "time_durations",
      dataIndex: "time_durations",
      title: "Project Durations",
    },
    {
      key: "",
      dataIndex: "",
      title: "Time Duration",
    },
    {
      key: "total_working_hours",
      dataIndex: "total_working_hours",
      title: "Total Woriking Hours",
    },
    {
      key: "",
      dataIndex: "",
      title: "OverTime Paid",
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Status",
    },
    {
      key: "action",
      dataIndex: "user_id",
      title: "Action",
      cell: ({ value }) => (
        <div className={styles.actionButtons}>
          <Button onClick={() => handlePay(value as string)}>Pay</Button>
          <Button onClick={() => handlePrint(value as string)}>Print</Button>
        </div>
      ),
    },
  ];

  const dataSource: DataRecord[] = claimList.map((claim, index) => ({
    ...claim,
    key: index,
    id: claim.claim_id ? claim.claim_id.toString() : "",
    status: claim.claim_id ? claim.claim_id : "",
    project_name: claim.project ? claim.project.project_name : "",
    time_durations: claim.project ? claim.project.time_durations : "",
  }));

  return (
    <div>
      <h1> Claim Status</h1>
      <div className={styles.info}>
        <h2>User ID: {user_id}</h2>
      </div>
      <TableComponent columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default ApprovedDetailFinance;
