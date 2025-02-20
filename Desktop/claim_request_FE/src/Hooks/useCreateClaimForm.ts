import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createRequestFormSchema = (minDate: string, maxDate: string) =>
  z.object({
    from: z
      .string()
      .nonempty("From date is required")
      .refine((val) => new Date(val) >= new Date(minDate), {
        message: `From date must be after ${minDate}`,
      }),
    to: z
      .string()
      .nonempty("To date is required")
      .refine((val) => new Date(val) <= new Date(maxDate), {
        message: `To date must be before ${maxDate}`,
      }),
    workingHoursFrom: z.string().nonempty("Working Hours From is required"),
    workingHoursTo: z.string().nonempty("Working Hours To is required"),
  });

export type RequestFormValues = z.infer<ReturnType<typeof createRequestFormSchema>>;
export const useCreateClaimForm = () => {
  const [minDate] = useState("2025-01-01");
  const [maxDate] = useState("2025-12-31");

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
    watch,
    formState: { errors },
  } = methods;

  const fromDate = watch("from");
  const toDate = watch("to");
  const workingHoursFrom = watch("workingHoursFrom");
  const workingHoursTo = watch("workingHoursTo");

  
  const computedOvertimeDuration = (() => {
    if (!fromDate || !toDate) return "";
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return (diffTime / (1000 * 60 * 60 * 24)).toFixed(0);
  })();

  
  const computedTotalHours = (() => {
    if (!workingHoursFrom || !workingHoursTo) return "";
    const [startHour, startMinute] = workingHoursFrom.split(":").map(Number);
    const [endHour, endMinute] = workingHoursTo.split(":").map(Number);
    const startTotal = startHour * 60 + startMinute;
    let endTotal = endHour * 60 + endMinute;
    if (endTotal < startTotal) endTotal += 24 * 60;
    return Math.round((endTotal - startTotal) / 60).toString();
  })();

  return {
    methods,
    errors,
    computedOvertimeDuration,
    computedTotalHours,
  };
};
