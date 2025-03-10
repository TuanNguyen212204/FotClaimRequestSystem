import TableComponent, { Column } from "@/components/ui/Table/Table";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/index";
// import { selectAllPending } from "@/redux/selector/pendingSelector";
import { useEffect, useState } from "react";
// import { fetchAllPendingClaimAsync } from "@/redux/thunk/Approver/pendingThunk";
import type { claimPending } from "@/types/Pending.d.ts";
import httpClient from "@/constant/apiInstance.ts";



export const PendingComponent: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const pending = useSelector(selectAllPending);
  const [pending, setPending] = useState<claimPending[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPendingClaimAsync();
  }, []);

  const fetchAllPendingClaimAsync = async () => {
    const res = await httpClient.get<{ data: claimPending[]}>(
      `/approvers/pending-claim`
    );
    console.log("data: ", res.data.data)
    setPending(res.data.data);
    setLoading(false); 
  };

  

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!pending || pending.length === 0) {
    return <p>No data available</p>;
  }

  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: Column[] = [
    // {
    //   key: "claim_id",
    //   dataIndex: "claim_id",
    //   title: "Claim ID",
    // },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "User ID",
    },
    {
      key: "project_id",
      dataIndex: "project_id",
      title: "Project ID",
    },
    {
      key: "total_working_hours",
      dataIndex: "total_working_hours",
      title: "Total Working Hours",
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Claim Status",
    },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
    },
  ];

  const dataSource = pending.map((item, index) => ({
    key: index,
    ...item,
  }));

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        name="Claims"
        pageLength={10}
      />
    </div>
  );
};
