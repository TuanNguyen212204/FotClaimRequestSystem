import { useWatch } from "react-hook-form";
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
  const currentProject = useWatch({ control, name: "currentSelectedProject" });

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
          register={register}
          errors={errors}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Table>
    </div>
  );
}

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table className={styles.claim_table}>{children}</table>;
};

const TableHead: React.FC = () => (
  <thead>
    <tr>
      <TableHeaderCell>Start Date</TableHeaderCell>
      <TableHeaderCell>End Date</TableHeaderCell>
      <TableHeaderCell>Total Working Hours</TableHeaderCell>
    </tr>
  </thead>
);

const TableBody: React.FC<{
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  minDate: string;
  maxDate: string;
}> = ({ register, errors, minDate, maxDate }) => (
  <tbody>
    <tr>
      <TdWithError className="w-5/12" error={errors.startDate?.message}>
        <input
          title="Start Date"
          type="date"
          {...register("startDate")}
          min={minDate}
          max={maxDate}
        />
      </TdWithError>
      <TdWithError className="w-5/12" error={errors.endDate?.message}>
        <input
          title="End Date"
          type="date"
          {...register("endDate")}
          min={minDate}
          max={maxDate}
        />
      </TdWithError>
      <TdWithError className="w-1/12" error={errors.totalWorkingHours?.message}>
        <input
          type="number"
          step="1"
          min="0"
          defaultValue={1}
          {...register("totalWorkingHours", { valueAsNumber: true })}
        />
      </TdWithError>
    </tr>
  </tbody>
);

const TableFoot: React.FC = () => (
  <tfoot>
    <tr>
      <td colSpan={2} className="text-right font-bold" title="Total Hours">
        Total Estimated Hours
      </td>
      <td>
        <input
          disabled
          placeholder="Total Hours"
          className="w-full p-2 border-2 border-white box-border rounded-sm"
        />
      </td>
    </tr>
  </tfoot>
);

const TableHeaderCell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <th>{children}</th>;
};

interface TdWithErrorProps {
  children?: React.ReactNode;
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
