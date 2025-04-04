import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Project } from "@/types/Project";
import styles from "./UpdateProject.module.css";
import Modal from "react-modal";
import httpClient from "@/constant/apiInstance";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


Modal.setAppElement("#root");

interface UpdateProjectProps {
  projectid: string;
  setOpenModal: (open: boolean) => void;
}

export const UpdateProject: React.FC<UpdateProjectProps> = ({ projectid, setOpenModal }) => {
  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Project>();

  const [projectData, setProjectData] = useState({
    project_name: "",
    start_date: "",
    end_date: "",
    project_status: 1,
  });

  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [startDateSelected, setStartDateSelected] = useState<Date | null>(null);
  const [endDateSelected, setEndDateSelected] = useState<Date | null>(null);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);

  const minDate = new Date("2025-01-01");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setOpenModal(false), 300);
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : "";
  };

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await httpClient.get(`/projects/${projectid}`);
      const { project_name, start_date, end_date, project_status } = res.data;

      const parsedStart = new Date(start_date);
      const parsedEnd = new Date(end_date);

      setProjectData({
        project_name,
        start_date: formatDate(parsedStart),
        end_date: formatDate(parsedEnd),
        project_status,
      });

      setStartDateSelected(parsedStart);
      setEndDateSelected(parsedEnd);

      setValue("start_date", formatDate(parsedStart));
      setValue("end_date", formatDate(parsedEnd));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectid]);

  useEffect(() => {
    if (startDateSelected && endDateSelected && endDateSelected < startDateSelected) {
      setError("end_date", {
        type: "manual",
        message: "End Date must be after Start Date",
      });
    } else {
      clearErrors("end_date");
    }
  }, [startDateSelected, endDateSelected, setError, clearErrors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (newDate: Date) => {
    setStartDateSelected(newDate);
    setProjectData((prev) => ({ ...prev, start_date: formatDate(newDate) }));
    setValue("start_date", formatDate(newDate));
    setShowStartDateCalendar(false);
  };

  const handleEndDateChange = (newDate: Date) => {
    setEndDateSelected(newDate);
    setProjectData((prev) => ({ ...prev, end_date: formatDate(newDate) }));
    setValue("end_date", formatDate(newDate));
    setShowEndDateCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (endDateSelected && startDateSelected && endDateSelected < startDateSelected) {
      toast.error("End Date must be after Start Date");
      return;
    }

    try {
      setLoading(true);
      await httpClient.put(`/projects/${projectid}`, projectData);
      toast.success("Project updated successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
        <button onClick={handleClose} className={`${styles.close_button} absolute top-4 right-4`}>
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
                className="w-full px-1 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <DatePicker
                selected={startDateSelected}
                onChange={(date: Date) => handleStartDateChange(date)}
                dateFormat="dd/MM/yyyy"
                className={styles.datePickerInput}
                minDate={minDate}
                placeholderText="DD/MM/YYYY"
                locale="vi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <DatePicker
                selected={endDateSelected}
                onChange={(date: Date) => handleEndDateChange(date)}
                dateFormat="dd/MM/yyyy"
                className={styles.datePickerInput}
                minDate={minDate}
                placeholderText="DD/MM/YYYY"
                locale="vi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Status</label>
              <select
                name="project_status"
                value={projectData.project_status}
                onChange={handleChange}
                className={styles.selectStatus}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={styles.update_button}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
