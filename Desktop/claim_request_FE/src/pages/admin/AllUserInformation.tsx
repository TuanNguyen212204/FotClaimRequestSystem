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
import ToggleButton, {
  AdminButton,
} from "@/components/ui/ToggleButton/ToggleButton";
import { CreateUser } from "../User/CreateUser";
import { CircleCheck } from "lucide-react";
import { AssignProject } from "../AssignProject";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ApiError } from "@/api";
import { set } from "date-fns";
import { useTranslation } from "react-i18next";
import ToggleButtonForAdmin from "@/components/ui/ToggleButton/ToggleButton";
import { u } from "node_modules/framer-motion/dist/types.d-B50aGbjN";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
type Department = {
  id: string;
  name: string;
};
type DepartmentList = Department[];
const AllUserInformation: React.FC = () => {
  const fetchDepartment = async () => {
    try {
      const response =
        await httpClient.get<ApiResponseNoGeneric>(`/admin/departments`);
      setDepartment(response.data.data);
    } catch (error) {
      console.error("Fetch department error:", error);
    }
  };
  const tableRef = useRef<{
    getSelectedData: () => DataRecord[];
  }>(null);
  const [selectedData, setSelectedData] = useState<DataRecord[]>([]);
  const [department, setDepartment] = useState<DepartmentList>([]);
  const handleGetSelectedData = () => {
    if (tableRef.current) {
      const a = tableRef.current.getSelectedData();
      setSelectedData(a);
    }
  };

  // const listUserIDisDeleted: string[] = selectedData.map((data) => data.id);

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
  useEffect(() => {
    fetchDepartment();
  }, []);
  const navigate = useNavigate();
  const { t } = useTranslation("allUserInformation");
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
  const [page, setPage] = useState<number>(1);
  const [initialToggleStates, setInitialToggleStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [userStatuses, setUserStatuses] = useState<{ [key: string]: number }>(
    {},
  );
  const [departmentID, setDepartmentID] = useState<number>(0);
  useEffect(() => {
    const statuses = users.reduce(
      (acc, user) => {
        acc[user.user_id] = user.user_status ?? 0;
        return acc;
      },
      {} as { [key: string]: number },
    );
    setUserStatuses(statuses);
  }, [users]);
  useEffect(() => {
    console.log("Total PAge" + totalPage);
    setPage(totalPage);
  }, [totalPage, currentPage]);
  const [assignID, setAssignID] = useState<string>("");
  const [toggleState, setToggleState] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [dataSource, setDataSource] = useState<DataRecord[]>([]);

  useEffect(() => {
    const fetchDataSource = async () => {
      try {
        const data = users.map((user: User, index: number) => ({
          ...user,
          key: index,
          id: user.user_id ? user.user_id.toString() : "",
          status: user.department ? user.department : "",
        }));
        setDataSource(data);
      } catch (error) {
        console.error("Error fetching data source:", error);
      }
    };

    fetchDataSource();
  }, [users]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(
        fetchAllUserAsync({
          page: currentPage.toString(),
          department_id: departmentID,
        }),
      );
      await dispatch(
        fetchTotalPage({
          page: currentPage.toString(),
          department_id: departmentID,
        }),
      );

      setLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

  const handleCreateUser = async () => {
    handleOpenModal();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleUpdate = (id?: string) => {
    setUserID(id ? id : "");
    setOpenUpdate(true);
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      const response = httpClient.put<ApiResponseNoGeneric>(
        `/admin/staff/${userId}/status`,
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
    {
      key: "full_name",
      dataIndex: "full_name",
      title: t("allUserInformation.table.fullName"),
    },
    {
      key: "username",
      dataIndex: "username",
      title: t("allUserInformation.table.userName"),
    },
    {
      key: "email",
      dataIndex: "email",
      title: t("allUserInformation.table.email"),
    },
    {
      key: "role_name",
      dataIndex: "role_name",
      title: t("allUserInformation.table.role"),
    },
    {
      key: "department_name",
      dataIndex: "department_name",
      title: t("allUserInformation.table.department"),
    },
    {
      key: "job_rank_name",
      dataIndex: "job_rank_name",
      title: t("allUserInformation.table.jobRank"),
    },
    {
      key: "user_status",
      dataIndex: "user_status",
      title: t("allUserInformation.table.status"),
      cell: ({ record }: { record: User }) => {
        return record.role_id !== 1 ? (
          <div>
            <div tabIndex={-1}>
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
        ) : (
          <div>
            <div tabIndex={-1}>
              <AdminButton
                userId={record.user_id}
                checked={record.user_status === 1}
                onClick={() => {
                  toast.error(
                    "You don't have permission to change this user status!",
                  );
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
      title: t("allUserInformation.table.assign"),
      cell: ({ record }: { record: User }) => {
        // return (
        //   <div tabIndex={-1}>
        //     <button
        //       tabIndex={-1}
        //       className={styles.circleCheckButton}
        //       onClick={() => handleAssignUser(record.user_id as string)}
        //       disabled={userStatuses[record.user_id] === 0}
        //     >
        //       <div>
        //         {userStatuses[record.user_id] === 1 ? (
        //           <CircleCheck size={20} />
        //         ) : (
        //           <X size={20} />
        //         )}
        //       </div>
        //     </button>
        //   </div>
        // );
        return record.role_id !== 1 ? (
          <div tabIndex={-1}>
            <button
              tabIndex={-1}
              className={styles.circleCheckButton}
              onClick={() => handleAssignUser(record.user_id as string)}
              disabled={userStatuses[record.user_id] === 0}
            >
              <div>
                {userStatuses[record.user_id] === 1 ? (
                  <CircleCheck size={20} />
                ) : (
                  <div className={styles.circleCheckButtonNotAllowed}>
                    <Tooltip text="This user is disabled" position="top">
                      <X size={20} />
                    </Tooltip>
                  </div>
                )}
              </div>
            </button>
          </div>
        ) : (
          <div tabIndex={-1}>
            <button
              tabIndex={-1}
              className={styles.circleCheckButtonNotAllowed}
              onClick={() => {
                toast.error("You don't have permission to assign this user!");
              }}
              disabled={userStatuses[record.user_id] === 0}
            >
              <div>
                {/* <X size={20} />
                <Tooltip></Tooltip> */}
                <Tooltip text="Don't have permission" position="top">
                  <X size={20} />
                </Tooltip>
              </div>
            </button>
          </div>
        );
      },
    },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: t("allUserInformation.table.action"),
      cell: ({ value, record }: { value: string; record: User }) => {
        // return (
        //   <div style={{ display: "flex" }}>
        //     <div>
        //       <button
        //         tabIndex={-1}
        //         className={styles.update_button}
        //         style={{ cursor: "pointer" }}
        //         onClick={() => handleUpdate(value as string)}
        //         disabled={userStatuses[record.user_id] === 0}
        //       >
        //         <div>
        //           {userStatuses[record.user_id] === 1 ? (
        //             <SquarePen size={20} />
        //           ) : (
        //             <X size={20} />
        //           )}
        //         </div>
        //       </button>
        //     </div>
        //   </div>
        // );
        return record.role_id !== 1 ? (
          <div style={{ display: "flex" }}>
            <div>
              <button
                tabIndex={-1}
                className={styles.update_button}
                style={{ cursor: "pointer" }}
                onClick={() => handleUpdate(value as string)}
                disabled={userStatuses[record.user_id] === 0}
              >
                <div>
                  {userStatuses[record.user_id] === 1 ? (
                    <SquarePen size={20} />
                  ) : (
                    <div className={styles.circleCheckButtonNotAllowed}>
                      <Tooltip text="This user is disabled" position="top">
                        <X size={20} />
                      </Tooltip>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <div>
              <button
                tabIndex={-1}
                className={styles.circleCheckButtonNotAllowed}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toast.error("You don't have permission to update this user!");
                }}
                disabled={userStatuses[record.user_id] === 0}
              >
                <div className={styles.circleCheckButtonNotAllowed}>
                  <Tooltip text="This user is disabled" position="top">
                    <X size={20} />
                  </Tooltip>
                </div>
              </button>
            </div>
          </div>
        );
      },
    },
  ];
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const uniqueStatuses = [
    "All",
    ...new Set(department.map((item) => item.name)),
  ];
  const fetchStaffByDepartmentID = async (department_name: string) => {
    const a = department.find((item) => item.name === department_name);
    const department_id = a?.id;
    setDepartmentID(department_id ? parseInt(department_id, 10) : 0);
    try {
      const response = await httpClient.get<ApiResponseNoGeneric>(
        "/admin/staffs",
        {
          page: currentPage.toString(),
          department_id: department_id,
          limit: 8,
        },
      );
      console.log(response.data.data);
      setDataSource(response.data.data);
      setPage(response.data.totalPages);
    } catch (error) {
      console.error("Fetch staff by department error:", error);
    }
  };
  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    fetchStaffByDepartmentID(status);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    console.log(dataSource);
    console.log(page);
  }, [dataSource, page]);
  return (
    <div className="m-0 p-0">
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
      <div className="ml-5">
        <h1 className="m-0 p-0">Staff Information</h1>
        <p className="m-0 p-0">
          The staff information system manages user accounts and project
          assignments
        </p>
      </div>
      <div className="ml-5">
        <div className="m-0 flex p-0">
          <div className={`${styles.filter_section} `}>
            <div className={styles.filterStatusP}>
              <p>
                {t("allUserInformation.filter")} {name}:
              </p>
            </div>
            <div
              className="relative mt-5.5 ml-3 inline-block text-left"
              // style={{ marginTop: "15px", marginLeft: "15px" }}
            >
              <div
                onClick={toggleDropdown}
                className="flex items-center justify-between rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none"
              >
                <span>{selectedStatus}</span>
                <ArrowDown className="ml-2 h-4 w-4" />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border border-gray-300 bg-white shadow-lg">
                  <div className="py-1">
                    {uniqueStatuses.map((status) => (
                      <div
                        key={status}
                        onClick={() => handleStatusSelect(status)}
                        className="block w-4/5 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <TableComponent
          // sortConfig={sortConfig}
          ref={tableRef as any}
          isHaveCheckbox={false}
          columns={columns as Column<DataRecord>[]}
          dataSource={dataSource}
          loading={loading}
          pagination={true}
          name="Role"
          createButton={true}
          totalPage={page}
          onPageChange={handlePageChange}
          onCreateButtonClick={handleCreateUser}
        />
      </div>
    </div>
  );
};

export default AllUserInformation;
