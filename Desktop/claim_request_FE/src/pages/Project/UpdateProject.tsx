import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Project } from "@/types/Project";
import styles from "./UpdateProject.module.css";
import Modal from "react-modal";
import httpClient from "@/constant/apiInstance";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  const { register, watch, setError, clearErrors, formState: { errors } } = useForm<Project>();
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const formatDateForInput = (dateString: string) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  useEffect(() => {
    const startDate = watch("start_date");
    const endDate = watch("end_date");
  
    if (startDate && endDate && endDate < startDate) {
      setError("end_date", { type: "manual", message: "End Date must be after Start Date" });
    } else {
      clearErrors("end_date");
    }
  }, [watch("start_date"), watch("end_date")]);
  

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

  const handleClose = () => {
    setIsClosing(true); 
    setTimeout(() => setOpenModal(false), 300); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
    const [startDateSelected, setStartDateSelected] = useState<Date | null>(null);
    const [endDateSelected, setEndDateSelected] = useState<Date | null>(null);
    const minDate = new Date("2025-01-01");
  
    const handleStartDateChange = (newDate: Date) => {
      setStartDateSelected(newDate);
      setValue("start_date", newDate);
      setShowStartDateCalendar(false);
    };
  
    const handleEndDateChange = (newDate: Date) => {
      setEndDateSelected(newDate);
      setValue("end_date", newDate);
      setShowEndDateCalendar(false);
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
          onClick={() => {
            toast.info("Cancel Update");
            setOpenModal(false);
          }} 
          className={`${styles.close_button} absolute top-4 right-4`}
        >
          <X />
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
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div
                className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
                onClick={() => setShowStartDateCalendar(!showStartDateCalendar)}
              >
                {startDateSelected
                  ? startDateSelected.toLocaleDateString("vi-VN")
                  : "DD/MM/YYYY"}
              </div>
              {errors.start_date && (
                <p className="text-red-500 text-sm">{errors.start_date.message}</p>
              )}
              {showStartDateCalendar && (
                <div className={styles.calendarwrapper}>
                  <Calendar
                    onChange={handleStartDateChange}
                    value={startDateSelected}
                    locale="vi-VN"
                    className={styles.calendarwrapperstartDateCalendar}
                    minDate={minDate}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div
                className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
                onClick={() => setShowEndDateCalendar(!showEndDateCalendar)}
              >
                {endDateSelected
                  ? endDateSelected.toLocaleDateString("vi-VN")
                  : "DD/MM/YYYY"}
              </div>
              {errors.end_date && (
                <p className="text-red-500 text-sm">{errors.end_date.message}</p>
              )}
              {showEndDateCalendar && (
                <div className={styles.calendarwrapper}>
                  <Calendar
                    onChange={handleEndDateChange}
                    value={endDateSelected}
                    locale="vi-VN"
                    className={styles.calendarwrapperendDateCalendar}
                    minDate={minDate}
                  />
                </div>
              )}
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

            <div></div>

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
