import React, { useEffect, useState } from "react";
import { BriefcaseBusiness, X, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { Project } from "@/types/Project";
import styles from "./CreateProject.module.css";
import Modal from "react-modal";
import httpClient from "@/constant/apiInstance";
import { toast } from "react-toastify";
import { ApiResponse } from "@/types/ApiResponse";
import { useTranslation } from "react-i18next";
import { Select } from "../User/CreateUser";
import { LoadingProvider } from "@/components/ui/Loading/LoadingContext";
import LoadingOverlay from "@/components/ui/Loading/LoadingOverlay";

interface Option {
  label: string;
  value: string | number;
}

interface UpdateProjectProps {
  projectid: string;
  setOpenModal: (open: boolean) => void;
}

const options: Option[] = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "2" },
];

export const UpdateProject: React.FC<UpdateProjectProps> = ({
  projectid,
  setOpenModal,
}) => {
  const { t } = useTranslation("projectInformation");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Project>();

  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  const statusOptions: Option[] = [
    { label: t("projectInformation.updateProject.active"), value: "1" },
    { label: t("projectInformation.updateProject.inactive"), value: "2" },
  ];

  const handleClose = () => {
    setOpenModal(false);
  };

  const formatDateToInput = (date: string) => {
    return new Date(date).toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get<ApiResponse<Project>>(
        `/projects/${projectid}`,
      );
      const project = response.data.data;
      setProject(project);
      reset({
        ...project,
        start_date: formatDateToInput(project.start_date),
        end_date: formatDateToInput(project.end_date),
      });
      console.log(project);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(t("projectInformation.updateProject.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(project);
  }, [project]);

  useEffect(() => {
    fetchProject();
  }, [projectid]);

  const onSubmit = async (data: Project) => {
    if (new Date(data.end_date) < new Date(data.start_date)) {
      setError("end_date", {
        type: "manual",
        message: t("projectInformation.validation.endDateAfterStartDate"),
      });
      return;
    }
    const requestBody = {
      project_name: data.project_name || project?.project_name,
      start_date: data.start_date || project?.start_date,
      end_date: data.end_date || project?.end_date,
      project_status: data.project_status || project?.project_status,
    };
    try {
      setLoading(true);
      await httpClient.put(`/projects/${projectid}`, requestBody);
      toast.success(t("projectInformation.updateProject.success"));
      setOpenModal(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(t("projectInformation.updateProject.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {loading && (
          <div>
            <LoadingProvider>
              <LoadingOverlay />
            </LoadingProvider>
          </div>
        )}
      </div>
      <div>
        <div className="mx-auto rounded-xl bg-white pr-5 pb-5 pl-1 shadow-xl">
          <button onClick={handleClose} className={styles.cancel_button}>
            <X />
          </button>
          <h2 className="mb-6 text-center text-3xl font-bold text-blue-700">
            {t("projectInformation.updateProject.title")}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="ml-15">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="project_name"
              >
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div className={styles.input_container}>
                    <span>
                      {t("projectInformation.updateProject.projectName")}
                    </span>
                  </div>
                </div>
              </label>
              <div className="relative w-4/5">
                <BriefcaseBusiness className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  placeholder={t(
                    "projectInformation.updateProject.projectName",
                  )}
                  type="text"
                  {...register("project_name", {
                    required: t("projectInformation.validation.projectName"),
                  })}
                  className="mt-1 h-6 w-full rounded-lg border border-gray-300 p-2 pl-8 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {errors.project_name && (
                <p className="text-sm text-red-500">
                  {errors.project_name.message}
                </p>
              )}
            </div>

            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-700">
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div className={styles.input_container}>
                    <span>
                      {t("projectInformation.updateProject.startDate")}
                    </span>
                  </div>
                </div>
              </label>
              <div className="relative w-4/5">
                <Calendar className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="date"
                  {...register("start_date", {
                    required: t("projectInformation.validation.startDate"),
                  })}
                  className="mt-1 h-6 w-5/5 rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  min="2025-01-01"
                />
              </div>
              {errors.start_date && (
                <p className="text-sm text-red-500">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-700">
                {t("projectInformation.updateProject.endDate")}
              </label>
              <div className="relative w-4/5">
                <Calendar className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="date"
                  {...register("end_date", {
                    required: t("projectInformation.validation.endDate"),
                  })}
                  className="mt-1 h-6 w-5/5 rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  min="2025-01-01"
                />
              </div>
              {errors.end_date && (
                <p className="text-sm text-red-500">
                  {errors.end_date.message}
                </p>
              )}
            </div>

            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-700">
                {t("projectInformation.updateProject.projectStatus")}
              </label>
              <Select
                register={register("project_status", {
                  required: t("projectInformation.validation.projectStatus"),
                })}
                options={statusOptions}
                placeholder={t("projectInformation.updateProject.selectStatus")}
                onChange={(value) => console.log(value)}
                className="mt-1 h-11 w-90 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {errors.project_status && (
                <p className="text-sm text-red-500">
                  {errors.project_status.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={styles.update_button}
                disabled={loading}
              >
                {loading
                  ? t("projectInformation.updateProject.submitting")
                  : t("projectInformation.updateProject.submitButton")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
