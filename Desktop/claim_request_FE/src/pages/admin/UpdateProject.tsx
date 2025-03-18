import { useNavigate, useSearchParams } from "react-router-dom";
import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { Project } from "@/types/Project";
import styles from "./UpdateProject.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProject: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    project_name: "",
    start_date: "",
    end_date: "",
    project_status: 0,
  });

  const [errors, setErrors] = useState({
    project_name: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        const response = await httpClient.get<ApiResponse<Project>>(
          `/projects/${projectId}`
        );

        const projectData = response.data;
        if (projectData) {
          setFormData({
            project_name: projectData.project_name,
            start_date: projectData.start_date.split("T")[0],
            end_date: projectData.end_date.split("T")[0],
            project_status: projectData.project_status,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { project_name: "", start_date: "", end_date: "" };

    if (!formData.project_name.trim()) {
      newErrors.project_name = "Project name is required.";
      valid = false;
    }

    if (!formData.start_date) {
      newErrors.start_date = "Start date is required.";
      valid = false;
    }

    if (!formData.end_date) {
      newErrors.end_date = "End date is required.";
      valid = false;
    }

    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      if (start > end) {
        newErrors.end_date = "End date cannot be before start date.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    if (!validateForm()) return;

    try {
      const apiData = {
        project_name: formData.project_name,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        project_status: Number(formData.project_status),
      };

      const response = await httpClient.put<ApiResponse<Project>>(
        `/projects/${projectId}`,
        apiData
      );

      if (response.data.httpStatus === 200) {
        toast.success("Project updated successfully!");
        navigate("/project-information");
      } else {
        toast.error("Failed to update project.");
      }
    } catch (error: any) {
      console.error("Error updating project:", error);
      toast.error("An error occurred while updating the project.");
    }
  };

  const handleCancel = () => {
    toast.info("Update canceled.");
    navigate("/project-information");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Kiểm tra lỗi khi nhập
    if (name === "project_name" && !value.trim()) {
      setErrors((prev) => ({ ...prev, project_name: "Project name is required." }));
    } else if (name === "start_date" && !value) {
      setErrors((prev) => ({ ...prev, start_date: "Start date is required." }));
    } else if (name === "end_date" && !value) {
      setErrors((prev) => ({ ...prev, end_date: "End date is required." }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles["update-project-container"]}>
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
          />
          {errors.project_name && <p className={styles.error}>{errors.project_name}</p>}
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
          {errors.start_date && <p className={styles.error}>{errors.start_date}</p>}
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
          {errors.end_date && <p className={styles.error}>{errors.end_date}</p>}
        </div>
        <div>
          <label>Status:</label>
          <select
            name="project_status"
            value={formData.project_status}
            onChange={handleChange}
          >
            <option value={0}>Inactive</option>
            <option value={1}>Active</option>
          </select>
        </div>
        <button type="submit">Update Project</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
