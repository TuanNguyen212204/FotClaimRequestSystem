import TableComponent from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { useEffect, useState } from "react";
import {
  selectAllProject,
  selectTotalPageOfAllProject,
} from "@redux/selector/projectSelector";
import {
  fetchAllProjectAsync,
  fetchTotalPage,
} from "@redux/thunk/Project/projectThunk";
import { Column, DataRecord } from "@components/ui/Table/Table";
import { CreateProject } from "../Project/CreateProject";
import { UpdateProject } from "../Project/UpdateProject";
import styles from "./ProjectInformation.module.css";
import httpClient from "@/constant/apiInstance";
import { useNavigate } from "react-router-dom";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { Project } from "@/types/Project";
import { Trash2, FilePen } from "lucide-react";
import { confirmModal } from "@/components/ui/modal/Modal";
import { toast } from "react-toastify";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectInformation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(selectAllProject) || [];
  const totalPage = useSelector(selectTotalPageOfAllProject) || 1;
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projectID, setProjectID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [UpdateOpen, setUpdateOpen] = useState(false);
  console.log("Dữ liệu lấy từ Redux:", project);
  const { t } = useTranslation("projectInformation");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching projects for page:", currentPage, "with status:", statusFilter);
        const result = await dispatch(
          fetchAllProjectAsync({ page: currentPage.toString(), status: statusFilter || "all" })
        );
        console.log("Fetch result:", result);
        await dispatch(fetchTotalPage({ page: currentPage.toString(), status: statusFilter || "all" }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, currentPage, statusFilter]); 
  
  const handleStatusSelect = (status: string) => {
    setStatusFilter(status);
    setSelectedStatus(status === "all" ? "All" : status === "1" ? "Active" : "Inactive");
    setCurrentPage(1); 
    setIsDropdownOpen(false);
  };  

  useEffect(() => {
    console.log("Current project state:", project);
  }, [project]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateProject = () => {
    handleOpenModal();
    console.log("Create project clicked", setIsModalOpen);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const dataSource: DataRecord[] = Array.isArray(project)
    ? project.map((project: Project) => ({
        key: project.project_id,
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
          toast.success("Project deleted successfully!");
          await dispatch(fetchAllProjectAsync({ page: currentPage.toString(), status: statusFilter || "all" }));
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
    setProjectID(id ? id : "");
    setUpdateOpen(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const columns: Column<Project>[] = [
    {
      key: "projectID",
      dataIndex: "projectID",
      title: t("projectInformation.table.projectID"),
    },
    {
      key: "projectName",
      dataIndex: "projectName",
      title: t("projectInformation.table.projectName"),
    },
    {
      key: "startDate",
      dataIndex: "startDate",
      title: t("projectInformation.table.startDate"),
    },
    {
      key: "endDate",
      dataIndex: "endDate",
      title: t("projectInformation.table.endDate"),
    },
    {
      key: "projectStatus",
      dataIndex: "projectStatus",
      title: t("projectInformation.table.status"),
      cell: ({ value }) => (
        <span
          className={`${styles.statusBadge} ${
            value === 1 ? styles.statusActive : styles.statusInactive
          }`}
        >
          {value === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "action",
      dataIndex: "projectID",
      title: t("projectInformation.table.action"),
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
      <h1>{t("projectInformation.title")}</h1>

      {isModalOpen && (
        <div className={styles.editModal}>
          <div>
            <CreateProject
              openModal={isModalOpen}
              setOpenModal={setIsModalOpen}
            />
          </div>
        </div>
      )}
      {UpdateOpen && (
        <div className={styles.editModal}>
          <div>
            <UpdateProject projectid={projectID} setOpenModal={setUpdateOpen} />
          </div>
        </div>
      )}

      <div className="flex items-center mt-5.5 ml-3">
        <span className="mr-2 text-base font-bold text-gray-700">Filter by status:</span>
        <div className="relative inline-block text-left ml-1"> 
          <div
            onClick={toggleDropdown}
            className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
          >
            <span>{selectedStatus}</span>
            <ArrowDown className="w-4 h-4 ml-2" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg w-48">
              <div className="py-1">
                {["all", "1", "2"].map((status) => (  
                  <div
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className="block px-4 py-2 text-sm text-black w-4/5 text-left hover:bg-gray-200"
                  >
                    {status === "all" ? "All" : status === "1" ? "Active" : "Inactive"}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <FilterStatus /> */}

      <TableComponent
        // ref={tableRef as any}
        isHaveCheckbox={false}
        columns={columns}
        dataSource={dataSource}
        loading={true}
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
