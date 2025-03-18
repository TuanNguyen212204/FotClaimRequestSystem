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
interface AssignProjectProps {
  id: string;
  setOpen: () => void;
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
  useEffect(() => {
    dispatch(
      getAllProjects({ limit: 10, page: 1, order: "ASC", sortBy: "project_id" })
    );
    console.log(projectList);
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const listProjectStatus: Project[] = projectList.filter(
    (proj) => proj.project_status !== 2
  );

  console.log(listProjectStatus);
  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const project = listProjectStatus.find(
      (proj) => proj.project_id === e.target.value
    );
    setSelectedProject(project || null);
    if (project) {
      setValue("project_name", project.project_name);
      setValue("start_date", project.start_date.split("T")[0]);
      setValue("end_date", project.end_date.split("T")[0]);
      setValue("project_status", project.project_status.toString());
    }
  };

  const onSubmit = async (data: Project) => {
    setLoading(true);
    const requestBody = {
      project_id: data.project_id,
      user_id: userID,
    };
    console.log("Request Body:", requestBody);
    try {
      const response = await httpClient.post<ApiResponseNoGeneric>(
        "/projects/assign-user",
        requestBody
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log("Submit Data:", requestBody);
    toast.success("Assign user successfully!");
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div className="mx-auto p-8 bg-white shadow-xl rounded-xl">
          <button
            onClick={() => handleCancel()}
            className={styles.cancel_button}
          >
            <X />
          </button>
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Assign User
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Select Project */}
            <div className={styles.input_container}>
              <label className="block text-sm font-medium text-gray-600">
                Project
              </label>
              <select
                {...register("project_id", { required: "Project is required" })}
                onChange={handleProjectChange}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Project</option>
                {listProjectStatus?.map((proj) => (
                  <option key={proj.project_id} value={proj.project_id}>
                    {proj.project_name} ({proj.project_id})
                  </option>
                ))}
              </select>
              {errors.project_id?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.project_id.message)}
                </p>
              )}
            </div>

            {/* Project Name */}
            <div className={styles.input_container}>
              <label className="block text-sm font-medium text-gray-600">
                Project Name
              </label>
              <input
                type="text"
                {...register("project_name")}
                disabled
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* Start Date */}
            <div className={styles.input_container}>
              <label className="block text-sm font-medium text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                {...register("start_date")}
                disabled
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* End Date */}
            <div className={styles.input_container}>
              <label className="block text-sm font-medium text-gray-600">
                End Date
              </label>
              <input
                type="date"
                {...register("end_date")}
                disabled
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* Project Status */}
            <div className={styles.input_container}>
              <label className="block text-sm font-medium text-gray-600">
                Project Status
              </label>
              <input
                type="text"
                {...register("project_status")}
                disabled
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            <div className={styles.update_button_container}>
              <button type="submit" className={styles.update_button}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
