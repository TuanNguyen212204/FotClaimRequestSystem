import styles from "../../Claim.module.css";
import { JSX } from "react";
import { isClaimCreationLoading } from "@/redux/slices/Project/projectSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button/Button";
interface ButtonGroupProps {
  mode: "create" | "view" | "update";
}
export default function ButtonGroup({ mode }: ButtonGroupProps): JSX.Element {
  const loading = useSelector(isClaimCreationLoading);
  return (
    <div className={styles.actions}>
      {/* <button type="button" className={`${styles.btn} ${styles.btn_secondary}`}>
        Send
      </button> */}
      {/* <button
        disabled={loading}
        type="submit"
        className={`${styles.btn} ${styles.btn_primary}`}
      >
        Send
      </button> */}
      {mode === "create" && (
        <Button
          disabled={loading}
          className={`${styles.btn} ${styles.btn_primary}`}
          buttonType="submit"
        >
          Send
        </Button>
      )}
      {mode === "update" && (
        <Button
          disabled={loading}
          buttonType="submit"
          className={`${styles.btn} ${styles.btn_primary}`}
        >
          Update
        </Button>
      )}
      {mode === "view" && <></>}
    </div>
  );
}
