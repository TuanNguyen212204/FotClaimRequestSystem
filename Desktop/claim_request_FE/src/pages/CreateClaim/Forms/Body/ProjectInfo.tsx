import {
  useWatch,
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFormState,
} from "react-hook-form";
import { JSX, useState } from "react";
import { FormData } from "@/types/claimForm.type";
export type TProjectInfo = {
  ProjectName: string;
  RoleInTheProject: string;
  ProjectDuration: {
    from: string;
    to: string;
  };
};

export interface IProjectInfoProps {
  ProjectList: TProjectInfo[];
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
}

export default function ProjectInfo({
  ProjectList,
  setValue,
  register,
  control,
}: IProjectInfoProps): JSX.Element {
  const currentProject = useWatch({ control, name: "currentSelectedProject" });
  const { errors } = useFormState({ control, name: "currentSelectedProject" });
  //console.log(currentProject); // nay de debgug
  function formatDateRange(from: string, to: string): string {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const fromMonth = fromDate.toLocaleString("default", { month: "short" });
    const fromYear = fromDate.getFullYear();
    const toMonth = toDate.toLocaleString("default", { month: "short" });
    const toYear = toDate.getFullYear();
    return `${fromMonth} ${fromYear} - ${toMonth} ${toYear}`;
  }

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  return (
    <div className="mb-5 box-border">
      <div className="flex justify-between items-center border-b border-gray-400 pb-1.5 mb-4">
        <h2 className="text-lg">Project Information</h2>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-500 "
        >
          {isCollapsed ? "Collapse" : "Expand"}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isCollapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mb-2.5">
          <select
            title="Projects"
            className="w-full p-3.5 mb-2.5 text-base border-2 border-gray-200 box-border rounded-sm"
            defaultValue={""}
            onChange={(e) => {
              const selectedProject = ProjectList.find(
                (p) => p.ProjectName === e.target.value,
              );
              if (selectedProject) {
                setValue("currentSelectedProject", selectedProject, {
                  shouldValidate: true,
                });
              }
            }}
          >
            <option value="" disabled>
              Select a Project
            </option>
            {ProjectList.map((project) => (
              <option key={project.ProjectName} value={project.ProjectName}>
                {project.ProjectName}
              </option>
            ))}
          </select>
        </div>
        {errors.currentSelectedProject?.ProjectName && (
          <p className="text-black text-sm w-full bg-red-200 border-2 border-red-300 p-1">
            {
              "Select a Project" /**
              gu
            */
            }
          </p>
        )}
        <div className="mb-2.5">
          <input
            disabled
            placeholder="Role in Project"
            className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
            {...register("currentSelectedProject.RoleInTheProject")}
            value={currentProject?.RoleInTheProject || ""}
          />
        </div>
        <div className="mb-2.5">
          <input
            disabled
            placeholder="Project Duration"
            className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
            value={
              currentProject?.ProjectDuration?.from &&
              currentProject?.ProjectDuration?.to
                ? formatDateRange(
                    currentProject.ProjectDuration.from,
                    currentProject.ProjectDuration.to,
                  )
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
}
