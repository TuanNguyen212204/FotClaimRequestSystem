import { useNavigate, useSearchParams } from "react-router-dom";
import { Project } from "@/types/Project";
import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import styles from "./UpdateProject.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProject: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ end_date?: string; project_status?: string }>({});
  const [formData, setFormData] = useState({
    project_name: "",
    start_date: "",
    end_date: "",
    project_status: 0,
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
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const validate = () => {
    let newErrors: { end_date?: string; project_status?: string } = {};
    
    if (formData.end_date && formData.start_date && formData.end_date < formData.start_date) {
      newErrors.end_date = "End date must be after start date.";
    }
    
    if (![1, 2].includes(Number(formData.project_status))) {
      newErrors.project_status = "Project status must be 1 or 2.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;
    
    if (!validate()) return;

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
        console.error("Update failed:", response.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
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
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
          {errors.end_date && <p style={{ color: "red" }}>{errors.end_date}</p>}
        </div>
        <div>
          <label>Status:</label>
          <select
            name="project_status"
            value={formData.project_status}
            onChange={handleChange}
          >
            <option value={1}>Active</option>
            <option value={2}>Completed</option>
          </select>
          {errors.project_status && <p style={{ color: "red" }}>{errors.project_status}</p>}
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
