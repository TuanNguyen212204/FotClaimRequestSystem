import {
  Control,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { useWatch } from "react-hook-form";
import styles from "@pages/CreateClaim/Claim.module.css";
import { FormData } from "@/types/claimForm.type";

export interface ClaimTableProps {
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<FormData>;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<FormData>;
}

export default function ClaimTable({
  register,
  fields,
  append,
  remove,
  control,
  errors,
}: ClaimTableProps) {
  const currentProject = useWatch({ control, name: "currentSelectedProject" });
  //const claims = useWatch({ control, name: "claims" });

  function getTime(time: string): string {
    return time ? time.split("T")[0] : "";
  }

  const minDate = getTime(currentProject?.ProjectDuration?.from || "");
  const maxDate = getTime(currentProject?.ProjectDuration?.to || "");

  return (
    <div className="mb-5 box-border overflow-x-auto">
      <h2 className="text-lg pb-1.5! mb-4!">Claim Details</h2>

      <Table>
        <TableHead />
        <TableBody
          fields={fields}
          register={register}
          errors={errors}
          remove={remove}
          minDate={minDate}
          maxDate={maxDate}
        />
        <TableFoot register={register} />
      </Table>

      <button
        title="Add More"
        type="button"
        onClick={() =>
          append({ date: "", from: "", to: "", hours: 0, remarks: "" })
        }
        className={`${styles.btn} ${styles.btn_add}`}
      >
        Add Row
      </button>
    </div>
  );
}

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table className={styles.claim_table}>{children}</table>;
};

const TableHead: React.FC = () => (
  <thead>
    <tr>
      <TableHeaderCell>Date</TableHeaderCell>
      <TableHeaderCell>From Time</TableHeaderCell>
      <TableHeaderCell>To Time</TableHeaderCell>
      <TableHeaderCell>Hours</TableHeaderCell>
      <TableHeaderCell>Remarks</TableHeaderCell>
      <TableHeaderCell></TableHeaderCell>
    </tr>
  </thead>
);

const TableBody: React.FC<{
  fields: Record<"id", string>[];
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  remove: UseFieldArrayRemove;
  minDate: string;
  maxDate: string;
}> = ({ fields, register, errors, remove, minDate, maxDate }) => (
  <tbody>
    {fields.map((field, index) => (
      <tr key={field.id}>
        <TdWithError
          className="w-4/24"
          error={errors.claims?.[index]?.date?.message}
        >
          <input
            title="Claim Date"
            type="date"
            {...register(`claims.${index}.date`)}
            min={minDate}
            max={maxDate}
          />
        </TdWithError>
        <TdWithError
          className="w-5/24"
          error={errors.claims?.[index]?.from?.message}
        >
          <input
            title="From"
            type="time"
            {...register(`claims.${index}.from`)}
          />
        </TdWithError>
        <TdWithError
          className="w-5/24"
          error={errors.claims?.[index]?.to?.message}
        >
          <input title="To" type="time" {...register(`claims.${index}.to`)} />
        </TdWithError>
        <TdWithError className="w-1/12">
          <input
            type="number"
            disabled
            placeholder="0"
            {...register(`claims.${index}.hours`)}
          />
        </TdWithError>
        <TdWithError
          className="w-6/24"
          error={errors.claims?.[index]?.remarks?.message}
        >
          <input
            type="text"
            placeholder="Enter remarks"
            {...register(`claims.${index}.remarks`)}
          />
        </TdWithError>
        <TdWithError className="text-center p-2">
          {index !== 0 && fields.length > 1 ? (
            <div className="flex align-middle justify-center">
              <span
                onClick={() => remove(index)}
                className={styles.file_remove}
              >
                ×
              </span>
            </div>
          ) : (
            index !== 0 && <span className={styles.file_remove}></span>
          )}
        </TdWithError>
      </tr>
    ))}
  </tbody>
);

const TableFoot: React.FC<{ register: UseFormRegister<FormData> }> = ({
  register,
}) => (
  <tfoot>
    <tr>
      <td colSpan={4} className="text-right font-bold" title="Total Hours">
        Total Working Hours
      </td>
      <td>
        <input
          disabled
          placeholder="Total Hours"
          className="w-full p-2 border-2 border-white box-border rounded-sm"
          {...register("totalHours")}
        />
      </td>
      <td colSpan={2}></td>
    </tr>
  </tfoot>
);

const TableHeaderCell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <th>{children}</th>;
};

interface TdWithErrorProps {
  children: React.ReactNode;
  error?: string;
  className?: string;
}

const TdWithError: React.FC<TdWithErrorProps> = ({
  children,
  error,
  className = "",
}) => {
  return (
    <td className={`p-2 ${className}`}>
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
};
