import { SubmitHandler, FormProvider } from "react-hook-form";
import InputField from "../Inputs/InputField";
import {
  useCreateClaimForm,
  RequestFormValues,
} from "../../../../Hooks/useCreateClaimForm";
import styles from '../Claim/Claim.module.css'
import { FaCalendar } from "react-icons/fa";
export default function CreateClaim() {
  const { methods, errors, computedOvertimeDuration, computedTotalHours } =
    useCreateClaimForm();

  const { handleSubmit, register } = methods;

  const onSubmit: SubmitHandler<RequestFormValues> = (data) => {
    console.log("Valid form data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-left mb-4">
          <label className="text-black font-medium mr-2">
            Overtime Durations (days):
          </label>
          {/* <input
            type="number"
            value={computedOvertimeDuration}
            placeholder="OT Duration"
            disabled
            className="p-2 border border-gray-400 rounded-lg bg-white text-black"
          /> */}
          <span className="text-black font-extrabold">
            {computedOvertimeDuration === "" ? "0" : computedOvertimeDuration}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <InputField
            name="from"
            label="From:"
            type="date"
            register={register}
            error={errors.from}
            picture={<FaCalendar />}
          />

          <InputField
            name="to"
            label="To:"
            type="date"
            register={register}
            error={errors.to}
            picture={<FaCalendar />}
          />
        </div>
        <div className="text-left mb-4">
          <label className="text-black font-medium mr-2">Working Hours:</label>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <InputField
            name="workingHoursFrom"
            label="From:"
            type="time"
            register={register}
            // disabled
            error={errors.workingHoursFrom}
          />
          <InputField
            name="workingHoursTo"
            label="To:"
            type="time"
            register={register}
            error={errors.workingHoursTo}
          />
        </div>
        <div className="text-left mb-4">
          <label className="text-black font-medium mr-2">Total Hours:</label>
          <input
            title="a"
            type="number"
            value={computedTotalHours}
            placeholder=""
            disabled
            className="p-2 border border-gray-400 rounded-lg max-w-16 bg-white text-black"
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className={`px-6 py-3 text-white font-semibold text-center rounded-lg ${styles.submit_button }` }
          >
            Send
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
