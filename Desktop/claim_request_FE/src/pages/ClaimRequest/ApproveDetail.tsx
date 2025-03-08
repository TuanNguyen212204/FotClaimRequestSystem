import TableComponent from "@/components/ui/Table/Table";
import { useEffect, useRef } from "react";
import { DataRecord } from "@/components/ui/Table/Table";
import { PasswordInput } from "@/components/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchAllProjectAsync } from "@/redux/thunk/Project/projectThunk";
import { fetchAllUserAsync } from "@/redux/thunk/User/userThunk";
import { selectAllUser } from "@/redux/selector/userSelector";
import { selectAllClaim } from "@/redux/selector/claimSelector";
import { fetchAllClaimAsync } from "@/redux/thunk/Claim/claimThunk";
import { selectAllProject } from "@/redux/selector/projectSelector";
const ApproveDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const claims = useSelector(selectAllClaim);
  // dispatch(fetchAllUserAsync());
  // dispatch(fetchAllClaimAsync());
  // dispatch(fetchAllProjectAsync());
  useEffect(() => {
    dispatch(fetchAllUserAsync());
    dispatch(fetchAllClaimAsync());
    dispatch(fetchAllProjectAsync());
  }, []);
  // const tableRef = useRef<{
  //   getSelectedData: () => DataRecord[];
  //   getCheckedData: () => DataRecord[];
  //   getSortedData: () => DataRecord[];
  // }>(null);
  // const handleGetSelectedData = () => {
  //   if (tableRef.current) {
  //     const selectedData = tableRef.current.getSelectedData();
  //     console.log("Selected Data:", selectedData);
  //   }
  // };
  // const handleGetCheckedData = () => {
  //   if (tableRef.current) {
  //     const checkedData = tableRef.current.getCheckedData();
  //     console.log("Checked Data:", checkedData);
  //   }
  // };
  // const handleGetSortedData = () => {
  //   if (tableRef.current) {
  //     const sortedData = tableRef.current.getSortedData();
  //     console.log("Sorted Data:", sortedData);
  //   }
  // };

  useEffect(() => {
    console.log("claims", claims);
  }, [claims]);

  if (!claims || claims.length === 0) return <p>No data available</p>;
  const columns = Object.keys(claims[0]).map((key) => ({
    title: key.replace(/_/g, " ").toUpperCase(), // Đổi snake_case thành chữ in hoa
    dataIndex: key,
    key: key,
  }));
  const dataSource = claims.map((claims, index) => ({
    ...claims,
    key: index, // Thêm key để React nhận diện
  }));

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        pageLength={10}
      />
    </div>
  );
};

export default ApproveDetail;
