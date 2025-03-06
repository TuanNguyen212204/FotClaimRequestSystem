import TableComponent from "@/components/ui/Table/Table";
import { useEffect, useRef } from "react";
import { DataRecord } from "@/components/ui/Table/Table";
import { PasswordInput } from "@/components/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchAllUserAsync } from "@/redux/thunk/User/userThunk";
import { selectAllUser } from "@/redux/selector/userSelector";
import { selectAllClaim } from "@/redux/selector/claimSelector";
import { fetchAllClaimAsync } from "@/redux/thunk/Claim/claimThunk";
const ApproveDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUser);
  const claims = useSelector(selectAllClaim);
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
    dispatch(fetchAllUserAsync());
    dispatch(fetchAllClaimAsync());
    console.log("test");
  }, []);

  useEffect(() => {
    console.log("users", users);
  }, [users]);
  useEffect(() => {
    console.log("claims", claims);
  }, [claims]);
  return (
    <div>
      {/* <Dropdown
        label="Select item"
        options={options}
        onSelect={handleSelect}
        disabled={false}
      /> */}
      {/* <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        page="Object"
      /> */}
      {/* <PasswordInput placeholder="Enter the password" size="large" /> */}
    </div>
  );
};

export default ApproveDetail;
