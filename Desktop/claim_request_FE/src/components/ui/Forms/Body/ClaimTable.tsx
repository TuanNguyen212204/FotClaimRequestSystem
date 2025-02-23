import {
  Control,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import styles from "@ui/Forms/Create-Claim/Claim.module.css";
import { FormData } from "@/types/claimForm.type";
import { useWatch } from "react-hook-form";
import { Trash2 } from "lucide-react";

interface ClaimTableProps {
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

  const claims = useWatch({ control, name: "claims" });
  console.log(claims[0].from)
  function getTime(time: string): string {
    return time ? time.split("T")[0] : "";
  }

  const minDate = getTime(currentProject?.ProjectDuration?.from || "");
  const maxDate = getTime(currentProject?.ProjectDuration?.to || "");

  return (
    <div className="mb-5 box-border overflow-x-auto ">
      <h2 className="text-lg pb-1.5 mb-4 border-b border-gray-400">
        Claim Table
      </h2>
      
      <div className="overflow-x-auto">
        <table className="table-cell  border box-border border-spacing-1 border-gray-300 mb-2.5 w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="w-3/12">Date</th>
              <th className="w-2/12">From Time</th>
              <th className="w-2/12">To Time</th>
              <th className="w-1/12">Hours</th>
              <th className="w-3/12">Remarks</th>
              <th className="w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              
              <tr key={field.id} className="h-24">
                <TdWithError
                  className="w-6/24"
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
                  <input
                    title="To"
                    type="time"
                    {...register(`claims.${index}.to`)}
                  />
                </TdWithError>
                <TdWithError className="w-1/12">
                  <input
                    type="number"
                    className="text-center"
                    disabled
                    placeholder="0"
                    {...register(`claims.${index}.hours`)}
                  />
                </TdWithError>
                <TdWithError
                  className="w-4/24"
                  error={errors.claims?.[index]?.remarks?.message}
                >
                  <input
                    type="text"
                    placeholder="Enter remarks"
                    className="text-center"
                    {...register(`claims.${index}.remarks`)}
                  />
                </TdWithError>
                <TdWithError className="text-center    p-2 ">
                  {fields.length > 1 ? (
                    <Trash2
                      onClick={() => remove(index)}
                      size={32}
                      className="cursor-pointer self-center  text-red-500"
                    />
                  ) : (
                    <Trash2 className="cursor-not-allowed text-gray-600 self-center" size={32} />
                  )}
                </TdWithError>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        title="Add More"
        type="button"
        onClick={() =>
          append({ date: "", from: "", to: "", hours: 0, remarks: "" })
        }
        className={`mt-2 p-2 max-w-24 rounded ${styles.add_button}`}
      >
        Add Row
      </button>
      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Total Working Hours</span>
        <input
          disabled
          placeholder="Total Hours"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          {...register("totalHours")}
        />
        {errors.totalHours && (
          <p className="text-red-500 text-xs mt-1">
            {errors.totalHours.message}
          </p>
        )}
      </div>
    </div>
  );
}

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
      <div className="flex flex-col justify-center min-h-[3rem]">
        {children}
        <div className="min-h-[1.5rem]">
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
