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
import { UpdateProject } from "../Project/UpdateProject";
import { PATH } from "@/constant/config";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";

const ProjectInformation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(selectAllProject) || [];
  const totalPage = useSelector(selectTotalPageOfAllProject) || 1;
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projectID, setProjectID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation("projectInformation");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(
        fetchAllProjectAsync({
          page: currentPage.toString(),
          status: statusFilter || "all",
        }),
      );
      await dispatch(
        fetchTotalPage({
          page: currentPage,
          status: statusFilter || "all",
        }),
      );
      setLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage, statusFilter]);

  const handleStatusSelect = (status: string) => {
    setStatusFilter(status);
    setSelectedStatus(
      status === "all" ? "All" : status === "1" ? "Active" : "Inactive",
    );
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
    setCurrentPage(newPage);
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await httpClient.delete<ApiResponseNoGeneric>(
        "projects/" + id,
      );
      console.log(response.data.message);
      toast.success(t("projectInformation.deleteProject.deleteSuccess"));

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Delete project error " + error);
      toast.error(t("projectInformation.deleteProject.deleteError"));
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    confirmModal({
      title: t("projectInformation.deleteProject.confirmDeleteTitle"),
      children: t("projectInformation.deleteProject.confirmDeleteMessage", {
        id,
      }),
      onOk: () => {
        try {
          deleteProject(id);
          console.log("Deleted project with ID:", id);
        } catch (error) {
          console.error("Error deleting project:", error);
          toast.error(t("projectInformation.deleteProject.deleteError"));
        }
      },
      onCancel: () => {
        console.log("Delete cancelled");
        toast.error(t("projectInformation.deleteProject.deleteCancelled"));
      },
    });
  };

  const handleUpdate = (id?: string) => {
    if (!id) return;
    setProjectID(id);
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
          {value === 1
            ? t("projectInformation.filterStatuses.active")
            : t("projectInformation.filterStatuses.inactive")}
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
            <Tooltip
              text={t("projectInformation.updateProject.title")}
              placement="top"
            >
              <button
                className={`${styles.icon_button} ${styles.editButton}`}
                onClick={() => handleUpdate(value as string)}
                title="Update"
              >
                <FilePen size={20} />
              </button>
            </Tooltip>
            {/* <Tooltip
              text={t("projectInformation.deleteProject.deleteButtonTooltip")}
              placement="top"
            >
              <button
                className={`${styles.icon_button} ${styles.deleteButton}`}
                onClick={() => handleDelete(value as string)}
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </Tooltip> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className={`${styles.title} m-3 p-0`}>
        {t("projectInformation.title")}
      </h1>
      <p className="m-3 p-0">{t("projectInformation.description")}</p>
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

      <div className="mt-5.5 ml-3 flex items-center">
        <span className="mr-2 text-xl font-bold text-gray-700">
          {t("projectInformation.filter")}:
        </span>
        <div className="relative ml-1 inline-block text-left">
          <div
            onClick={toggleDropdown}
            className="flex items-center justify-between rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none"
          >
            <span>
              {selectedStatus === "All"
                ? t("projectInformation.filterStatuses.all")
                : selectedStatus === "Active"
                  ? t("projectInformation.filterStatuses.active")
                  : t("projectInformation.filterStatuses.inactive")}
            </span>
            {isDropdownOpen ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border border-gray-300 bg-white shadow-lg">
              <div className="py-1">
                {["all", "1", "2"].map((status) => (
                  <div
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className="block w-4/5 px-4 py-2 text-left text-sm text-black hover:bg-gray-200"
                  >
                    {status === "all"
                      ? t("projectInformation.filterStatuses.all")
                      : status === "1"
                        ? t("projectInformation.filterStatuses.active")
                        : t("projectInformation.filterStatuses.inactive")}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tableContainer}>
        <TableComponent
          isHaveCheckbox={false}
          columns={columns as Column<DataRecord>[]}
          dataSource={dataSource}
          loading={loading}
          pagination={true}
          name={t("projectInformation.table.status")}
          createButton={true}
          totalPage={totalPage}
          onPageChange={handlePageChange}
          onCreateButtonClick={handleCreateProject}
        />
      </div>
    </div>
  );
};

export default ProjectInformation;
