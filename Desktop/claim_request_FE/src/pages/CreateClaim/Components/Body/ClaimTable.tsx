import { useWatch, useFieldArray } from "react-hook-form";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import styles from "@pages/CreateClaim/Claim.module.css";
import { FormData } from "@/types/claimForm.type";

export interface ClaimTableProps {
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function ClaimTable({
  register,
  control,
  errors,
}: ClaimTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "claims",
  });

  const currentProject = useWatch({ control, name: "currentSelectedProject" });
  const minDate = currentProject?.ProjectDuration?.from.split("T")[0] || "";
  const maxDate = currentProject?.ProjectDuration?.to.split("T")[0] || "";

  const claims = useWatch({ control, name: "claims" });
  const totalHours = claims.reduce(
    (sum, claim) => sum + (claim.working_hours || 0),
    0,
  );

  return (
    <div className="mb-5 box-border overflow-x-auto">
      <h2 className="text-lg pb-1.5! mb-4!">Claim Details</h2>
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
                  {...register(`claims.${index}.date`, {
                    validate: (value, formValues) => {
                      const allDates = formValues.claims.map(
                        (claim) => claim.date,
                      );
                      console.log(allDates + "dater");
                      const duplicateCount = allDates.filter(
                        (date) => date === value,
                      ).length;
                      console.log(duplicateCount + "dup count");
                      return (
                        duplicateCount <= 1 || "This date is already selected"
                      );
                    },
                  })}
                  min={minDate}
                  max={maxDate}
                />
              </TdWithError>
              <TdWithError
                error={errors.claims?.[index]?.working_hours?.message}
              >
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className={styles.form_control}
                  {...register(`claims.${index}.working_hours`, {
                    valueAsNumber: true,
                  })}
                />
              </TdWithError>
              <TdWithError>
                {index === 0 ? (
                  <></>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.btn_danger} self-center `}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </TdWithError>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="text-right font-bold">
              Total Working Hours
            </td>
            <td>{totalHours.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
      <button
        type="button"
        className={`${styles.btn} ${styles.btn_add}`}
        onClick={() => append({ date: minDate, working_hours: 0 })}
      >
        Add Claim
      </button>
    </div>
  );
}

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table className={styles.claim_table}>{children}</table>
);

const TableHead: React.FC = () => (
  <thead>
    <tr>
      <TableHeaderCell>Date</TableHeaderCell>
      <TableHeaderCell>Working Hours</TableHeaderCell>
      <TableHeaderCell></TableHeaderCell>
    </tr>
  </thead>
);

const TableHeaderCell: React.FC<{ children: React.ReactNode }> = ({
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
      <div>
        {error ? (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        ) : (
          <span className="text-xs mt-1 invisible">placeholder</span>
        )}
      </div>
    </div>
  </td>
);
