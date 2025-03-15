import TableComponent from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { useEffect, useState, useRef } from "react";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import {
  selectAllUser,
  selectTotalPageOfAllUser,
} from "@redux/selector/userSelector";
import { fetchAllUserAsync, fetchTotalPage } from "@redux/thunk/User/userThunk";
import { Column, DataRecord } from "@components/ui/Table/Table";
import styles from "./AllUserInformation.module.css";
import httpClient from "@/constant/apiInstance";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { toast } from "react-toastify";
import Modal from "@/components/ui/modal/Modal";
import { X } from "lucide-react";
import { SquarePen } from "lucide-react";
import { User } from "@/types/User";
import { GiCogLock } from "react-icons/gi";
import { set } from "date-fns";
const AllUserInformation: React.FC = () => {
  const tableRef = useRef<{
    getSelectedData: () => DataRecord[];
  }>(null);
  const [selectedData, setSelectedData] = useState<DataRecord[]>([]);

  const handleGetSelectedData = () => {
    if (tableRef.current) {
      const a = tableRef.current.getSelectedData();
      setSelectedData(a);
    }
  };

  const listUserIDisDeleted: string[] = selectedData.map((data) => data.id);

  const deleteAllOFSelectedData = () => {
    handleGetSelectedData();
    console.log("Selected data:", selectedData);
  };

  // useEffect(() => {
  //   if (tableRef.current) {
  //     handleGetSelectedData();
  //     console.log("a");
  //   }
  // }, []); //

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUser);
  const totalPage = useSelector(selectTotalPageOfAllUser);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAllUserAsync(currentPage.toString()));
      await dispatch(fetchTotalPage({ page: currentPage.toString() }));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);
  const handleCreateUser = async () => {
    navigate(PATH.createUser);
  };
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
      const response = await httpClient.delete<ApiResponseNoGeneric>(
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
      toast("Delete user successfully!");
      console.log("Deleted user with ID:", id);
      dispatch(fetchAllUserAsync(currentPage.toString()));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleUpdate = (id?: string) => {
    if (!id) return;
    console.log("Update user with ID:", id);
    navigate(`/update-user?id=${id}`);
  };

  const handleDeleteConfirm = (userId: string) => {
    Modal.confirm({
      title: "Do you want to delete this user?",
      children: `User ID: ${userId} will be deleted`,
      onOk() {
        handleDelete(userId); // Gọi hàm xóa người dùng
      },
      onCancel() {
        console.log("User canceled deletion");
      },
    });
  };

  const columns: Column[] = [
    { key: "full_name", dataIndex: "full_name", title: "Full Name" },
    { key: "username", dataIndex: "username", title: "Username" },
    { key: "email", dataIndex: "email", title: "Email" },
    { key: "department", dataIndex: "department", title: "Department" },
    { key: "job_rank", dataIndex: "job_rank", title: "Job Rank" },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "Action",
      cell: ({ value }) => {
        return (
          <div style={{ display: "flex" }}>
            <div>
              <button
                className={styles.update_button}
                onClick={() => handleUpdate(value as string)}
              >
                <span>
                  <SquarePen />
                </span>
              </button>
            </div>
            <div>
              <button
                className={styles.delete_button}
                onClick={() => handleDeleteConfirm(value as string)}
              >
                <span>
                  <X />
                </span>
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <button onClick={() => deleteAllOFSelectedData()}>Delete</button>
      </div>
      <TableComponent
        ref={tableRef}
        isHaveCheckbox={true}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={true}
        name="Role"
        createButton={true}
        totalPage={totalPage}
        onPageChange={handlePageChange}
        onCreateButtonClick={handleCreateUser}
      />
    </div>
  );
};

export default AllUserInformation;
