import TableComponent from "@/components/ui/Table/Table";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import { selectAllClaim } from "@redux/selector/claimSelector";
import { fetchAllClaimAsync } from "@redux/thunk/Claim/claimThunk";
import { Eye } from "lucide-react";
import { data } from "react-router-dom";
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
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!claims || claims.length === 0) {
    return <p>No data available</p>;
  }

  const columns = [
    ...Object.keys(claims[0]).map((key) => {
      if (key === "claim_status") {
        return {
          title: key.replace(/_/g, " ").toUpperCase(),
          dataIndex: key,
          key: key,
          cell: ({ record }) => (
            <span style={{ color: record === "APPROVED" ? "green" : "red" }}>
              {record}
            </span>
          ),
        };
      }
      return {
        title: key.replace(/_/g, " ").toUpperCase(),
        dataIndex: key,
        key: key,
      };
    }),

    {
      dataIndex: "actions",
      title: "Actions",
      cell: ({ record }) => (
        <button>
          <Eye className="w-5 h-5 text-blue-500 hover:text-blue-700" />
        </button>
      ),
    },
  ];

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
    action: <Eye size={24} />,
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
