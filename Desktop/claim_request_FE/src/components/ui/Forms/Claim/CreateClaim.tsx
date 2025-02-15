import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Inputs/InputField";

import {
  createRequestFormSchema,
  RequestFormValues,
} from "../../../../constant/Zod_Schema/Forms/createRequest";
import { FaCalendar } from "react-icons/fa";
export default function CreateClaim() {
  const [minDate, setMinDate] = useState("2025-01-01");
  const [maxDate, setMaxDate] = useState("2025-12-31");

  const schema = createRequestFormSchema(minDate, maxDate);

  const methods = useForm<RequestFormValues>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      from: "",
      to: "",
      workingHoursFrom: "17:00",
      workingHoursTo: "23:59",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = methods;

  const fromDate = watch("from");
  const toDate = watch("to");
  const workingHoursFrom = watch("workingHoursFrom");
  const workingHoursTo = watch("workingHoursTo");

  let computedOvertimeDuration = "";
  if (fromDate && toDate) {
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    computedOvertimeDuration = diffDays.toFixed(0);
  }

  let computedTotalHours = "";
  if (workingHoursFrom && workingHoursTo) {
    const [startHour, startMinute] = workingHoursFrom.split(":").map(Number);
    const [endHour, endMinute] = workingHoursTo.split(":").map(Number);
    const startTotal = startHour * 60 + startMinute;
    let endTotal = endHour * 60 + endMinute;
    if (endTotal < startTotal) {
      endTotal += 24 * 60;
    }
    const diffHours = (endTotal - startTotal) / 60;
    computedTotalHours = Math.round(
      Number.parseInt(diffHours.toFixed(2))
    ).toString();
  }

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
            {computedOvertimeDuration}
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
            disabled
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
            className="px-6 py-3 hover:bg-orange-400 bg-orange-500 text-white font-semibold text-center rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
