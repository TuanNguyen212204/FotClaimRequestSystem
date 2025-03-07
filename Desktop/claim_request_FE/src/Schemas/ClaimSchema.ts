import { z } from "zod";
import { parse, differenceInHours } from "date-fns";

export const ProjectInfoSchema = z.object({
  projectName: z.string().nonempty("Project Name is required"),
  RoleInTheProject: z.string().nonempty("Role in the Project is required"),
  ProjectDuration: z.object({
    from: z.string().nonempty("Start date is required"),
    to: z.string().nonempty("End date is required"),
  }),
});

export const ClaimSchema = z
  .object({
    date: z.string().nonempty("Date is required"),
    from: z.string().nonempty("Start time is required"),
    to: z.string().nonempty("End time is required"),
    hours: z
      .number()
      .nonnegative("Hours must be a non-negative number")
      .optional(),
    remarks: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { from, to, hours } = data;
    const timeFormat = "HH:mm";
    const fromTime = parse(from, timeFormat, new Date());
    const toTime = parse(to, timeFormat, new Date());

    if (toTime < fromTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Less Than From Hours",
        path: ["to"],
      });
    }

    const calculatedHours = differenceInHours(toTime, fromTime);
    if (hours !== calculatedHours) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Hours should be equal to the difference between 'from' and 'to' times (${calculatedHours} hours).`,
        path: ["hours"],
      });
    }
  });

export const formSchema = z.object({
  currentSelectedProject: ProjectInfoSchema,
  claims: z.array(ClaimSchema).nonempty("At least one claim is required"),
  totalHours: z.number().min(0, "Total hours must be a non-negative number"),
  claimRemark: z.string().optional(),
});
