import { useNavigate, useSearchParams } from "react-router-dom";
import { Project } from "@/types/Project";
import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import styles from "./UpdateProject.module.css";
import { useEffect, useState } from "react";

const UpdateProject: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    project_id: "",
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
        console.log("Project Data:", response.data);

        const projectData = response.data;
        if (projectData) {
          setFormData({
            project_id: projectData.project_id,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    try {
      const apiData = {
        project_id: projectId, 
        project_name: formData.project_name,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        project_status: Number(formData.project_status),
      };

      console.log("Sending update data:", apiData);

      // Sửa lại endpoint update
      const response = await httpClient.put<ApiResponse<Project>>(
        `/projects/${projectId}`, // hoặc endpoint chính xác của bạn
        apiData
      );

      if (response.data.httpStatus === 200) {
        console.log("Update successful:", response.data);
        navigate("/admin/projects");
      } else {
        console.error("Update failed:", response.data);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
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
        <button type="button" onClick={() => navigate("/project-information")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
