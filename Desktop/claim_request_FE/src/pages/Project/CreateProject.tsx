import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { BriefcaseBusiness, Calendar, X } from "lucide-react";
import httpClient from "@/constant/apiInstance";
import { Project } from "@/types/Project";
import { toast } from "react-toastify";
import styles from "./CreateProject.module.css";
import { useTranslation } from "react-i18next";
import { ApiResponse } from "@/types/ApiResponse";
import { Select } from "../User/CreateUser";
import { LoadingProvider } from "@/components/ui/Loading/LoadingContext";
import LoadingOverlay from "@/components/ui/Loading/LoadingOverlay";
Modal.setAppElement("#root");

interface Option {
  label: string;
  value: string | number;
}

interface CreateProjectProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  openModal,
  setOpenModal,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation("projectInformation");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Project>();
  const options: Option[] = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "2" },
  ];
  // <option value="">
  //               {t("projectInformation.createProject.selectStatus")}
  //             </option>
  //             <option value="1">
  //               {t("projectInformation.createProject.inProgress")}
  //             </option>
  //             <option value="2">
  //               {t("projectInformation.createProject.completed")}
  //             </option>
  const onSubmit = async (data: Project) => {
    const requestBody = {
      project_name: data.project_name,
      start_date: data.start_date,
      end_date: data.end_date,
      project_status: data.project_status,
    };

    try {
      await httpClient.post("/projects/create-project", requestBody);
      toast.success("Create project successfully!");
      setTimeout(() => {
        setOpenModal(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Create project error:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  const startDate = watch("start_date");
  const endDate = watch("end_date");

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setError("end_date", {
        type: "manual",
        message: "End Date must be after Start Date",
      });
    } else {
      clearErrors("end_date");
    }
  }, [startDate, endDate]);

  const projectName = watch("project_name");
  const [checkingName, setCheckingName] = useState(false);

  // useEffect(() => {
  //   if (!projectName) return;

  //   const checkProjectName = async () => {
  //     setCheckingName(true);
  //     try {
  //       await httpClient.get<any>(`/projects/${projectName}`);
  //       setError("project_name", {
  //         type: "manual",
  //         message: "Project Name already exists!",
  //       });
  //     } catch (error: any) {
  //       if (error.response?.status === 404) {
  //         clearErrors("project_name");
  //       } else {
  //         console.error("Error checking project name:", error);
  //       }
  //     }
  //     setCheckingName(false);
  //   };

  //   const timer = setTimeout(checkProjectName, 500);
  //   return () => clearTimeout(timer);
  // }, [projectName]);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openModal]);
  const handleCancel = () => {
    setOpenModal(false);
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
      <div>
        {loading && (
          <div>
            <LoadingProvider>
              <LoadingOverlay />
            </LoadingProvider>
          </div>
        )}
      </div>
      <div style={{ marginTop: "50px" }}>
        <div className="mx-auto rounded-xl bg-white pr-5 pb-5 pl-1 shadow-xl">
          <div>
            <button
              onClick={() => handleCancel()}
              className={`${styles.cancel_button} `}
            >
              <div>
                <X />
              </div>
            </button>
          </div>

          <h1 className={`mb-6 text-center text-3xl font-bold ${styles.title}`}>
            Create Project
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-700">
                {t("projectInformation.createProject.projectName")}
              </label>
              <div className="relative w-4/5">
                <BriefcaseBusiness className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  placeholder="Enter the project name"
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
                {t("projectInformation.createProject.startDate")}
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
                {t("projectInformation.createProject.endDate")}
              </label>
              <div className="relative w-4/5">
                <Calendar className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="date"
                  {...register("end_date", {
                    required: t("projectInformation.validation.startDate"),
                  })}
                  className="mt-1 h-6 w-5/5 rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  min="2025-01-01"
                />
              </div>
              {/* <input
                type="date"
                {...register("end_date", {
                  required: t("projectInformation.validation.endDate"),
                })}
                className="mt-1 h-6 w-4/5 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                min="2025-01-01"
              /> */}
              {errors.end_date && (
                <p className="text-sm text-red-500">
                  {errors.end_date.message}
                </p>
              )}
            </div>

            <div className="ml-15">
              <label className="block text-sm font-medium text-gray-700">
                {t("projectInformation.createProject.projectStatus")}
              </label>
              <Select
                register={register("project_status")}
                options={options}
                placeholder="Select Project Status"
                onChange={(value) => console.log(value)}
                className="mt-1 h-11 w-90 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></Select>
              {errors.project_status && (
                <p className="text-sm text-red-500">
                  {errors.project_status.message}
                </p>
              )}
            </div>

            <div className="flex justify-center space-x-2">
              <button
                type="submit"
                className={styles.update_button}
                disabled={checkingName}
              >
                {checkingName ? "Checking..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
