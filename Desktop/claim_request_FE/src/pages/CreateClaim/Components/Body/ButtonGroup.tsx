import styles from "../../Claim.module.css";
import { JSX } from "react";
import { isClaimCreationLoading } from "@/redux/slices/Project/projectSlice";
import { useSelector } from "react-redux";
export default function ButtonGroup(): JSX.Element {
  const loading = useSelector(isClaimCreationLoading);
  return (
    <div className={styles.actions}>
      {/* <button type="button" className={`${styles.btn} ${styles.btn_secondary}`}>
        Send
      </button> */}
      <button
        disabled={loading}
        type="submit"
        className={`${styles.btn} ${styles.btn_primary}`}
      >
        Send
      </button>
    </div>
  );
}
