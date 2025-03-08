import TableComponent from "@/components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux";
import { useEffect, useState } from "react";
import { selectAllUser } from "@/redux/selector/userSelector";
import { fetchAllUserAsync } from "@/redux/thunk/User/userThunk";
import { data } from "react-router-dom";
const UserSettings: React.FC = () => {
  const users = useSelector(selectAllUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAllUserAsync());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!users || users.length === 0) {
    return <p>No data available</p>;
  }
  const columns = Object.keys(users[0]).map((key) => ({
    title: key.replace(/_/g, " ").toUpperCase(),
    dataIndex: key,
    key: key,
  }));
  const dataSource = users.map((user, index) => ({
    ...user,
    key: index,
    id: user.id ? user.id.toString() : '',
  }));
  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        pageLength={8}
      />
    </div>
  );
};

export default UserSettings;
