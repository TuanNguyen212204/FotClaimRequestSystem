import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/claimForm.type";
import styles from "@pages/CreateClaim/Claim.module.css";
import { useTranslation } from "react-i18next";

export interface AdditionalInfoProps {
  register: UseFormRegister<FormData>;
}

export default function AdditionalInfo({ register }: AdditionalInfoProps) {
  const { t } = useTranslation("createClaim");

  return (
    <div>
      <div className={styles.form_group} style={{ marginTop: "20px" }}>
        <label className={styles.form_label}>{t("claim_remarks_label")}</label>
        <textarea
          {...register("claimRemark")}
          placeholder={t("claim_remarks_placeholder")}
          className={styles.form_control}
          rows={4}
        ></textarea>
      </div>

      <div className={styles.form_group} style={{ marginTop: "20px" }}>
        <label className={styles.form_label}>
          {t("system_audit_trail_label")}
        </label>
        <textarea
          rows={4}
          readOnly
          placeholder={t("system_audit_trail_placeholder")}
          className={styles.form_control}
        ></textarea>
      </div>
    </div>
  );
}
