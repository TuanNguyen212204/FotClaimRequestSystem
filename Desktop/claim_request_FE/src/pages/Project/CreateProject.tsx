import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import httpClient from "@/constant/apiInstance";
import { Project } from "@/types/Project";
import { toast } from "react-toastify";
import styles from "./CreateProject.module.css";
Modal.setAppElement("#root");
interface CreateProjectProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({ openModal, setOpenModal }) => {
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
      setOpenModal(false);
      navigate(PATH.projectInformation);
    } catch (error) {
      console.error("Create project error:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  const startDate = watch("start_date");
  const endDate = watch("end_date");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); 
    setTimeout(() => setOpenModal(false), 300); 
  };

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setError("end_date", {
        type: "manual",
        message: "End Date must be after Start Date",
      });
    } else {
      clearErrors("end_date");
    }
  }, [startDate, endDate, setError, clearErrors]);

  const projectId = watch("project_id");
  const [checkingId, setCheckingId] = useState(false);

  useEffect(() => {
    if (!projectId || !/^P\d{3}$/.test(projectId)) return;

    const checkProjectId = async () => {
      setCheckingId(true);
      try {
        await httpClient.get<any>(`/projects/${projectId}`);
        setError("project_id", {
          type: "manual",
          message: "Project ID already exists!",
        });
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

  const projectName = watch("project_name");
  const [checkingName, setCheckingName] = useState(false);

  useEffect(() => {
    if (!projectName) return;

    const checkProjectName = async () => {
      setCheckingName(true);
      try {
        await httpClient.get<any>(`/projects/${projectName}`);
        setError("project_name", {
          type: "manual",
          message: "Project Name already exists!",
        });
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
    <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)} className={styles.modal} overlayClassName={styles.overlay}>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
      <button 
        onClick={() => {
          toast.info("Cancel Create");
          setOpenModal(false);
        }} 
        className={`${styles.close_button} absolute top-4 right-4`}
      >
        <X />
      </button>

        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Create Project</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project ID</label>
            <input 
              type="text" 
              placeholder="Pxxx" 
              {...register("project_id", { required: "Project ID is required", pattern: { value: /^P\d{3}$/, message: "Invalid format (Pxxx)" }})} 
              className="w-full p-2 border border-gray-300 rounded-md" 
            />
            {checkingId && (
              <p className="text-blue-500 text-sm">Checking Project ID...</p>
            )}
            {errors.project_id && (
              <p className="text-red-500 text-sm">
                {errors.project_id.message}
              </p>
            )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input 
              type="text" 
              {...register("project_name", { required: "Project Name is required" })} 
              className="w-full p-2 border border-gray-300 rounded-md" 
            />
            {checkingName && (
              <p className="text-blue-500 text-sm">Checking Project Name...</p>
            )}
            {errors.project_name && (
              <p className="text-red-500 text-sm">
                {errors.project_name.message}
              </p>
            )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input 
              type="date" 
              {...register("start_date", { required: "Start Date is required" })} 
              className="w-full p-2 border border-gray-300 rounded-md" 
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm">
                {errors.start_date.message}
              </p>
            )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input 
              type="date" 
              {...register("end_date", { required: "End Date is required" })} 
              className="w-full p-2 border border-gray-300 rounded-md" 
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm">{errors.end_date.message}</p>
            )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Status</label>
            <select 
              {...register("project_status", { required: "Project Status is required" })} 
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="1">In Progress</option>
              <option value="2">Completed</option>
            </select>
            {errors.project_status && <p className="text-red-500 text-sm">{errors.project_status.message}</p>}
          </div>
  
          <div className="flex justify-end space-x-2">
            <button type="submit" className={styles.update_button} disabled={checkingId}>
              {checkingId ? "Validating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default CreateProject;
