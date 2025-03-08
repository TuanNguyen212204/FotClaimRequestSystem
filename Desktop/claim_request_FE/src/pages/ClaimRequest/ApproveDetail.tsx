import TableComponent from "@/components/ui/Table/Table";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { selectAllClaim } from "@/redux/selector/claimSelector";
import { fetchAllClaimAsync } from "@/redux/thunk/Claim/claimThunk";
const ApproveDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const claims = useSelector(selectAllClaim);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAllClaimAsync());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    console.log("claims", claims);
  }, [claims]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!claims || claims.length === 0) {
    return <p>No data available</p>;
  }
  const columns = Object.keys(claims[0]).map((key) => ({
    title: key.replace(/_/g, " ").toUpperCase(),
    dataIndex: key,
    key: key,
  }));
  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const dataSource = claims.map((claim, index) => ({
    ...claim,
    key: index,
    submitted_date: formatDateToDDMMYYYY(claim.submitted_date),
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
