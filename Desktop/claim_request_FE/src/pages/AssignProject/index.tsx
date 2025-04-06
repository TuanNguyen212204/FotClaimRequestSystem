import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { toast } from "react-toastify";
import styles from "./AssignProject.module.css";
import { CloudCog, X } from "lucide-react";
import { allProject } from "@/redux/slices/VySlice";
import { Project } from "@/redux/slices/VySlice";
import { getAllProjects } from "@/redux/thunk/CreateClaim";
import { set } from "date-fns";
import { setLoading } from "@/redux/slices/Project/projectSlice";
import httpClient from "@/constant/apiInstance";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { useTranslation } from "react-i18next";

interface AssignProjectProps {
  id: string;
  setOpen: (value: boolean) => void;
}
export const AssignProject: React.FC<AssignProjectProps> = ({
  id,
  setOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const projectList: Project[] = useSelector(allProject);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [userID, setUserID] = useState<string>(id);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("allUserInformation");
  useEffect(() => {
    dispatch(
      getAllProjects({
        limit: 1000,
        page: 1,
        order: "ASC",
        sortBy: "project_id",
      }),
    );
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Project>();
  const listProjectStatus: Project[] = projectList.filter(
    (proj) => proj.project_status !== 2,
  );

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const project = listProjectStatus.find(
      (proj) => proj.project_id === e.target.value,
    );
    setSelectedProject(project || null);
    if (project) {
      setValue("project_name", project.project_name);
      setValue("start_date", project.start_date.split("T")[0]);
      setValue("end_date", project.end_date.split("T")[0]);
      setValue("project_status", project.project_status);
    }
  };

  const onSubmit = async (data: Project) => {
    setLoading(true);
    const requestBody = {
      project_id: data.project_id,
      user_id: userID,
    };

    try {
      const response = await httpClient.post<ApiResponseNoGeneric>(
        "/projects/assign-user",
        requestBody,
      );
      if (response.data.httpStatus === 200) {
        console.log(response.data);
        toast.success("Assign user to project successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error(data.message);
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div className="mx-auto rounded-xl bg-white pr-0 pb-5 shadow-xl">
          <button
            onClick={() => handleCancel()}
            className={styles.cancel_button}
          >
            <X />
          </button>
          <h1 className="mb-6 text-center text-3xl font-bold">
            {t("allUserInformation.assignUser.title")}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Select Project */}
            <div className="ml-15">
              <div className="flex">
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div className={styles.input_container}>
                  <label className="block text-sm font-medium text-gray-600">
                    {t("allUserInformation.assignUser.project")}
                  </label>
                </div>
              </div>
              <select
                {...register("project_id", {
                  required: t("allUserInformation.assignUser.validate.project"),
                })}
                onChange={handleProjectChange}
                className="mt-1 h-11 w-83.5 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Project</option>
                {listProjectStatus?.map((proj) => (
                  <option key={proj.project_id} value={proj.project_id}>
                    {proj.project_name} ({proj.project_id})
                  </option>
                ))}
              </select>
              {errors.project_id?.message && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.project_id.message)}
                </p>
              )}
            </div>

            {/* Project Name */}
            <div className="ml-15">
              <div className="flex">
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div className={styles.input_container}>
                  <label className="block text-sm font-medium text-gray-600">
                    {t("allUserInformation.assignUser.projectName")}
                  </label>
                </div>
              </div>
              <input
                type="text"
                {...register("project_name")}
                disabled
                className="mt-1 h-6 w-4/5 rounded-lg border border-gray-300 bg-gray-100 p-2"
              />
            </div>

            {/* Start Date */}
            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-600">
                {t("allUserInformation.assignUser.startDate")}
              </label>
              <input
                type="date"
                {...register("start_date")}
                disabled
                className="mt-1 h-6 w-4/5 rounded-lg border border-gray-300 bg-gray-100 p-2"
              />
            </div>

            {/* End Date */}
            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-600">
                {t("allUserInformation.assignUser.endDate")}
              </label>
              <input
                type="date"
                {...register("end_date")}
                disabled
                className="mt-1 h-6 w-4/5 rounded-lg border border-gray-300 bg-gray-100 p-2"
              />
            </div>

            {/* Project Status */}
            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-600">
                {t("allUserInformation.assignUser.projectStatus")}
              </label>
              <input
                type="text"
                {...register("project_status")}
                disabled
                className="mt-1 h-6 w-4/5 rounded-lg border border-gray-300 bg-gray-100 p-2"
              />
            </div>

            <div className={styles.update_button_container}>
              <button type="submit" className={styles.update_button}>
                {t("allUserInformation.buttonCreate")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
