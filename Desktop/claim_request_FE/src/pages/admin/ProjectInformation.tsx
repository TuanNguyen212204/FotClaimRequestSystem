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
import styles from "./AllUserInformation.module.css";
import httpClient from "@/constant/apiInstance";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { Project } from "@/types/Project";
import { Trash2, FilePen } from "lucide-react";
import { confirmModal } from "@/components/ui/modal/Modal";
import { toast } from "react-toastify";
import UpdateProject from "./UpdateProject";

const ProjectInformation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(selectAllProject) || [];
  const totalPage = useSelector(selectTotalPageOfAllProject) || 1;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openUpdate, setOpenUpdateModal] = useState<boolean>(false);
  const [updateProjectId, setUpdateProjectId] = useState<string | null>(null);

  console.log("Dữ liệu lấy từ Redux:", project);
  const [limit] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching projects for page:", currentPage);
        await dispatch(fetchAllProjectAsync(currentPage.toString()));
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

  const handleCreateProject = async () => {
    navigate(PATH.createProject);
  };

  const dataSource: DataRecord[] = Array.isArray(project)
    ? project.map((project: Project, index: number) => ({
        key: index,
        projectID: project.project_id,
        projectName: project.project_name,
        startDate: new Date(project.start_date).toLocaleDateString(),
        endDate: project.end_date
          ? new Date(project.end_date).toLocaleDateString()
          : "N/A",
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

  const handleOpenModal = () => {
    setOpenModal(true);
    console.log("Modal Opened: ", openModal);
  };

  useEffect(() => {
    console.log("Modal state changed:", openModal);
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdate = (id?: string) => {
    if (!id) return;
    console.log("Update project with ID:", id);
    setUpdateProjectId(id);
    setOpenUpdateModal(true);
    console.log("Update Modal Opened: ", openUpdate);
  };
// navigate(`/update-project?id=${id}`);
  const columns: Column[] = [
    { key: "projectID", dataIndex: "projectID", title: "Project ID" },
    { key: "projectName", dataIndex: "projectName", title: "Project Name" },
    { key: "startDate", dataIndex: "startDate", title: "Start Date" },
    { key: "endDate", dataIndex: "endDate", title: "End Date" },
    {
      key: "projectStatus",
      dataIndex: "projectStatus",
      title: "Status",
      cell: ({ value }) => (value === 1 ? "Active" : "Inactive"),
    },
    {
      key: "projectID",
      dataIndex: "projectID",
      title: "Action",
      cell: ({ value }) => {
        return (
          <div className={styles.button_container}>
            <button
              className={styles.icon_button}
              onClick={() => handleUpdate(value as string)}
              title="Update"
            >
              <FilePen size={20} />
            </button>
            <button
              className={styles.icon_button}
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
      {openModal && (
        <div className={styles.editModal}>
          <div>
            <UpdateProject openModal={openModal} setOpenmodal={setOpenModal} />
          </div>
        </div>
      )}
      {openUpdate && updateProjectId && (
        <div className={styles.editModal}>
          <div>
            <UpdateProject id={updateProjectId} setOpenmodal={setOpenUpdateModal} />
          </div>
        </div>
      )}
      <TableComponent
        // ref={tableRef}
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
