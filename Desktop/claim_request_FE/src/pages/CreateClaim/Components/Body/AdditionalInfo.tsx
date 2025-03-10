import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/claimForm.type";
import styles from "@pages/CreateClaim/Claim.module.css";
export interface AdditionalInfoProps {
  register: UseFormRegister<FormData>;
}
export default function AdditionalInfo({ register }: AdditionalInfoProps) {
  return (
    <div>
      <div className={styles.form_group} style={{ marginTop: "20px" }}>
        <label className={styles.form_label}>Claim Remarks</label>
        <textarea
          {...register("claimRemark")}
          placeholder="Enter addtional remarks"
          className={styles.form_control}
          rows={4}
        ></textarea>
      </div>

      <div className={styles.form_group} style={{ marginTop: "20px" }}>
        <label className={styles.form_label}>System audit trail</label>
        <textarea
          rows={4}
          readOnly
          placeholder="System audit trail"
          className={styles.form_control}
        ></textarea>
      </div>
    </div>
  );
}
