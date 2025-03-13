import styles from "@ui/finance/ApprovedDetailFinance.module.css";
import TableComponent from "../Table/Table";

function ApprovedDetailFinance() {
  const claimList = [
    {
      No: 1,
      OverTimeDuration: "From 1/5/2025 to 1/15/2025",
      OvertimeDate: "1/5/2025",
      TotalHours: "5 hours",
      OvertimePaid: "250.000 VND",
      Status: "Approved",
    },
    {
      No: 2,
      OverTimeDuration: "From 2/10/2025 to 2/20/2025",
      OvertimeDate: "2/10/2025",
      TotalHours: "8 hours",
      OvertimePaid: "400.000 VND",
      Status: "Pending",
    },
    {
      No: 3,
      OverTimeDuration: "From 3/1/2025 to 3/5/2025",
      OvertimeDate: "3/1/2025",
      TotalHours: "6 hours",
      OvertimePaid: "300.000 VND",
      Status: "Rejected",
    },
    {
      No: 4,
      OverTimeDuration: "From 4/12/2025 to 4/18/2025",
      OvertimeDate: "4/12/2025",
      TotalHours: "7 hours",
      OvertimePaid: "350.000 VND",
      Status: "Approved",
    },
    {
      No: 5,
      OverTimeDuration: "From 5/20/2025 to 5/25/2025",
      OvertimeDate: "5/20/2025",
      TotalHours: "4 hours",
      OvertimePaid: "200.000 VND",
      Status: "Pending",
    },
  ];

  return (
    <div>
      <h1> Claim Status</h1>
      <div className={styles.info}>
        <div className={styles.info1}>
          <h3>Claim ID: </h3>
          <h3>Project Name: </h3>
          <h3>Project Duration: </h3>
        </div>
        <div className={styles.info2}>
          <h3>Staff Name: </h3>
          <h3>Project ID: </h3>
        </div>
      </div>
      <TableComponent dataSource={claimList} />
    </div>
  );
}

export default ApprovedDetailFinance;
