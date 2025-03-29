import styles from "../../Claim.module.css";
import { JSX } from "react";
import { isClaimCreationLoading } from "@/redux/slices/Project/projectSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button/Button";
import { useTranslation } from "react-i18next";

interface ButtonGroupProps {
  mode: "create" | "view" | "update";
}

export default function ButtonGroup({ mode }: ButtonGroupProps): JSX.Element {
  const { t } = useTranslation("createClaim");
  const loading = useSelector(isClaimCreationLoading);

  return (
    <div className={styles.actions}>
      {mode === "create" && (
        <Button
          disabled={loading}
          className={`${styles.btn} ${styles.btn_primary}`}
          buttonType="submit"
        >
          {t("send_button")}
        </Button>
      )}
      {mode === "update" && (
        <Button
          disabled={loading}
          buttonType="submit"
          className={`${styles.btn} ${styles.btn_primary}`}
        >
          {t("update_button")}
        </Button>
      )}
      {mode === "view" && <></>}
    </div>
  );
}
