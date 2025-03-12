import TableComponent from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { useEffect, useState } from "react";
import { selectAllUser } from "@redux/selector/userSelector";
import { selectUserById } from "@redux/selector/userSelector";
import {
  fetchAllUserAsync,
  fetchUserByIdAsync,
} from "@redux/thunk/User/userThunk";
import { Column } from "@components/ui/Table/Table";
import { DataRecord } from "@components/ui/Table/Table";
const AllUserInformation: React.FC = () => {
  const users = useSelector(selectAllUser);
  const user = useSelector(selectUserById);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAllUserAsync());
      await dispatch(fetchUserByIdAsync());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    console.log(users);
  }, [users]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  // if (!users || users.length === 0) {
  //   return <p>No data available</p>;
  // }
  const columns: Column[] = [
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "User ID",
    },
    {
      key: "full_name",
      dataIndex: "full_name",
      title: "Full Name",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "department",
      dataIndex: "department",
      title: "Department",
    },
    {
      key: "job_rank",
      dataIndex: "job_rank",
      title: "Job Rank",
    },
    {
      key: "Action",
      dataIndex: "Action",
      title: "Action",
    },
  ];
  const dataSource: DataRecord[] = users.map((user, index) => ({
    ...user,
    key: index,
    id: user.user_id ? user.user_id.toString() : "",
    status: user.department ? user.department : "",
  }));

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={true}
        pagination={true}
        pageLength={8}
        name="Role"
      />
    </div>
  );
};

export default AllUserInformation;
