import { useWatch, useFieldArray, UseFormSetValue } from "react-hook-form";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import styles from "@pages/CreateClaim/Claim.module.css";
import { FormData } from "@/types/claimForm.type";
import { useTranslation } from "react-i18next";
import PopOver from "@/components/ui/PopOver";
export interface ClaimTableProps {
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export default function ClaimTable({
  register,
  control,
  errors,
  setValue,
}: ClaimTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "claims",
  });

  const currentProject = useWatch({ control, name: "currentSelectedProject" });
  const minDate = currentProject?.ProjectDuration?.from.split("T")[0] || "";
  const maxDate = currentProject?.ProjectDuration?.to.split("T")[0] || "";
  const { t } = useTranslation("claim");
  const claims = useWatch({ control, name: "claims" });
  const totalHours = claims.reduce(
    (sum, claim) => sum + (claim.working_hours || 0),
    0
  );

  return (
    <div className="mb-5 box-border overflow-x-auto">
      <h2 className="text-lg pb-1.5! mb-4!">{t("claimTable.ClaimEntries")}</h2>

      {errors.claims &&
        typeof errors.claims === "object" &&
        !Array.isArray(errors.claims) && (
          <p className="text-red-500 text-xs mb-2">{errors.claims.message}</p>
        )}
      <Table>
        <TableHead />
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <TdWithError error={errors.claims?.[index]?.date?.message}>
                <input
                  type="date"
                  
                  className={styles.form_control}
                  {...register(`claims.${index}.date`)}
                  min={minDate}
                  max={maxDate}
                  disabled={!minDate || !maxDate}
                />
              </TdWithError>
              <TdWithError
                error={errors.claims?.[index]?.working_hours?.message}
              >
                <input
                  type="number"
                  step="0.1"
                  disabled={!minDate || !maxDate}
                  className={styles.form_control}
                  {...register(`claims.${index}.working_hours`, {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: t("working_hours_positive_error"),
                    },
                    max: {
                      value: 24,
                      message: t("working_hours_max_error"),
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = Number(e.currentTarget.value);
                      if (value > 24) {
                        e.preventDefault();
                        e.currentTarget.value = "24";
                        setValue(`claims.${index}.working_hours`, 24);
                      } else if (value < 0) {
                        e.preventDefault();
                        e.currentTarget.value = "0";
                        setValue(`claims.${index}.working_hours`, 0);
                      }
                    },
                  })}
                />
              </TdWithError>
              <td className={styles.table_action}>
                {index === 0 ? (
                  <></>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.btn_danger}  `}
                    onClick={() => remove(index)}
                  >
                    {t("claimTable.removeButton")}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="text-right font-bold">
              {t("claimTable.totalHoursLabel")}
            </td>
            <td>{totalHours.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
      <PopOver
        trigger="hover"
        style={{ width: "max-content" }}
        content={
          Object.keys(errors.claims || {}).length > 0
            ? t("validation.addRowError")
            : t("claimTable.addRow")
        }
        placement="top"
      >
        <button
          type="button"
          disabled={
            !minDate ||
            !maxDate ||
            (errors.claims && Object.keys(errors.claims).length > 0)
          }
          className={`${styles.btn} ${styles.btn_add}  `}
          onClick={() => append({ date: minDate, working_hours: 0 })}
        >
          {t("claimTable.addButton")}
        </button>
      </PopOver>
    </div>
  );
}

const Table: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => <table className={styles.claim_table}>{children}</table>;

const TableHead: React.FC = () => {
  const { t } = useTranslation("claim");
  return (
    <thead>
      <tr>
        <TableHeaderCell>{t("claimTable.dateHeader")}</TableHeaderCell>
        <TableHeaderCell>{t("claimTable.hoursHeader")}</TableHeaderCell>
        <TableHeaderCell>{t("claimTable.actionsHeader")}</TableHeaderCell>
      </tr>
    </thead>
  );
};

const TableHeaderCell: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <th>{children}</th>;

interface TdWithErrorProps {
  children?: React.ReactNode;
  error?: string;
  className?: string;
}

const TdWithError: React.FC<TdWithErrorProps> = ({ children, error }) => (
  <td>
    <div className="flex flex-col gap-1">
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  </td>
);
