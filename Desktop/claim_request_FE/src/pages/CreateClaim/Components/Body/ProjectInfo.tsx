import {
  useWatch,
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFormState,
} from "react-hook-form";
import { JSX, ReactNode, useEffect } from "react";
import { FormData } from "@/types/claimForm.type";
import { TProjectInfo } from "@redux/slices/Project/projectSlice";
import styles from "@pages/CreateClaim/Claim.module.css";
import { fetchProjectByID } from "@/redux/thunk/CreateClaim";
import { AppDispatch } from "@/redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

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
  register,
  control,
  mode,
}: IProjectInfoProps): JSX.Element {
  const { t } = useTranslation("createClaim");
  const currentProject = useWatch({ control, name: "currentSelectedProject" });
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

  return (
    <FormRow>
      <FormColumn>
        <FormGroup
          label={t("project_name_label")}
          input={
            <select
              title="Projects"
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
                {t("select_project_placeholder")}
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

        {errors.currentSelectedProject?.projectName && (
          <p className="text-red-500 text-sm p-1">
            {t("select_project_error")}
          </p>
        )}
      </FormColumn>
      <FormColumn>
        <FormGroup
          label={t("project_duration_label")}
          input={
            <input
              disabled
              className={`w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm ${styles.form_control}`}
              placeholder={t("project_duration_placeholder")}
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
