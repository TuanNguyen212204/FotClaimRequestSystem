import TableComponent from "@/components/ui/Table/Table";
import { FilePen, Trash2 } from "lucide-react";
import { AArrowDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux";
import { useEffect } from "react";
import { selectAllUser } from "@/redux/selector/userSelector";
import { fetchAllUserAsync } from "@/redux/thunk/User/userThunk";
const UserSettings: React.FC = () => {
  const users = useSelector(selectAllUser);
  // const handleEditClick = (id: string) => {
  //   console.log(`Edit clicked for user with id: ${id}`);
  // };

  // const handleDeleteClick = (id: string) => {
  //   console.log(`Delete clicked for user with id: ${id}`);
  // };

  // const handleArrowClick = (id: string) => {
  //   console.log(`Arrow clicked for user with id: ${id}`);
  // };
  // const columns = [
  //   { title: "ID", dataIndex: "id", key: "id" },
  //   { title: "Username", dataIndex: "username", key: "username" },
  //   { title: "FirstName", dataIndex: "firstName", key: "firstName" },
  //   { title: "LastName", dataIndex: "lastName", key: "lastName" },
  //   { title: "Birthday", dataIndex: "birthday", key: "birthday" },
  //   { title: "Role", dataIndex: "status", key: "status" },
  //   { title: "Action", dataIndex: "action", key: "action" },
  // ];
  // const dataSource = [
  //   {
  //     id: "1",
  //     username: "admin",
  //     firstName: "admin",
  //     lastName: "admin",
  //     birthday: "1999-01-01",
  //     status: "admin",
  //     action: (
  //       <div>
  //         <button onClick={() => handleEditClick("1")}>
  //           <FilePen />
  //         </button>
  //         <button onClick={() => handleDeleteClick("1")}>
  //           <Trash2 />
  //         </button>
  //         <button onClick={() => handleArrowClick("1")}>
  //           <AArrowDown />
  //         </button>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "2",
  //     username: "ba",
  //     firstName: "ba",
  //     lastName: "ba",
  //     birthday: "1999-01-01",
  //     status: "admin",
  //   },
  //   {
  //     id: "3",
  //     username: "user",
  //     firstName: "user",
  //     lastName: "user",
  //     birthday: "1999-01-01",
  //     status: "user",
  //   },
  //   {
  //     id: "4",
  //     username: "developer",
  //     firstName: "developer",
  //     lastName: "developer",
  //     birthday: "1999-01-01",
  //     status: "dev",
  //   },
  // ];
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllUserAsync());
  }, []);
  useEffect(() => {
    console.log("users", users.data);
  }, [users]);
  return (
    <div>
      {/* <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        name="Role"
      /> */}
    </div>
  );
};

export default UserSettings;
