import TableComponent from "@/components/common/Table";
import styles from "./UserSetting.module.css";
import { FilePen, Trash2 } from "lucide-react";
import { data } from "react-router-dom";

const UserSettings: React.FC = () => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "FirstName", dataIndex: "firstname", key: "firstname" },
    { title: "LastName", dataIndex: "lastname", key: "lastname" },
    { title: "Birthday", dataIndex: "birthday", key: "birthday" },
    { title: "Role", dataIndex: "status", key: "status" },
  ];
  const dataSource = [
    {
      id: "01",
      username: "nguyenvana",
      firstname: "a",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "BM",
    },
    {
      id: "02",
      username: "nguyenvanb",
      firstname: "b",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "Dev",
    },
    {
      id: "03",
      username: "nguyenvanc",
      firstname: "c",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "BM",
    },
    {
      id: "04",
      username: "nguyenvand",
      firstname: "d",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "BA",
    },
    {
      id: "05",
      username: "nguyenvane",
      firstname: "e",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "BE",
    },
    {
      id: "06",
      username: "nguyenvana",
      firstname: "f",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "DA",
    },
    {
      id: "06",
      username: "nguyenvana",
      firstname: "f",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "DA",
    },
    {
      id: "06",
      username: "nguyenvana",
      firstname: "f",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "DA",
    },
    {
      id: "06",
      username: "nguyenvana",
      firstname: "f",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "DA",
    },
    {
      id: "06",
      username: "nguyenvana",
      firstname: "f",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "DA",
    },
    {
      id: "06",
      username: "nguyenvana",
      firstname: "f",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "DA",
    },
    {
      id: "06",
      username: "nguyenvana",
      firstname: "f",
      lastname: "nguyen",
      birthday: "01/01/1996",
      status: "DA",
    },
  ];
  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        page="Object"
        name="Role"
      />
    </div>
  );
};

export default UserSettings;
