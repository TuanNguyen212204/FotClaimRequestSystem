import TableComponent, { SortConfig } from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import React, { useEffect, useState, useRef } from "react";
import {
  selectAllUser,
  selectTotalPageOfAllUser,
} from "@redux/selector/userSelector";
import { fetchAllUserAsync, fetchTotalPage } from "@redux/thunk/User/userThunk";
import { Column, DataRecord } from "@components/ui/Table/Table";
import styles from "./AllUserInformation.module.css";
import httpClient from "@/constant/apiInstance";
import { useNavigate } from "react-router-dom";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/ui/modal/Modal";
import { X } from "lucide-react";
import { SquarePen } from "lucide-react";
import { User } from "@/types/User";
import { UpdateUser } from "../User/UpdateUser";
import ToggleButton from "@/components/ui/ToggleButton/ToggleButton";
import { CreateUser } from "../User/CreateUser";
import { CircleCheck } from "lucide-react";
import { AssignProject } from "../AssignProject";
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

  const username = localStorage.getItem("username");
  const count = localStorage.getItem("count");
  useEffect(() => {
    if (count === "0") {
      toast.success("Welcome back" + username + " to the system!");
      localStorage.setItem("count", "1");
    }
  }, [username]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUser);
  const totalPage = useSelector(selectTotalPageOfAllUser);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openAssign, setOpenAssign] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [checkedDisable, setCheckedDisable] = useState<boolean>(true);
  const [initialToggleStates, setInitialToggleStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [userStatuses, setUserStatuses] = useState<{ [key: string]: number }>(
    {}
  );
  useEffect(() => {
    const statuses = users.reduce((acc, user) => {
      acc[user.user_id] = user.user_status ?? 0;
      return acc;
    }, {} as { [key: string]: number });
    setUserStatuses(statuses);
  }, [users]);

  const [assignID, setAssignID] = useState<string>("");
  const [toggleState, setToggleState] = useState<{ [key: string]: boolean }>(
    {}
  );

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
    handleOpenModal();
    console.log("Create user clicked", setOpenModal);
  };
  
  const dataSource: DataRecord[] = users.map((user, index) => ({
    ...user,
    key: index,
    id: user.user_id ? user.user_id.toString() : "",
    status: user.department ? user.department : "",
  }));

  const handlePageChange = (newPage: number) => {
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
    setUserID(id ? id : "");
    setOpenUpdate(true);
  };
  const sortConfig: SortConfig = {
    columnKey: "full_name",
    order: "asc",
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      const response = httpClient.put<ApiResponseNoGeneric>(
        `/admin/staff/${userId}/status`
      );
      console.log(response);
      setUserStatuses((prev) => ({
        ...prev,
        [userId]: prev[userId] === 1 ? 0 : 1,
      }));
    } catch (error) {
      console.error("Error toggle status:", error);
    }
  };

  const handleAssignUser = (id: string) => {
    setOpenAssign(true);
    setAssignID(id);
  };
  const columns: Column<User>[] = [
    { key: "full_name", dataIndex: "full_name", title: "Full Name" },
    { key: "username", dataIndex: "username", title: "Username" },
    { key: "email", dataIndex: "email", title: "Email" },
    { key: "department", dataIndex: "department", title: "Department" },
    { key: "job_rank", dataIndex: "job_rank", title: "Job Rank" },
    {
      key: "user_status",
      dataIndex: "user_status",
      title: "Status",
      cell: ({ record }: { record: User }) => {
        return (
          <div>
            <div>
              <ToggleButton
                userId={record.user_id}
                checked={
                  toggleState[record.user_id] ?? record.user_status === 1
                }
                onChange={(newChecked) => {
                  setToggleState((prev) => ({
                    ...prev,
                    [record.user_id]: newChecked,
                  }));
                  handleToggleStatus(record.user_id as string);
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "assign",
      dataIndex: "assign",
      title: "Assign",
      cell: ({ record }: { record: User }) => {
        return (
          <div>
            {userStatuses[record.user_id] === 1 && (
              <button
                onClick={() => handleAssignUser(record.user_id as string)}
              >
                <div>
                  <CircleCheck />
                </div>
              </button>
            )}
            {userStatuses[record.user_id] === 0 && (
              <button
                disabled
                onClick={() => handleAssignUser(record.user_id as string)}
              >
                <div>
                  <X />
                </div>
              </button>
            )}
          </div>
        );
      },
    },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "Action",
      cell: ({ value }: { value: string }) => {
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
            {/* <div>
              <button
                className={styles.delete_button}
                onClick={() =>
                  handleDeleteConfirm(
                    record.username as string,
                    record.email as string,
                    record.user_id as string
                  )
                }
              >
                <span>
                  <X />
                </span>
              </button>
            </div> */}
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
            <CreateUser openModal={openModal} setOpenModal={setOpenModal} />
          </div>
        </div>
      )}
      {openUpdate && (
        <div className={styles.editModal}>
          <div>
            <UpdateUser id={userID} setOpenModal={setOpenUpdate} />
          </div>
        </div>
      )}
      {openAssign && (
        <div className={styles.editModal}>
          <div>
            {" "}
            <AssignProject id={assignID} setOpen={setOpenAssign} />
          </div>
        </div>
      )}

      <div>
        <TableComponent
          // sortConfig={sortConfig}
          ref={tableRef as any}
          isHaveCheckbox={false}
          columns={columns as Column<DataRecord>[]}
          dataSource={dataSource}
          loading={loading}
          pagination={true}
          sortConfig={sortConfig}
          name="Role"
          createButton={true}
          totalPage={totalPage}
          onPageChange={handlePageChange}
          onCreateButtonClick={handleCreateUser}
        />
      </div>
    </div>
  );
};

export default AllUserInformation;
