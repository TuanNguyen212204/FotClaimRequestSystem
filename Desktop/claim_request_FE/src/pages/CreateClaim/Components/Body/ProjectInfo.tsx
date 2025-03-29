import {
  useWatch,
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFormState,
  FieldError,
} from "react-hook-form";
import { JSX, ReactNode } from "react";
import { useEffect } from "react";
import { FormData } from "@/types/claimForm.type";
import { TProjectInfo } from "@redux/slices/Project/projectSlice";
import styles from "@pages/CreateClaim/Claim.module.css";
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
  return (
    <FormRow>
      <FormColumn>
        <FormGroup
          label={t("projectInfo.nameLabel")}
          input={
            <select
              title={t("projectInfo.nameLabel")}
              className="w-full p-3.5! mb-2.5 text-base border-2 border-gray-200 box-border rounded-sm"
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
              className={`w-full p-2! mb-2.5 border-2 border-white box-border rounded-sm ${styles.form_control}`}
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
  return <div className={styles.form_row}>{children}</div>;
};
interface formGroupProps {
  label: string;
  input: JSX.Element;
}
const FormGroup = ({ label, input }: formGroupProps): JSX.Element => {
  return (
    <div className={styles.form_group}>
      <label className={styles.form_label}>{label}</label>
      {input}
    </div>
  );
};
const FormColumn = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div className={styles.form_col}>{children}</div>;
};
