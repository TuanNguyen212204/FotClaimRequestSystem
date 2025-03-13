import styles from "@ui/finance/ApprovedDetailFinance.module.css";

function ApprovedDetailFinance() {
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
    </div>
  );
}

export default ApprovedDetailFinance;
