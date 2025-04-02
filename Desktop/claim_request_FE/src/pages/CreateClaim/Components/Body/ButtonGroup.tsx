import styles from "../../Claim.module.css";
import { JSX } from "react";
import { isClaimCreationLoading } from "@/redux/slices/Project/projectSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button/Button";
import { useTranslation } from "react-i18next";
import { Control } from "react-hook-form";
import { FormData } from "@/types/claimForm.type";
import { useWatch } from "react-hook-form";

import { FieldErrors } from "react-hook-form";
interface ButtonGroupProps {
  mode: "create" | "view" | "update";
  control: Control<FormData>;
  fieldErrors?: FieldErrors<FormData>;
}
export default function ButtonGroup({
  mode,
  control,
  fieldErrors,
}: ButtonGroupProps): JSX.Element {
  const { t } = useTranslation("claim");
  const loading = useSelector(isClaimCreationLoading);
  const claims = useWatch({ control, name: "currentSelectedProject" });
  return (
    <div className={styles.actions}>
      {mode === "create" && (
        <Button
          disabled={loading || !claims?.projectName || Object.keys(fieldErrors?.claims || {}).length > 0}
          className={`${styles.btn} ${styles.btn_primary}`}
          buttonType="submit"
          
        >
          {t("buttons.send")}
        </Button>
      )}
      {mode === "update" && (
        <Button
          disabled={loading || !claims?.projectName}
          buttonType="submit"
          className={`${styles.btn} ${styles.btn_primary}`}
        >
          {t("buttons.update")}
        </Button>
      )}

      {mode === "view" && <></>}
    </div>
  );
}
