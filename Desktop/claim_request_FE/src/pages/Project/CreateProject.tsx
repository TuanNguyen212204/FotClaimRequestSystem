import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import httpClient from "@/constant/apiInstance";
import { Project } from "@/types/Project";
import { useForm } from "react-hook-form";
import styles from "./CreateProject.module.css";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Project>();

  const onSubmit = async (data: Project) => {
    const requestBody = {
      project_id: data.project_id,
      project_name: data.project_name,
      start_date: data.start_date,
      end_date: data.end_date,
      project_status: data.project_status,
    };

    try {
      await httpClient.post("/projects/create-project", requestBody);
      toast.success("Create project successfully!");
      navigate(PATH.projectInformation);
    } catch (error) {
      console.error("Create project error:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  const handleCancel = () => navigate(PATH.projectInformation);

  const startDate = watch("start_date");
  const endDate = watch("end_date");

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setError("end_date", { type: "manual", message: "End Date cannot be before Start Date" });
    } else {
      clearErrors("end_date");
    }
  }, [startDate, endDate]);

  const projectId = watch("project_id"); // kiểm tra ID có tồn tại chưa
  const [checkingId, setCheckingId] = useState(false);

  useEffect(() => {
    if (!projectId || !/^P\d{3}$/.test(projectId)) return;

    const checkProjectId = async () => {
      setCheckingId(true);
      try {
        await httpClient.get<any>(`/projects/${projectId}`);
        setError("project_id", { type: "manual", message: "Project ID already exists!" });
      } catch (error: any) {
        if (error.response?.status === 404) {
          clearErrors("project_id");
        } else {
          console.error("Error checking project ID:", error);
        }
      }
      setCheckingId(false);
    };

    const timer = setTimeout(checkProjectId, 500);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Kiểm tra Project Name tồn tại
  const projectName = watch("project_name");
  const [checkingName, setCheckingName] = useState(false);

  useEffect(() => {
    if (!projectName) return;

    const checkProjectName = async () => {
      setCheckingName(true);
      try {
        await httpClient.get<any>(`/projects/${projectName}`);
        setError("project_name", { type: "manual", message: "Project Name already exists!" });
      } catch (error: any) {
        if (error.response?.status === 404) {
          clearErrors("project_name");
        } else {
          console.error("Error checking project name:", error);
        }
      }
      setCheckingName(false);
    };

    const timer = setTimeout(checkProjectName, 500);
    return () => clearTimeout(timer);
  }, [projectName]);

  return (
    <div className="mt-12">
      <div className="max-w-lg mx-auto p-9 bg-white shadow-xl rounded-xl">
        <button onClick={handleCancel} className={styles.cancel_button}>
          <X />
        </button>
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Create Project
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Project ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project ID
            </label>
            <input
              type="text"
              placeholder="Pxxx"
              {...register("project_id", {
                required: "Project ID is required",
                pattern: {
                  value: /^P\d{3}$/,
                  message: "Project ID must follow format: Pxxx (e.g., P001)",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {checkingId && <p className="text-blue-500 text-sm">Checking Project ID...</p>}
            {errors.project_id && <p className="text-red-500 text-sm">{errors.project_id.message}</p>}
          </div>

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              {...register("project_name", { required: "Project Name is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {checkingName && <p className="text-blue-500 text-sm">Checking Project Name...</p>}
            {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name.message}</p>}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              {...register("start_date", { required: "Start Date is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              {...register("end_date", { required: "End Date is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date.message}</p>}
          </div>

          {/* Project Status */}
          <div>
          <label className="block text-sm font-medium text-gray-700">
              Project Status
          </label>
          <select
              {...register("project_status", { required: "Project Status is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
          >
              <option value="">Select Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
          </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button type="submit" className={styles.update_button}>
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
