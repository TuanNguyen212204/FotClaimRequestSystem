import TableComponent from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { useEffect, useState } from "react";
import { selectAllUser } from "@redux/selector/userSelector";
import { fetchAllUserAsync } from "@redux/thunk/User/userThunk";
import { Column, DataRecord } from "@components/ui/Table/Table";
import styles from "./AllUserInformation.module.css";
import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
const AllUserInformation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUser); // Lấy danh sách user từ Redux store
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAllUserAsync(currentPage.toString()));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

  const dataSource: DataRecord[] = users.map((user, index) => ({
    ...user,
    key: index,
    id: user.user_id ? user.user_id.toString() : "",
    status: user.department ? user.department : "",
  }));

  const handlePageChange = (newPage: number) => {
    console.log("Trang mới:", newPage);
    setCurrentPage(newPage);
  };
  const deleteUser = async (id: string) => {
    try {
      const response = await httpClient.delete<ApiResponse>(
        "/admin/staff/" + id
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Delete user error " + error);
    }
  };
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteUser(id);
      window.alert("Deleted user with ID: " + id);
      console.log("Deleted user with ID:", id);
      dispatch(fetchAllUserAsync(currentPage.toString()));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (id?: string) => {
    if (!id) return;
    console.log("Updateng user with ID:", id);
    navigate(`/update-user?id=${id}`);
  };
  const columns: Column[] = [
    { key: "full_name", dataIndex: "full_name", title: "Full Name" },
    { key: "email", dataIndex: "email", title: "Email" },
    { key: "department", dataIndex: "department", title: "Department" },
    { key: "job_rank", dataIndex: "job_rank", title: "Job Rank" },
    {
      key: "user_id",
      dataIndex: "user_id",
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
        // pageLength={10}
        name="Role"
        totalPage={2}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllUserInformation;
