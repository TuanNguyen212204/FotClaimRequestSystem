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
    { label: t("projectInformation.createProject.active"), value: "1" },
    { label: t("projectInformation.createProject.inactive"), value: "2" },
  ];

  const onSubmit = async (data: Project) => {
    const requestBody = {
      project_name: data.project_name,
      start_date: data.start_date,
      end_date: data.end_date,
      project_status: data.project_status,
    };

    try {
      setLoading(true);
      await httpClient.post("/projects/create-project", requestBody);
      toast.success(t("projectInformation.createProject.success"));
      setTimeout(() => {
        setOpenModal(false);
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error(data.message);
        } else {
          toast.error(t("projectInformation.createProject.error"));
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("projectInformation.createProject.error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const startDate = watch("start_date");
  const endDate = watch("end_date");

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setError("end_date", {
        type: "manual",
        message: t("projectInformation.validation.endDateAfterStartDate"),
      });
    } else {
      clearErrors("end_date");
    }
  }, [startDate, endDate, t]);

  const projectName = watch("project_name");
  const [checkingName, setCheckingName] = useState(false);

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
      <div className="mt-3">
        <div className="mx-auto rounded-xl bg-white pr-0 pb-5 shadow-xl">
          <div>
            <button
              onClick={() => handleCancel()}
              className={styles.cancel_button}
            >
              <div>
                <X />
              </div>
            </button>
          </div>
          <div className="block pt-5">
            <h1
              className={`mb-6 text-center text-3xl font-bold ${styles.title}`}
            >
              {t("projectInformation.createProject.title")}
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="ml-15">
              {/* <label className="block text-sm font-medium text-gray-700">
                {t("projectInformation.createProject.projectName")}
              </label> */}
              <div className="flex">
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("projectInformation.createProject.projectName")}
                  </label>
                </div>
              </div>
              <div className="relative w-4/5">
                <BriefcaseBusiness className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  placeholder={t(
                    "projectInformation.createProject.projectName",
                  )}
                  type="text"
                  {...register("project_name", {
                    required: t("projectInformation.validation.projectName"),
                  })}
                  className="mt-1 h-6 w-72 rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {errors.project_name && (
                <p className="text-sm text-red-500">
                  {errors.project_name.message}
                </p>
              )}
            </div>

            <div className="ml-15">
              <div className="flex">
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("projectInformation.createProject.startDate")}
                  </label>
                </div>
              </div>
              <div className="relative w-4/5">
                <Calendar className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="date"
                  {...register("start_date", {
                    required: t("projectInformation.validation.startDate"),
                    validate: (value) => {
                      const currentDate = new Date();
                      const selectedDate = new Date(value);
                      const tenYearsFromNow = new Date();
                      tenYearsFromNow.setFullYear(
                        currentDate.getFullYear() + 10,
                      );

                      if (selectedDate < currentDate) {
                        return t(
                          "projectInformation.validation.startDateInFuture",
                        );
                      }

                      if (selectedDate > tenYearsFromNow) {
                        return t(
                          "projectInformation.validation.startDateWithIn50",
                        );
                      }

                      return true;
                    },
                  })}
                  className="mt-1 h-6 w-72 rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {errors.start_date && (
                <p className="text-sm text-red-500">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            <div className="ml-15">
              {/* <label className="block text-sm font-medium text-gray-700">
                {t("projectInformation.createProject.endDate")}
              </label> */}
              <div className="flex">
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("projectInformation.createProject.endDate")}
                  </label>
                </div>
              </div>
              <div className="relative w-4/5">
                <Calendar className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="date"
                  {...register("end_date", {
                    required: t("projectInformation.validation.endDate"),
                    validate: (value) => {
                      const currentDate = new Date();
                      const selectedDate = new Date(value);
                      const tenYearsFromNow = new Date();
                      const startDateValue = new Date(watch("start_date"));
                      const fifteenDaysFromStartDate = new Date(startDateValue);
                      fifteenDaysFromStartDate.setDate(
                        startDateValue.getDate() + 15,
                      );
                      tenYearsFromNow.setFullYear(
                        currentDate.getFullYear() + 10,
                      );
                      if (selectedDate < currentDate) {
                        return t(
                          "projectInformation.validation.endDateInFuture",
                        );
                      }
                      if (selectedDate > tenYearsFromNow) {
                        return t(
                          "projectInformation.validation.endDateWithIn50",
                        );
                      }
                      if (
                        startDateValue &&
                        selectedDate < fifteenDaysFromStartDate
                      ) {
                        return t(
                          "projectInformation.validation.endDateAtLeast15Days",
                        );
                      }

                      return true;
                    },
                  })}
                  className="mt-1 h-6 w-72 rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              {/* <label className="block text-sm font-medium text-gray-700">
                {t("projectInformation.createProject.projectStatus")}
              </label> */}
              <div className="flex">
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("projectInformation.createProject.projectStatus")}
                  </label>
                </div>
              </div>
              <Select
                register={register("project_status", {
                  required: t("projectInformation.validation.projectStatus"),
                })}
                options={options}
                placeholder={t("projectInformation.createProject.selectStatus")}
                onChange={(value) => console.log(value)}
                className="mt-1 h-11 w-83.5 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
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
                disabled={checkingName || loading}
              >
                {checkingName
                  ? t("projectInformation.createProject.checking")
                  : loading
                    ? t("projectInformation.createProject.submitting")
                    : t("projectInformation.createProject.submitButton")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
