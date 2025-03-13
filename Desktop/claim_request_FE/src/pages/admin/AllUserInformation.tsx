import TableComponent from "@components/ui/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { useEffect, useState } from "react";
import { selectAllUser } from "@redux/selector/userSelector";
import { fetchAllUserAsync } from "@redux/thunk/User/userThunk";
import { Column, DataRecord } from "@components/ui/Table/Table";

const AllUserInformation: React.FC = () => {
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

  // Hàm xử lý chuyển trang
  const handlePageChange = (newPage: number) => {
    console.log("Trang mới:", newPage);
    setCurrentPage(newPage);
  };

  const columns: Column[] = [
    { key: "user_id", dataIndex: "user_id", title: "User ID" },
    { key: "full_name", dataIndex: "full_name", title: "Full Name" },
    { key: "email", dataIndex: "email", title: "Email" },
    { key: "department", dataIndex: "department", title: "Department" },
    { key: "job_rank", dataIndex: "job_rank", title: "Job Rank" },
    { key: "Action", dataIndex: "Action", title: "Action" },
  ];

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={true}
        pageLength={10}
        name="Role"
        totalPage={2}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllUserInformation;
