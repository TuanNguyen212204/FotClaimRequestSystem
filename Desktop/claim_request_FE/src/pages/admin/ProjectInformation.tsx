import TableComponent from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { useEffect, useState } from "react";
import { selectAllProject, selectTotalPageOfAllProject } from "@redux/selector/projectSelector"
import { fetchAllProjectAsync, fetchTotalPage } from "@redux/thunk/Project/projectThunk";
import { Column, DataRecord } from "@components/ui/Table/Table";
import styles from "./AllUserInformation.module.css";
import httpClient from "@/constant/apiInstance";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { ToastContainer, toast } from "react-toastify";
import { Project } from "@/types/Project";


const ProjectInformation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(selectAllProject) || [];
  const totalPage = useSelector(selectTotalPageOfAllProject) || 1;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log("Dữ liệu lấy từ Redux:", project);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchAllProjectAsync(currentPage.toString()));
        await dispatch(fetchTotalPage({ page: currentPage.toString() }));
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, currentPage]);
  const handleCreateProject = async () => {
    navigate(PATH.createProject);
  };

  const dataSource: DataRecord[] = Array.isArray(project) ? project.map((project: Project, index: any) => ({
    ...project,
    key: index,
    id: project.projectID ? project.projectID.toString() : "",
    status: project.projectStatus ? project.projectStatus.toString() : "",
  })) : [];

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
    try {
      await deleteProject(id);
      toast("Delete project successfully!");
      console.log("Deleted project with ID:", id);
      dispatch(fetchAllProjectAsync(currentPage.toString()));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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
    { key: "endDate", dataIndex: "endDate", title: "End date" },
    { key: "projectStatus", dataIndex: "projectStatus", title: "Status" },
    {
      key: "projectID",
      dataIndex: "projectID",
      title: "Action",
      cell: ({ value }) => {
        return (
          <div>
            <button
              className={styles.delete_button}
              onClick={() => handleDelete(value as string)}
            >
              Delete
            </button>
            <button
              className={styles.update_button}
              onClick={() => handleUpdate(value as string)}
            >
              Update
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={true}
        name="Role"
        createButton={true}
        totalPage={totalPage}
        onPageChange={handlePageChange}
        onCreateButtonClick={handleCreateProject}
      />
    </div>
  );
};

export default ProjectInformation;
