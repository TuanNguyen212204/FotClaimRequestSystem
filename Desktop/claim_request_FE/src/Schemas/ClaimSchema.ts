import { z } from "zod";

export const ProjectInfoSchema = z.object({
  projectID: z.string().optional(),
  projectName: z.string().nonempty("Project Name is required"),
  RoleInTheProject: z.string().optional(),
  ProjectDuration: z.object({
    from: z.string().nonempty("Start date is required"),
    to: z.string().nonempty("End date is required"),
  }),
});

export const formSchema = z
  .object({
    currentSelectedProject: ProjectInfoSchema,
    startDate: z.string().nonempty("Start date is required"),
    endDate: z.string().nonempty("End date is required"),
    totalWorkingHours: z
      .number()
      .nonnegative("Must be a positive number")
      .min(1, "Must be at least 1"),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      const projectStart = new Date(
        data.currentSelectedProject.ProjectDuration.from,
      );
      const projectEnd = new Date(
        data.currentSelectedProject.ProjectDuration.to,
      );
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start >= projectStart && end <= projectEnd;
    },
    {
      message: "Claim period must be within the project's duration",
      path: ["startDate"],
    },
  );

export type FormData = z.infer<typeof formSchema>;
