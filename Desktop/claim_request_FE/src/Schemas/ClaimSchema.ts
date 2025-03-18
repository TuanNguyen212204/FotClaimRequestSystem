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

const claimSchema = z.object({
  date: z.string().nonempty("Date is required"),
  working_hours: z.number().positive("Working hours must be positive"),
});

export const formSchema = z
  .object({
    currentSelectedProject: ProjectInfoSchema,
    claims: z.array(claimSchema).min(1, "At least one claim is required"),
  })
  .refine(
    (data) => {
      const projectStart = new Date(
        data.currentSelectedProject.ProjectDuration.from,
      );
      const projectEnd = new Date(
        data.currentSelectedProject.ProjectDuration.to,
      );
      return data.claims.every((claim) => {
        const claimDate = new Date(claim.date);
        //  console.log(claimDate, projectStart, projectEnd);
        return claimDate >= projectStart && claimDate <= projectEnd;
      });
    },
    {
      message: "All claim dates must be within the project's duration",
      path: ["claims"],
    },
  );

export type FormData = z.infer<typeof formSchema>;
