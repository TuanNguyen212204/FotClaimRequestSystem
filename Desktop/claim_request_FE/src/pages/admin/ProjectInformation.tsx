import TableComponent from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { useEffect, useState, useRef } from "react";
import {
  selectAllProject,
  selectTotalPageOfAllProject,
} from "@redux/selector/projectSelector";
import {
  fetchAllProjectAsync,
  fetchTotalPage,
} from "@redux/thunk/Project/projectThunk";
import { Column, DataRecord } from "@components/ui/Table/Table";
import styles from "./ProjectInformation.module.css";
import httpClient from "@/constant/apiInstance";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { Project } from "@/types/Project";
import { Trash2, FilePen, ClipboardList, Clock } from "lucide-react";
import { confirmModal } from "@/components/ui/modal/Modal";
import { toast } from "react-toastify";
import SummaryCard from "@/components/card/SummaryCard";

const ProjectInformation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(selectAllProject) || [];
  const totalPage = useSelector(selectTotalPageOfAllProject) || 1;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProjects, setTotalProjects] = useState<number | null>(null);
  console.log("Dữ liệu lấy từ Redux:", project);
  const [limit] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching projects for page:", currentPage);
        const result = await dispatch(
          fetchAllProjectAsync(currentPage.toString())
        );
        console.log("Fetch result:", result);
        await dispatch(fetchTotalPage({ page: currentPage.toString() }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, currentPage]);

  useEffect(() => {
    console.log("Current project state:", project);
  }, [project]);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-projects");
        console.log("API Response:", response.data);
        setTotalProjects(response.data.data); // Chỉnh lại để lấy `data` từ response
      } catch (error) {
        console.error("Error fetching total projects:", error);
        setTotalProjects(null); // Để tránh lỗi khi render
      } finally {
        setLoading(false);
      }
    };
  
    fetchSummaryData();
  }, []);
  
  const handleCreateProject = async () => {
    navigate(PATH.createProject);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // "dd/mm/yyyy"
  };

  const dataSource: DataRecord[] = Array.isArray(project)
  ? project.map((project: Project, index: number) => ({
      key: index,
      projectID: project.project_id,
      projectName: project.project_name,
      startDate: formatDate(project.start_date),
      endDate: formatDate(project.end_date || project.end_date),
      projectStatus: project.project_status,
    }))
  : [];

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới:", newPage);
    setCurrentPage(newPage);
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await httpClient.delete<ApiResponseNoGeneric>(
        "projects/" + id
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Delete project error " + error);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    confirmModal({
      title: "Do you want to delete this project?",
      children: `Project ID: ${id} will be deleted`,
      onOk: async () => {
        try {
          await deleteProject(id);
          console.log("Deleted project with ID:", id);
          dispatch(fetchAllProjectAsync(currentPage.toString()));
          toast.success("Project deleted successfully!");
        } catch (error) {
          console.error("Error deleting project:", error);
          toast.error("Failed to delete project. Please try again.");
        }
      },
      onCancel: () => {
        console.log("Delete cancelled");
        toast.info("Project deletion cancelled.");
      },
    });
  };
  

  const handleUpdate = (id?: string) => {
    if (!id) return;
    console.log("Update project with ID:", id);
    navigate(`/update-project?id=${id}`);
  };

  const columns: Column[] = [
    { key: "projectID", dataIndex: "projectID", title: "Project ID" },
    { key: "projectName", dataIndex: "projectName", title: "Project Name" },
    { key: "startDate", dataIndex: "startDate", title: "Start Date" },
    { key: "endDate", dataIndex: "endDate", title: "End Date" },
    { 
      key: "projectStatus", 
      dataIndex: "projectStatus", 
      title: "Status",
      cell: ({ value }) => (
        <span 
          className={`${styles.statusBadge} ${
            value === 1 ? styles.statusActive : styles.statusInactive
          }`}
        >
          {value === 1 ? "Active" : "Inactive"}
        </span>
      ) 
    },    
    {
      key: "projectID",
      dataIndex: "projectID",
      title: "Action",
      cell: ({ value }) => {
        return (
          <div className={styles.button_container}>
            <button
              className={`${styles.icon_button} ${styles.editButton}`}
              onClick={() => handleUpdate(value as string)}
              title="Update"
            >
              <FilePen size={20} />
            </button>
            <button
              className={`${styles.icon_button} ${styles.deleteButton}`}
              onClick={() => handleDelete(value as string)}
              title="Delete"
            >
              <Trash2 size={20} />
            </button>
          </div>
        );
      },
    },    
  ];

  return (
    <div>
      <h1>Project Information</h1>

      <div className={styles.summaryContainer}>
        <SummaryCard 
          title="Total Projects" 
          value={loading ? "Loading..." : totalProjects ?? "N/A"} 
          icon={<ClipboardList />} 
          percentage={10} 
        />
        <SummaryCard 
          title="New Project this month" 
          value={30}  // Nếu có API cho new projects, thay bằng API tương tự
          icon={<Clock />} 
          percentage={-5} 
        />
      </div>

      <TableComponent
        // ref={tableRef}
        // isHaveCheckbox={true}
        // isHaveCheckbox={true}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={true}
        name="Status"
        createButton={true}
        totalPage={totalPage}
        onPageChange={handlePageChange}
        onCreateButtonClick={handleCreateProject}
      />
    </div>
  );
};

export default ProjectInformation;
