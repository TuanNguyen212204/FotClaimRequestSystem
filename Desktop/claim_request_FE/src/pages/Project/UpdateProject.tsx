import React, { useEffect, useState } from "react";
import styles from "./UpdateProject.module.css";
import Modal from "react-modal";
import httpClient from "@/constant/apiInstance";
import { toast } from "react-toastify";
Modal.setAppElement("#root");
interface UpdateProjectProps {
  projectid: string;
  setOpenModal: (open: boolean) => void;
}

export const UpdateProject: React.FC<UpdateProjectProps> = ({ projectid, setOpenModal }) => {
  const [projectData, setProjectData] = useState({
    project_name: "",
    start_date: "",
    end_date: "",
    project_status: 1,
  });
  const [loading, setLoading] = useState(false);

  const formatDateForInput = (dateString: string) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get(`/projects/${projectid}`);
        const { project_name, start_date, end_date, project_status } = response.data;
        
        setProjectData({
          project_name,
          start_date: formatDateForInput(start_date),
          end_date: formatDateForInput(end_date),
          project_status,
        });
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await httpClient.put(`/projects/${projectid}`, projectData);
      toast.success("Project updated successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <Modal
      isOpen={true} 
      onRequestClose={() => setOpenModal(false)}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
        <button 
          onClick={() => setOpenModal(false)} 
          className={`${styles.close_button} absolute top-4 right-4`}
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Update Project</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input 
                type="text"
                name="project_name"
                value={projectData.project_name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input 
                type="date"
                name="start_date"
                value={projectData.start_date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input 
                type="date"
                name="end_date"
                value={projectData.end_date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Status</label>
              <select 
                name="project_status"
                value={projectData.project_status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button type="submit" className={styles.update_button} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
