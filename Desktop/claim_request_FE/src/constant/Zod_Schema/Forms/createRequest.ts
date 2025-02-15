import { z } from "zod";

export const createRequestFormSchema = (minDate: string, maxDate: string) =>
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

export type RequestFormValues = z.infer<
  ReturnType<typeof createRequestFormSchema>
>;
