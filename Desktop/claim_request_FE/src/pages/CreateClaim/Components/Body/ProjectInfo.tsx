import {
  useWatch,
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFormState,
} from "react-hook-form";
import { JSX, ReactNode } from "react";
import { useEffect } from "react";
import { FormData } from "@/types/claimForm.type";
import { TProjectInfo } from "@redux/slices/Project/projectSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
export interface IProjectInfoProps {
  ProjectList: TProjectInfo[];
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  mode: "create" | "view" | "update";
}

export default function ProjectInfo({
  ProjectList,
  setValue,
  control,
  mode,
}: IProjectInfoProps): JSX.Element {
  const currentProject = useWatch({ control, name: "currentSelectedProject" });
  const { t } = useTranslation("claim");
  // console.log(currentProject);
  const { errors } = useFormState({ control, name: "currentSelectedProject" });
  function formatDateRange(from: string, to: string): string {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const fromMonth = fromDate.toLocaleString("default", { month: "short" });
    const fromYear = fromDate.getFullYear();
    const toMonth = toDate.toLocaleString("default", { month: "short" });
    const toYear = toDate.getFullYear();
    return `${fromMonth} ${fromYear} - ${toMonth} ${toYear}`;
  }
  useEffect(() => {
    if (errors.currentSelectedProject?.projectName) {
      toast.error(t("toast.selectProject"), { toastId: "projectError" });
    }
  }, [errors.currentSelectedProject?.projectName, t]);
  const formControlBase =
    "block w-full! px-4! py-3! text-base! font-normal! leading-normal! text-gray-800! bg-white! bg-clip-padding! border! border-gray-300! rounded-md! appearance-none! transition! duration-150! ease-in-out! focus:text-gray-800! focus:bg-white! focus:border-teal-600! focus:outline-none! focus:ring-2! focus:ring-teal-600/25! placeholder-gray-500! box-border!";
  const formControlDisabled =
    "disabled:bg-gray-200! disabled:opacity-100! disabled:cursor-not-allowed! read-only:bg-gray-200! read-only:opacity-100! read-only:cursor-not-allowed!";
  return (
    <FormRow>
      <FormColumn>
        <FormGroup
          label={t("projectInfo.nameLabel")}
          input={
            <select
              title={t("projectInfo.nameLabel")}
              className={`${formControlBase} `}
              defaultValue={
                mode === "update" || mode === "view"
                  ? currentProject?.projectName
                  : ""
              }
              disabled={mode === "view" || mode === "update"}
              onChange={(e) => {
                const selectedProject = ProjectList.find(
                  (p) => p.projectName === e.target.value
                );
                if (selectedProject) {
                  setValue("currentSelectedProject", selectedProject, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <option value="" disabled>
                {t("projectInfo.selectPlaceholder")}
              </option>
              {ProjectList.length > 0 &&
                ProjectList.map((project) => (
                  <option key={project.projectName} value={project.projectName}>
                    {project.projectName}
                  </option>
                ))}
            </select>
          }
        />
      </FormColumn>
      <FormColumn>
        <FormGroup
          label={t("projectInfo.durationLabel")}
          input={
            <input
              disabled
              type="text"
              className={`${formControlBase} ${formControlDisabled}`}
              placeholder={t("projectInfo.durationPlaceholder")}
              value={
                currentProject?.ProjectDuration?.from &&
                currentProject?.ProjectDuration?.to
                  ? formatDateRange(
                      currentProject.ProjectDuration.from,
                      currentProject.ProjectDuration.to
                    )
                  : ""
              }
            />
          }
        />
      </FormColumn>
    </FormRow>
  );
}
const FormRow = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-x-6 box-border">
      {children}
    </div>
  );
};
interface formGroupProps {
  label: string;
  input: JSX.Element;
}
const FormGroup = ({ label, input }: formGroupProps): JSX.Element => {
  return (
    <div className="mb-4 box-border">
      <label className="block text-sm font-medium text-gray-700 mb-2 box-border">
        {label}
      </label>
      {input}
    </div>
  );
};
const FormColumn = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="flex-1 min-w-[250px] mb-4 md:mb-0 box-border">
      {children}
    </div>
  );
};
