import styles from "../../Claim.module.css";
import { JSX } from "react";
export default function ButtonGroup(): JSX.Element {
  return (
    <div className={styles.actions}>
      {/* <button type="button" className={`${styles.btn} ${styles.btn_secondary}`}>
        Send
      </button> */}
      <button type="submit" className={`${styles.btn} ${styles.btn_primary}`}>
        Send
      </button>
    </div>
  );
}
